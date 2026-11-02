'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Order, OrderEvent, OrderStatus } from '@/lib/firebase/models'
import {
  canTransition,
  EDITABLE_STATUSES,
  recomputeTotals,
  releasesStock,
  stockDelta,
} from '@/lib/orders/order-logic'
import { getDatabasePath } from '@spreeloop/database'
import { FieldValue, Transaction } from 'firebase-admin/firestore'
import { revalidatePath } from 'next/cache'
import { getUserTokens } from './server'

type Result = { success: true } | { success: false; error: string }

/** Thrown inside a transaction to abort it with a message for the admin. */
class Refused extends Error {}

/**
 * Runs `work` in a transaction on an order the signed-in partner may manage (same scoping as
 * the order list: orders containing their products), then refreshes the order pages.
 */
async function withOrder(
  orderId: string,
  work: (
    tx: Transaction,
    order: Order,
    ref: FirebaseFirestore.DocumentReference,
    by: string,
  ) => Promise<void>,
): Promise<Result> {
  try {
    const token = await getUserTokens()
    if (!token) return { success: false, error: 'Unauthorized' }
    const by = token.decodedToken.email ?? token.decodedToken.uid
    const partnerPath = getDatabasePath(CollectionsName.Users, token.decodedToken.uid)
    const ref = backend.db.collection(CollectionsName.Orders).doc(orderId)

    await backend.db.runTransaction(async tx => {
      const snapshot = await tx.get(ref)
      const order = snapshot.data() as Order | undefined
      if (!order) throw new Refused('Order not found')
      if (!order.partnersPaths?.includes(partnerPath)) throw new Refused('Unauthorized')
      await work(tx, order, ref, by)
    })
    revalidatePath('/orders')
    revalidatePath(`/orders/${orderId}`)
    revalidatePath('/customers')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    if (error instanceof Refused) return { success: false, error: error.message }
    console.error('Order action failed:', error)
    return { success: false, error: 'Internal server error' }
  }
}

const event = (by: string, e: Omit<OrderEvent, 'at' | 'by'>): OrderEvent => ({
  at: new Date().toISOString(),
  by,
  ...e,
})

/** Products whose stock is tracked (numeric stockQuantity), read inside the transaction. */
async function trackedStock(tx: Transaction, paths: string[]) {
  const docs = await Promise.all(paths.map(path => tx.get(backend.db.doc(path))))
  return new Map(
    docs
      .filter(doc => typeof doc.get('inventory.stockQuantity') === 'number')
      .map(doc => [doc.ref.path, doc]),
  )
}

/** Moves an order along the delivery workflow; canceling/rejecting puts its stock back. */
export async function updateOrderStatus(orderId: string, status: string, note?: string) {
  return withOrder(orderId, async (tx, order, ref, by) => {
    if (!canTransition(order.status, status)) {
      throw new Refused(`Cannot change ${order.status} to ${status}`)
    }
    const restock = releasesStock(status, order.stockReserved)
    const stock = restock
      ? await trackedStock(
          tx,
          order.items.map(i => i.product.path),
        )
      : new Map()

    for (const item of order.items) {
      const doc = stock.get(item.product.path)
      if (doc)
        tx.update(doc.ref, { 'inventory.stockQuantity': FieldValue.increment(item.quantity) })
    }
    tx.update(ref, {
      status,
      ...(restock ? { stockReserved: false } : {}),
      updatedAt: new Date().toISOString(),
      history: FieldValue.arrayUnion(
        event(by, { type: 'status', status: status as OrderStatus, message: note?.trim() || null }),
      ),
    })
  })
}

export type OrderEdit = {
  /** Every line of the edited order; quantity 0 removes a line, an unknown path adds a product. */
  items: Array<{ path: string; quantity: number }>
  shipping: number
  manualDiscount: number
}

const currentPrice = (product: FirebaseFirestore.DocumentData) => {
  const price = product.price ?? {}
  const now = Date.now()
  const start = price.saleStartDate ? new Date(price.saleStartDate).getTime() : NaN
  const end = price.saleEndDate ? new Date(price.saleEndDate).getTime() : NaN
  return price.sale && start <= now && now <= end ? price.sale : price.regular
}

