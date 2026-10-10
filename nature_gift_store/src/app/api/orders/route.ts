import { CartItem } from '@/hooks/useCart'
import {
  getAllCollectionCache,
  getAllValidPromotionCache,
  getDocumentByPathCache,
} from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Order, OrderStatus, Product, ProductStatus, Shipment } from '@/lib/firebase/models'
import { PromotionCalculator } from '@/lib/utils/promotion-calculator'
import { getRegularPrice } from '@/lib/utils/utils'
import { FlockNotifier } from '@/lib/notifications/flock/flock'
import { sendEmailNotifications, sendSmsNotifications } from '@/lib/notifications/sendNotifications'
import { getDatabasePath } from '@spreeloop/database'
import { format } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

const flockNotifier = new FlockNotifier({
  webhookUrl: process.env.FLOCK_WEBHOOK_URL as string,
})
/**
 * Prices the order from the database, never from the client: product prices,
 * shipping cost and promotions are all looked up server-side.
 */
async function priceOrder(
  rawItems: unknown,
  deliveryInfo: { deliveryMethod?: string; location?: string } | undefined,
) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) return null

  const cart = await Promise.all(
    rawItems.map(async (item): Promise<CartItem | null> => {
      const quantity = Number(item?.quantity)
      const path = String(item?.product?.path ?? '')
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return null
      if (!path.startsWith(`${CollectionsName.Products}/`)) return null
      const product = await getDocumentByPathCache<Product>({ path })
      if (!product || product.status !== ProductStatus.PUBLISHED) return null
      return { product: { ...product, path }, quantity, price: getRegularPrice(product) }
    }),
  )
  if (cart.some(item => !item)) return null

  const shipments =
    (await getAllCollectionCache<Shipment>({ collection: CollectionsName.Shipments })) || []
  const cost =
    shipments.find(
      s =>
        s.isActive !== false &&
        s.method === deliveryInfo?.deliveryMethod &&
        s.locations.includes(deliveryInfo?.location ?? ''),
    )?.cost ?? 0

  const promotions = await getAllValidPromotionCache()
  const summary = new PromotionCalculator(
    cart as CartItem[],
    {
      deliveryMethod: deliveryInfo?.deliveryMethod as never,
      location: deliveryInfo?.location,
      cost,
    },
    promotions,
  ).calculate()

  return { cart: cart as CartItem[], summary }
}

/// Request to create new order.
export const POST = async (req: NextRequest) => {
  const { order, cartItems: rawItems } = await req.json()
  const priced = await priceOrder(rawItems, order?.deliveryInfo)
  if (!priced) {
    return NextResponse.json({ error: 'Invalid cart' }, { status: 400 })
  }
  const { cart: cartItems, summary } = priced

  const data = {
    userPath: order.userData?.id
      ? getDatabasePath(CollectionsName.Users, order.userData?.id)
      : null,
    deliveryInfo: order.deliveryInfo,
    userData: order.userData,
    status: OrderStatus.PENDING,
    orderPrices: {
      subtotal: summary.subtotal,
      shipping: summary.shipping,
      discount: summary.discount,
      total: summary.total,
    },
    partnersPaths: cartItems.map(item =>
      getDatabasePath(CollectionsName.Users, item.product.creatorId),
    ),
    items: cartItems.map(item => ({
      product: {
        medias: item.product.medias,
        title: item.product.title,
        path: item.product.path,
        price: item.product.price,
        creatorId: item.product.creatorId,
      },
      quantity: item.quantity,
      price: item.price,
    })),
    promotions: summary.appliedPromotions.map(promotion => ({
      promotionId: promotion.id,
      discountAmount: promotion.discountAmount,
      code: promotion.code,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  try {
    const newOrderPath = await backend.database.createRecord(CollectionsName.Orders, data)
    if (!newOrderPath) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }
    const newOrder = await backend.database.getRecord<Order>(newOrderPath)

    try {
      await flockNotifier.sendOrderNotification({ ...newOrder.data, path: newOrder.path })
    } catch (error) {
      console.error('Error sending Flock notification:', error)
    }
    // Send notifications
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(',') || []
    const adminPhones = process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER?.split(',') || []

    if (adminEmails.length > 0) {
      const notificationData = {
        user_name: order.userData.fullName,
        user_number: order.userData.phone,
        selected_products: cartItems.map(item => item.product.title).join(', '),
        delivery_address: order.deliveryInfo.address,
        delivery_location: order.deliveryInfo.location,
        delivery_date: `${format(order.deliveryInfo.deliveryDate, 'PPP')} ${order.deliveryInfo.deliveryTime}`,
      }

      try {
        await Promise.all(
          adminEmails.map(email =>
            sendEmailNotifications({
              email,
              notificationId: 'new_product',
              data: notificationData,
            }),
          ),
        )
      } catch (error) {
        console.error('Failed to send email notifications:', error)
      }
    }

    // SMS notifications commented out for now
    if (adminPhones.length > 0) {
      try {
        await Promise.all(
          adminPhones.map(phone =>
            sendSmsNotifications({
              phoneNumber: phone,
              notificationId: 'new_product',
              data: {
                comment: `Visit the order on ${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/orders`,
              },
            }),
          ),
        )
      } catch (error) {
        console.error('Failed to send SMS notifications:', error)
      }
    }

    return NextResponse.json({ ...newOrder.data, path: newOrder.path }, { status: 201 })
  } catch (error) {
    console.error('[ORDERS_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
