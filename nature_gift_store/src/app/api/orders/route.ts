import { CartItem } from '@/hooks/useCart'
import { cartStoreErrorStatus, checkoutDocId } from '@/lib/api/cart-store'
import { priceCart } from '@/lib/api/price-cart'
import { SiteStore } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Order, OrderStatus, StoreSecrets } from '@/lib/firebase/models'
import { FlockNotifier } from '@/lib/notifications/flock/flock'
import { sendEmailNotifications, sendSmsNotifications } from '@/lib/notifications/sendNotifications'
import { getDatabasePath } from '@spreeloop/database'
import { FieldValue } from 'firebase-admin/firestore'
import { randomBytes } from 'node:crypto'
import { getStorePixels, requestSignals, sendMetaEvent } from '@/lib/analytics/meta-capi'
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
 * Takes stock and promotion uses for every order of the cart, then writes them all, or nothing
 * (one store out of stock: no order at all, docs 3.4).
 */
async function placeOrders(
  orders: { data: Record<string, unknown>; cart: CartItem[]; promotionPaths: string[] }[],
) {
  const db = backend.db
  const refs = orders.map(() => db.collection(CollectionsName.Orders).doc())
  const lowStock = new Map<string, string[]>() // storeId → lines
  const storeOf = new Map<string, string>() // product path → storeId

  await db.runTransaction(async tx => {
    // Reads first (Firestore transactions require it), then writes.
    const quantities = new Map<string, number>()
    for (const { cart } of orders) {
      for (const i of cart) {
        quantities.set(i.product.path, (quantities.get(i.product.path) ?? 0) + i.quantity)
        storeOf.set(i.product.path, i.product.storeId ?? '')
      }
    }
    const promotionPaths = [...new Set(orders.flatMap(o => o.promotionPaths))]
    const products = await Promise.all([...quantities.keys()].map(path => tx.get(db.doc(path))))
    const promotions = await Promise.all(promotionPaths.map(path => tx.get(db.doc(path))))

    lowStock.clear()
    for (const doc of products) {
      const stock = doc.get('inventory.stockQuantity')
      // No stockQuantity means stock isn't tracked for this product.
      if (typeof stock !== 'number') continue
      const wanted = quantities.get(doc.ref.path)!
      if (wanted > stock) throw new OrderConflict('OUT_OF_STOCK', doc.ref.path)
      const threshold = doc.get('inventory.lowStockThreshold')
      if (stock - wanted <= (typeof threshold === 'number' ? threshold : 0)) {
        const store = storeOf.get(doc.ref.path)!
        lowStock.set(store, [
          ...(lowStock.get(store) ?? []),
          `${doc.get('title')}: ${stock - wanted} left`,
        ])
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
    orders.forEach((o, i) => {
      tx.set(refs[i], o.data)
      // Each store's abandoned checkout is marked converted by its own order.
      if (typeof o.data.checkoutId === 'string') {
        tx.set(
          db.collection(CollectionsName.Checkouts).doc(o.data.checkoutId),
          { orderPath: refs[i].path, updatedAt: o.data.createdAt },
          { merge: true },
        )
      }
    })
  })
  return { refs, lowStock }
}

/**
 * After the commit, to the order's store only: low stock and order alerts (Flock, email, SMS)
 * and the Meta purchase (every Pixel of the store, event id = the order id). Never throws: the
 * order is saved, an error here would make the customer order twice.
 */
async function notifyStore(
  req: NextRequest,
  store: SiteStore,
  order: Order & { path: string },
  lowStock: string[],
) {
  try {
    const channels = await storeChannels(store)
    const flockNotifier = channels.flock
    if (lowStock.length > 0) await flockNotifier.sendText(`⚠️ Low stock\n${lowStock.join('\n')}`)
    await sendMetaEvent(await getStorePixels(store), {
      name: 'Purchase',
      eventId: order.path.split('/').pop()!,
      value: order.orderPrices.total,
      contents: order.items.map(i => ({
        id: i.product.path.split('/').pop()!,
        quantity: i.quantity,
        item_price: i.price,
      })),
      phone: order.userData?.phone,
      email: order.userData?.email,
      fullName: order.userData?.fullName,
      city: order.deliveryInfo.city,
      ...requestSignals(req),
    })
    try {
      await flockNotifier.sendOrderNotification(order)
    } catch (error) {
      console.error('Error sending Flock notification:', error)
    }
    const info = order.deliveryInfo
    if (channels.emails.length > 0) {
      const notificationData = {
        user_name: order.userData.fullName,
        user_number: order.userData.phone,
        selected_products: order.items.map(item => item.product.title).join(', '),
        delivery_address: info.address,
        delivery_location: info.location,
        delivery_date: info.deliveryDate
          ? `${format(info.deliveryDate, 'PPP')} ${info.deliveryTime ?? ''}`
          : '',
      }
      try {
        await Promise.all(
          channels.emails.map(email =>
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
    if (channels.phones.length > 0) {
      try {
        await Promise.all(
          channels.phones.map(phone =>
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
}

/**
 * Places the cart: one order per store (a store's page: always one), priced on the server, all
 * written in one transaction. Orders of the same cart share `checkoutGroupId` and the tracking
 * token, so /order/group/<id> shows them together.
 */
export const POST = async (req: NextRequest) => {
  const { order, cartItems: rawItems, promoCodes, checkoutId, site } = await req.json()
  const priced = await priceCart({
    items: rawItems,
    site,
    delivery: order?.deliveryInfo,
    codes: Array.isArray(promoCodes) ? promoCodes.map(String).slice(0, 5) : [],
    fresh: true,
    uses: await promotionUsesByPhone(order?.userData?.phone),
  })
  if ('error' in priced) {
    if (priced.error === 'INVALID_CART') {
      return NextResponse.json({ error: 'Invalid cart' }, { status: 400 })
    }
    return NextResponse.json(
      { error: priced.error },
      { status: cartStoreErrorStatus[priced.error] },
    )
  }
  const now = new Date().toISOString()
  const trackingToken = randomBytes(16).toString('hex')
  const checkoutGroupId = priced.groups.length > 1 ? randomBytes(10).toString('hex') : null

  const orders = priced.groups.map(({ store, cart, summary, area }) => ({
    store,
    cart,
    promotionPaths: [...new Set(summary.appliedPromotions.map(p => p.id))],
    data: {
      userPath: order.userData?.id
        ? getDatabasePath(CollectionsName.Users, order.userData?.id)
        : null,
      deliveryInfo: {
        ...order.deliveryInfo,
        // This store's own area (its location id, name and city); none: to confirm.
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
      storeId: store.id,
      checkoutGroupId,
      items: cart.map(item => ({
        product: {
          medias: item.product.medias,
          title: item.product.title,
          path: item.product.path,
          price: item.product.price,
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
      trackingToken,
      stockReserved: true,
      // Same id rule as /api/checkouts (which only accepts these ids).
      checkoutId:
        typeof checkoutId === 'string' && /^[\w-]{10,64}$/.test(checkoutId)
          ? checkoutDocId(checkoutId, store.id, priced.groups.length)
          : null,
      history: [{ at: now, by: 'customer', type: 'created', status: OrderStatus.PENDING }],
      createdAt: now,
      updatedAt: now,
    },
  }))

  try {
    let placed
    try {
      placed = await placeOrders(orders)
    } catch (error) {
      if (error instanceof OrderConflict) {
        return NextResponse.json({ error: error.code, detail: error.detail }, { status: 409 })
      }
      throw error
    }
    const saved = orders.map((o, i) => ({
      ...(o.data as unknown as Order),
      path: placed.refs[i].path,
    }))
    await Promise.all(
      orders.map((o, i) =>
        notifyStore(req, o.store, saved[i], placed.lowStock.get(o.store.id) ?? []),
      ),
    )
    // The first order at the top level, as before the split (one order in a store's page).
    return NextResponse.json(
      { ...saved[0], orders: saved, checkoutGroupId, trackingToken },
      { status: 201 },
    )
  } catch (error) {
    console.error('[ORDERS_POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
