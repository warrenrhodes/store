import { CartItem } from '@/hooks/useCart'
import {
  getPromotionsWithFreshUsage,
  getShippingZonesCache,
  getDocumentByPathFresh,
} from '@/lib/api/utils'
import { cartStoreErrorStatus, resolveCartStore } from '@/lib/api/cart-store'
import { SiteStore } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Order, OrderStatus, Product, ProductStatus, StoreSecrets } from '@/lib/firebase/models'
import { isWithinUsageLimit, PromotionCalculator } from '@/lib/utils/promotion-calculator'
import { getRegularPrice } from '@/lib/utils/utils'
import { findArea } from '@/lib/utils/shipping-zones'
import { FlockNotifier } from '@/lib/notifications/flock/flock'
import { sendEmailNotifications, sendSmsNotifications } from '@/lib/notifications/sendNotifications'
import { getDatabasePath } from '@spreeloop/database'
import { FieldValue } from 'firebase-admin/firestore'
import { randomBytes } from 'node:crypto'
import { sendMetaPurchase } from '@/lib/analytics/meta-capi'
import { format } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

/** Where a store's order alerts go: its own settings and secrets (admin, Settings). */
async function storeChannels(store: SiteStore) {
  const secrets = (
    await backend.db.collection(CollectionsName.StoreSecrets).doc(store.id).get()
  ).data() as StoreSecrets | undefined
  return {
    flock: new FlockNotifier({ webhookUrl: secrets?.flockWebhookUrl || '' }),
    emails: store.settings?.notificationEmails ?? [],
    phones: store.settings?.notificationPhones ?? [],
    pixels: (store.settings?.metaPixelIds ?? []).flatMap(id => {
      const token = secrets?.metaCapiTokens?.[id]
      return token ? [{ id, token }] : []
    }),
  }
}
/** Thrown inside the order transaction; turned into a 409 the checkout can explain. */
class OrderConflict extends Error {
  constructor(
    public code: 'OUT_OF_STOCK' | 'PROMOTION_EXHAUSTED',
    public detail: string,
  ) {
    super(code)
  }
}

/** Orders this phone number already placed with each promotion (canceled/rejected excluded). */
async function promotionUsesByPhone(phone?: string | null) {
  const uses = new Map<string, number>()
  if (!phone) return uses
  const orders = await backend.db
    .collection(CollectionsName.Orders)
    .where('userData.phone', '==', phone)
    .select('promotions', 'status')
    .get()
  for (const doc of orders.docs) {
    if ([OrderStatus.CANCELED, OrderStatus.REJECTED].includes(doc.get('status'))) continue
    const ids = new Set<string>(
      (doc.get('promotions') ?? []).map((p: { promotionId?: string; promotionPath?: string }) =>
        String(p.promotionId ?? p.promotionPath),
      ),
    )
    ids.forEach(id => uses.set(id, (uses.get(id) ?? 0) + 1))
  }
  return uses
}

/**
 * Prices the order from the database, never from the client: product prices, the store,
 * its shipping cost and its promotions are all looked up server-side.
 */
async function priceOrder(
  rawItems: unknown,
  site: unknown,
  deliveryInfo: { deliveryMethod?: string; locationId?: string } | undefined,
  codes: string[],
  phone?: string | null,
) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) return null

  const cart = await Promise.all(
    rawItems.map(async (item): Promise<CartItem | null> => {
      const quantity = Number(item?.quantity)
      const path = String(item?.product?.path ?? '')
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return null
      if (!path.startsWith(`${CollectionsName.Products}/`)) return null
      const product = await getDocumentByPathFresh<Product>({ path })
      if (!product || product.status !== ProductStatus.PUBLISHED) return null
      return { product: { ...product, path }, quantity, price: getRegularPrice(product) }
    }),
  )
  if (cart.some(item => !item)) return null
  const resolved = await resolveCartStore(
    site,
    cart.map(item => item!.product),
  )
  if ('error' in resolved) return { error: resolved.error }
  const { store } = resolved

  // The area is matched by id; its name and city come from the database, not the client.
  const picked = findArea(
    await getShippingZonesCache(store.id),
    deliveryInfo?.deliveryMethod,
    deliveryInfo?.locationId,
  )
  const area = picked?.area
  const cost = picked?.zone.cost ?? 0

  const uses = await promotionUsesByPhone(phone)
  const cached = await getPromotionsWithFreshUsage(store.id)
  const promotions = cached.filter(p => isWithinUsageLimit(p, uses.get(p.path) ?? 0))
  const summary = new PromotionCalculator(
    cart as CartItem[],
    {
      // Without a listed area the shipping cost is unknown: method-based promos don't apply.
      deliveryMethod: area ? (deliveryInfo?.deliveryMethod as never) : undefined,
      locationId: area?.id,
      city: area?.city,
      cost,
    },
    promotions,
    codes,
  ).calculate()

  return { cart: cart as CartItem[], summary, area, store }
}

