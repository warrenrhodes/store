'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { scopedDelete, scopedUpdate } from '@/lib/tenant'
import { revalidatePath } from 'next/cache'

/** Remembers that the customer was called/messaged, so the team doesn't contact them twice. */
export async function markCheckoutContacted(checkoutId: string, contacted: boolean) {
  const ok = await scopedUpdate(CollectionsName.Checkouts, checkoutId, {
    contactedAt: contacted ? new Date().toISOString() : null,
  }).catch(() => false)
  if (!ok) return { success: false, error: 'Unauthorized' }
  revalidatePath('/checkouts')
  return { success: true }
}

export async function deleteCheckout(checkoutId: string) {
  const ok = await scopedDelete(CollectionsName.Checkouts, checkoutId).catch(() => false)
  if (!ok) return { success: false, error: 'Unauthorized' }
  revalidatePath('/checkouts')
  return { success: true }
}
