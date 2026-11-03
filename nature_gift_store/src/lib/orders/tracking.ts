import { timingSafeEqual } from 'node:crypto'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Order } from '@/lib/firebase/models'

/** The order behind a tracking link, or undefined when the id or token doesn't match. */
export async function getTrackedOrder(orderId: string, token?: string | null) {
  if (!/^[\w-]{10,40}$/.test(orderId) || !token) return undefined
  const doc = await backend.db.collection(CollectionsName.Orders).doc(orderId).get()
  const expected = doc.get('trackingToken')
  if (typeof expected !== 'string' || expected.length !== token.length) return undefined
  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(token))) return undefined
  return { ...(doc.data() as Order), path: doc.ref.path }
}

/**
 * The orders of one marketplace cart (one per store) behind a group tracking link, or
 * undefined when the id or token doesn't match. They share the tracking token.
 */
export async function getTrackedGroup(groupId: string, token?: string | null) {
  if (!/^[\w-]{10,40}$/.test(groupId) || !token) return undefined
  const docs = (
    await backend.db
      .collection(CollectionsName.Orders)
      .where('checkoutGroupId', '==', groupId)
      .get()
  ).docs
  const valid = (expected: unknown) =>
    typeof expected === 'string' &&
    expected.length === token.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(token))
  if (docs.length === 0 || !docs.every(doc => valid(doc.get('trackingToken')))) return undefined
  return docs.map(doc => ({ ...(doc.data() as Order), path: doc.ref.path, id: doc.id }))
}
