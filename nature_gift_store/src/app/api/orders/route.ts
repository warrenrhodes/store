import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Order, OrderStatus } from '@/lib/firebase/models'
import { FlockNotifier } from '@/lib/notifications/flock/flock'
import { sendEmailNotifications, sendSmsNotifications } from '@/lib/notifications/sendNotifications'
import { getDatabasePath } from '@spreeloop/database'
import { format } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

const flockNotifier = new FlockNotifier({
  webhookUrl: process.env.FLOCK_WEBHOOK_URL as string,
})
/// Request to create new order.
export const POST = async (req: NextRequest) => {
  const { order, cartItems } = await req.json()

  const data = {
    userPath: order.userData?.id
      ? getDatabasePath(CollectionsName.Users, order.userData?.id)
      : null,
    deliveryInfo: order.deliveryInfo,
    userData: order.userData,
    status: OrderStatus.PENDING,
    orderPrices: order.orderPrices,
    partnersPaths: cartItems.map((item: any) =>
      getDatabasePath(CollectionsName.Users, item.product.creatorId),
    ),
    items: cartItems.map((item: any) => ({
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
    promotions: order.promotions,
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
        selected_products: cartItems.map((item: any) => item.product.title).join(', '),
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
