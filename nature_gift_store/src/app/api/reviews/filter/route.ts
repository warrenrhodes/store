import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { Review } from '@/lib/firebase/models'
import { QueryFilter, getDatabasePath } from '@spreeloop/database'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const productId = searchParams.get('productId')
  try {
    if (productId) {
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

      return NextResponse.json(
        reviews.map(e => ({ ...e.data, path: e.path })),
        { status: 200 },
      )
    }

    return NextResponse.json([], { status: 200 })
  } catch (e) {
    return NextResponse.json(`Internal Server Error ${e}`, { status: 500 })
  }
}