/** Takes stock and promotion uses, then writes the order, all or nothing. */
async function placeOrder(
  data: Record<string, unknown>,
  cart: CartItem[],
  promotionPaths: string[],
  checkoutId?: string,
) {
  const db = backend.db
  const orderRef = db.collection(CollectionsName.Orders).doc()
  const lowStock: string[] = []

  await db.runTransaction(async tx => {
    // Reads first (Firestore transactions require it), then writes.
    const quantities = new Map<string, number>()
    cart.forEach(i =>
      quantities.set(i.product.path, (quantities.get(i.product.path) ?? 0) + i.quantity),
    )
    const products = await Promise.all([...quantities.keys()].map(path => tx.get(db.doc(path))))
    const promotions = await Promise.all(promotionPaths.map(path => tx.get(db.doc(path))))

    for (const doc of products) {
      const stock = doc.get('inventory.stockQuantity')
      // No stockQuantity means stock isn't tracked for this product.
      if (typeof stock !== 'number') continue
      const wanted = quantities.get(doc.ref.path)!
      if (wanted > stock) throw new OrderConflict('OUT_OF_STOCK', doc.ref.path)
      const threshold = doc.get('inventory.lowStockThreshold')
      if (stock - wanted <= (typeof threshold === 'number' ? threshold : 0)) {
        lowStock.push(`${doc.get('title')}: ${stock - wanted} left`)
      }
      tx.update(doc.ref, { 'inventory.stockQuantity': FieldValue.increment(-wanted) })
    }
    for (const doc of promotions) {
      const total = doc.get('usageLimit.total')
      if (total && (doc.get('usageCount') ?? 0) >= total) {
        throw new OrderConflict('PROMOTION_EXHAUSTED', doc.get('code'))
      }
      tx.update(doc.ref, { usageCount: FieldValue.increment(1) })
    }
    tx.set(orderRef, data)
    if (checkoutId) {
      tx.set(
        db.collection(CollectionsName.Checkouts).doc(checkoutId),
        { orderPath: orderRef.path, updatedAt: data.createdAt },
        { merge: true },
      )
    }
  })
  return { orderRef, lowStock }
}

