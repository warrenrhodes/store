'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { ReviewStatus } from '@/lib/firebase/models'
import { revalidatePath } from 'next/cache'
import { getUserTokens } from './server'

/** Publishes or hides a customer review (only on the signed-in partner's products). */
export async function setReviewStatus(reviewId: string, status: ReviewStatus) {
  try {
    const token = await getUserTokens()
    if (!token) return { success: false, error: 'Unauthorized' }
    if (!Object.values(ReviewStatus).includes(status))
      return { success: false, error: 'Invalid status' }
    const ref = backend.db.collection(CollectionsName.Reviews).doc(reviewId)
    if ((await ref.get()).get('creatorId') !== token.decodedToken.uid) {
      return { success: false, error: 'Unauthorized' }
    }
    await ref.update({ status, updatedAt: new Date().toISOString() })
    revalidatePath('/reviews')
    return { success: true }
  } catch (error) {
    console.error('Error updating review status:', error)
    return { success: false, error: 'Internal server error' }
  }
}
