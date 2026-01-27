'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Review } from '@/lib/firebase/models'
import { QueryFilter, getDatabasePath } from '@spreeloop/database'

export async function getReviewsForProduct(productId: string) {
  try {
    const reviews = await backend.database.getCollection<Review>({
      collectionPath: CollectionsName.Reviews,
      filters: [
        new QueryFilter(
          'productPath',
          '==',
          getDatabasePath(CollectionsName.Products, productId),
        ),
      ],
    })

    // Return serializable data
    return reviews.map(e => ({ ...e.data, path: e.path }))
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}