/// Request to create new order.
export const POST = async (req: NextRequest) => {
  const { order, cartItems: rawItems, promoCodes, checkoutId, site } = await req.json()
  const codes = Array.isArray(promoCodes) ? promoCodes.map(String).slice(0, 5) : []
  const priced = await priceOrder(
    rawItems,
    site,
    order?.deliveryInfo,
    codes,
    order?.userData?.phone,
  )
  if (!priced) {
    return NextResponse.json({ error: 'Invalid cart' }, { status: 400 })
  }
  if ('error' in priced) {
    return NextResponse.json(
      { error: priced.error },
      { status: cartStoreErrorStatus[priced.error] },
    )
  }
  const { cart: cartItems, summary, area, store } = priced
  const now = new Date().toISOString()

  const data = {
    userPath: order.userData?.id
      ? getDatabasePath(CollectionsName.Users, order.userData?.id)
      : null,
    deliveryInfo: {
      ...order.deliveryInfo,
      location: area?.name ?? null,
      locationId: area?.id ?? null,
      // A listed area sets the city; otherwise keep what the customer typed.
      city: area?.city || order.deliveryInfo?.city || null,
    },
    userData: order.userData,
    status: OrderStatus.PENDING,
    orderPrices: {
      subtotal: summary.subtotal,
      shipping: summary.shipping,
      discount: summary.discount,
      total: summary.total,
    },
    // One store per order (checked by resolveCartStore).
    storeId: store.id,
    partnersPaths: [
      ...new Set(
        cartItems.map(item => getDatabasePath(CollectionsName.Users, item.product.creatorId)),
      ),
    ],
    items: cartItems.map(item => ({
      product: {
        medias: item.product.medias,
        title: item.product.title,
        path: item.product.path,
        price: item.product.price,
        creatorId: item.product.creatorId,
        storeId: item.product.storeId ?? null,
      },
      quantity: item.quantity,
      price: item.price,
    })),
    promotions: summary.appliedPromotions.map(promotion => ({
      promotionId: promotion.id,
      discountAmount: promotion.discountAmount,
      code: promotion.code,
      type: promotion.type,
    })),
    trackingToken: randomBytes(16).toString('hex'),
    stockReserved: true,
    checkoutId: typeof checkoutId === 'string' ? checkoutId : null,
    history: [{ at: now, by: 'customer', type: 'created', status: OrderStatus.PENDING }],
    createdAt: now,
    updatedAt: now,
  }
  try {
    let placed
    try {
      placed = await placeOrder(
        data,
        cartItems,
        [...new Set(summary.appliedPromotions.map(p => p.id))],
        data.checkoutId ?? undefined,
      )
    } catch (error) {
      if (error instanceof OrderConflict) {
        return NextResponse.json({ error: error.code, detail: error.detail }, { status: 409 })
      }
      throw error
    }
    const newOrder = { data: data as unknown as Order, path: placed.orderRef.path }

    // The order is saved: alerts and tracking must never turn it into an error (the customer
    // would retry and order twice). They go to the order's store only.
    try {
      const channels = await storeChannels(store)
      const flockNotifier = channels.flock
      if (placed.lowStock.length > 0) {
        await flockNotifier.sendText(`⚠️ Low stock\n${placed.lowStock.join('\n')}`)
      }
      await sendMetaPurchase(channels.pixels, {
        eventId: placed.orderRef.id,
        value: summary.total,
        contents: cartItems.map(i => ({
          id: i.product.path.split('/').pop()!,
          quantity: i.quantity,
          item_price: i.price,
        })),
        phone: order.userData?.phone,
        fullName: order.userData?.fullName,
        city: data.deliveryInfo.city,
        sourceUrl: req.headers.get('referer'),
        ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
        userAgent: req.headers.get('user-agent'),
        fbp: req.cookies.get('_fbp')?.value,
        fbc: req.cookies.get('_fbc')?.value,
      })

      try {
        await flockNotifier.sendOrderNotification({ ...newOrder.data, path: newOrder.path })
      } catch (error) {
        console.error('Error sending Flock notification:', error)
      }
      const adminEmails = channels.emails
      const adminPhones = channels.phones

      if (adminEmails.length > 0) {
        const notificationData = {
          user_name: order.userData.fullName,
          user_number: order.userData.phone,
          selected_products: cartItems.map(item => item.product.title).join(', '),
          delivery_address: order.deliveryInfo.address,
          delivery_location: order.deliveryInfo.location,
          delivery_date: order.deliveryInfo.deliveryDate
            ? `${format(order.deliveryInfo.deliveryDate, 'PPP')} ${order.deliveryInfo.deliveryTime ?? ''}`
            : '',
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
    } catch (error) {
      console.error('[ORDERS_POST] post-order notifications failed:', error)
    }

    return NextResponse.json({ ...newOrder.data, path: newOrder.path }, { status: 201 })
  } catch (error) {
    console.error('[ORDERS_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
