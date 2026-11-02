'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { ReviewStatus } from '@/lib/firebase/models'
import { revalidatePath } from 'next/cache'
import { scopedUpdate } from '@/lib/tenant'

/** Publishes or hides a customer review (only the current store's reviews). */
export async function setReviewStatus(reviewId: string, status: ReviewStatus) {
  try {
    if (!Object.values(ReviewStatus).includes(status))
      return { success: false, error: 'Invalid status' }
    if (!(await scopedUpdate(CollectionsName.Reviews, reviewId, { status }))) {
      return { success: false, error: 'Unauthorized' }
    }
    revalidatePath('/reviews')
    return { success: true }
  } catch (error) {
    console.error('Error updating review status:', error)
    return { success: false, error: 'Internal server error' }
  }
}