/**
 * Shopify-style order edit before shipping: quantities, added/removed products, shipping fee
 * (e.g. once confirmed by phone) and a manual discount. Stock follows the change.
 */
export async function editOrder(orderId: string, edit: OrderEdit) {
  return withOrder(orderId, async (tx, order, ref, by) => {
    if (!EDITABLE_STATUSES.includes(order.status)) {
      throw new Refused('Only pending or accepted orders can be edited')
    }
    const wanted = edit.items.filter(
      i => Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 99,
    )
    if (wanted.length === 0) throw new Refused('An order needs at least one item')
    if (!(edit.shipping >= 0) || !(edit.manualDiscount >= 0)) throw new Refused('Invalid amount')

    // Existing lines keep the price they were sold at; added products take today's price.
    const existing = new Map(order.items.map(i => [i.product.path, i]))
    const added = wanted.filter(i => !existing.has(i.path))
    const addedDocs = await Promise.all(added.map(i => tx.get(backend.db.doc(i.path))))
    const now = new Date().toISOString()
    const items = wanted.map(i => {
      const line = existing.get(i.path)
      if (line) return { ...line, quantity: i.quantity }
      const doc = addedDocs.find(d => d.ref.path === i.path)
      if (!doc?.exists || !i.path.startsWith(`${CollectionsName.Products}/`)) {
        throw new Refused('Unknown product')
      }
      const product = doc.data()!
      return {
        product: {
          medias: product.medias ?? [],
          title: product.title,
          path: doc.ref.path,
          price: product.price,
          creatorId: product.creatorId,
        },
        quantity: i.quantity,
        price: currentPrice(product),
        createdAt: now,
        updatedAt: now,
      }
    })

    const delta = order.stockReserved ? stockDelta(order.items, items) : new Map<string, number>()
    const stock = await trackedStock(tx, [...delta.keys()])
    for (const [path, more] of delta) {
      const doc = stock.get(path)
      if (!doc) continue
      if (more > doc.get('inventory.stockQuantity'))
        throw new Refused(`Not enough stock for ${doc.get('title')}`)
      tx.update(doc.ref, { 'inventory.stockQuantity': FieldValue.increment(-more) })
    }

    const totals = recomputeTotals({
      items,
      shipping: edit.shipping,
      promotions: order.promotions ?? [],
      manualDiscount: edit.manualDiscount,
    })
    const changes = [
      ...order.items
        .filter(i => !items.some(n => n.product.path === i.product.path))
        .map(i => `removed ${i.product.title}`),
      ...items.flatMap(n => {
        const before = existing.get(n.product.path)
        if (!before) return [`added ${n.quantity} × ${n.product.title}`]
        return before.quantity !== n.quantity
          ? [`${n.product.title}: ${before.quantity} → ${n.quantity}`]
          : []
      }),
      ...(order.orderPrices.shipping !== totals.orderPrices.shipping
        ? [`shipping ${order.orderPrices.shipping} → ${totals.orderPrices.shipping}`]
        : []),
      ...((order.manualDiscount ?? 0) !== totals.manualDiscount
        ? [`manual discount ${order.manualDiscount ?? 0} → ${totals.manualDiscount}`]
        : []),
    ]
    if (changes.length === 0) return

    tx.update(ref, {
      items,
      promotions: totals.promotions,
      manualDiscount: totals.manualDiscount,
      orderPrices: totals.orderPrices,
      partnersPaths: [
        ...new Set([
          ...order.partnersPaths,
          ...items.map(i => getDatabasePath(CollectionsName.Users, i.product.creatorId)),
        ]),
      ],
      updatedAt: now,
      history: FieldValue.arrayUnion(event(by, { type: 'edit', message: changes.join(' · ') })),
    })
  })
}

/** Internal note on the order timeline (not shown to the customer). */
export async function addOrderNote(orderId: string, note: string) {
  const message = note.trim().slice(0, 1000)
  if (!message) return { success: false, error: 'Empty note' } as Result
  return withOrder(orderId, async (tx, _order, ref, by) => {
    tx.update(ref, {
      updatedAt: new Date().toISOString(),
      history: FieldValue.arrayUnion(event(by, { type: 'note', message })),
    })
  })
}
