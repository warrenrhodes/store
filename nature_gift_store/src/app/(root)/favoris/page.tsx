import { WishlistView } from '@/components/WishlistView'
import { getAllCollectionCache } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Product, ProductStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Favoris', robots: { index: false } }

export default async function WishlistPage() {
  const products =
    (await getAllCollectionCache<Product>({
      collection: CollectionsName.Products,
      filters: [
        new QueryFilter('status', '==', ProductStatus.PUBLISHED),
        new QueryFilter('visibility', '==', true),
      ],
    })) || []
  return <WishlistView products={products} />
}
