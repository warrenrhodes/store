'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Review } from '@/lib/firebase/models'
import { QueryFilter, getDatabasePath } from '@spreeloop/database'
import { unstable_cache } from 'next/cache'
import { isPublishedReview } from '@/lib/utils/utils'

// Called by every product card: shared across visitors for 5 minutes (a failure is not cached).
const readReviews = unstable_cache(
  async (productId: string) =>
    (
      await backend.database.getCollection<Review>({
        collectionPath: CollectionsName.Reviews,
        filters: [
          new QueryFilter(
            'productPath',
            '==',
            getDatabasePath(CollectionsName.Products, productId),
          ),
        ],
      })
    )
      .map(e => ({ ...e.data, path: e.path }))
      .filter(isPublishedReview),
  ['product-reviews'],
  { revalidate: 300 },
)

export async function getReviewsForProduct(productId: string) {
  try {
    return await readReviews(productId)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}
