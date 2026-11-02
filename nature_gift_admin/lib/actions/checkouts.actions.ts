'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { getDatabasePath } from '@spreeloop/database'
import { revalidatePath } from 'next/cache'
import { getUserTokens } from './server'

/** Abandoned checkout the signed-in partner may manage (contains their products). */
async function ownCheckout(checkoutId: string) {
  const token = await getUserTokens()
  if (!token) return
  const ref = backend.db.collection(CollectionsName.Checkouts).doc(checkoutId)
  const partnersPaths: string[] = (await ref.get()).get('partnersPaths') ?? []
  return partnersPaths.includes(getDatabasePath(CollectionsName.Users, token.decodedToken.uid))
    ? ref
    : undefined
}

/** Remembers that the customer was called/messaged, so the team doesn't contact them twice. */
export async function markCheckoutContacted(checkoutId: string, contacted: boolean) {
  const ref = await ownCheckout(checkoutId)
  if (!ref) return { success: false, error: 'Unauthorized' }
  await ref.update({ contactedAt: contacted ? new Date().toISOString() : null })
  revalidatePath('/checkouts')
  return { success: true }
}

export async function deleteCheckout(checkoutId: string) {
  const ref = await ownCheckout(checkoutId)
  if (!ref) return { success: false, error: 'Unauthorized' }
  await ref.delete()
  revalidatePath('/checkouts')
  return { success: true }
}
