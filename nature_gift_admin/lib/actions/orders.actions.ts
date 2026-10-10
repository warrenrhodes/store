'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { OrderStatus } from '@/lib/firebase/models'
import { getDatabasePath } from '@spreeloop/database'
import { revalidatePath } from 'next/cache'
import { getUserTokens } from './server'

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  [OrderStatus.PENDING]: [OrderStatus.ACCEPTED, OrderStatus.REJECTED],
  [OrderStatus.ACCEPTED]: [OrderStatus.COMPLETED, OrderStatus.CANCELED],
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const token = await getUserTokens()
    if (!token) return { success: false, error: 'Unauthorized' }

    const ref = backend.db.collection(CollectionsName.Orders).doc(orderId)
    const order = (await ref.get()).data()
    if (!order) return { success: false, error: 'Order not found' }

    // Same scoping as the order list: a partner may only touch orders containing their products.
    const partnerPath = getDatabasePath(CollectionsName.Users, token.decodedToken.uid)
    if (!order.partnersPaths?.includes(partnerPath)) {
      return { success: false, error: 'Unauthorized' }
    }
    if (!ALLOWED_TRANSITIONS[order.status]?.includes(status)) {
      return { success: false, error: `Cannot change ${order.status} to ${status}` }
    }

    await ref.update({ status, updatedAt: new Date().toISOString() })
    revalidatePath('/orders')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error updating order status:', error)
    return { success: false, error: 'Internal server error' }
  }
}
