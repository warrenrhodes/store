import { getAllCollectionCache } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Product, ProductStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')

  if (!q) {
    return NextResponse.json([])
  }

  // Fetch all published products
  const products = await getAllCollectionCache<Product>({
    collection: CollectionsName.Products,
    filters: [
      new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      new QueryFilter('visibility', '==', true),
    ],
  })

  // Filter in memory on the server
  // Note: Firestore doesn't support substring search, so we fetch all and filter here.
  // This is still efficient for < 1000 items and prevents the client from receiving the entire catalog.
  const searchTerm = q.toLowerCase()
  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(searchTerm))
    .slice(0, 10) // Limit to 10 results for search bar
    .map((product) => ({
      // Return only necessary fields to minimize payload
      title: product.title,
      slug: product.slug,
      path: product.path,
      medias: product.medias.slice(0, 1),
      price: product.price,
      isFeature: product.isFeature,
    }))

  return NextResponse.json(filteredProducts)
}
