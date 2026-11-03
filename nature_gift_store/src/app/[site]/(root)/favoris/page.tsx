import { WishlistView } from '@/components/WishlistView'
import { getAllCollectionCache, siteOf } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Product, ProductStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Favoris', robots: { index: false } }

export default async function WishlistPage({ params }: { params: Promise<{ site: string }> }) {
  const storeId = (await siteOf(params)).store?.id ?? null
  const products =
    (await getAllCollectionCache<Product>({
      collection: CollectionsName.Products,
      storeId,
      filters: [
        new QueryFilter('status', '==', ProductStatus.PUBLISHED),
        new QueryFilter('visibility', '==', true),
      ],
    })) || []
  return <WishlistView products={products} />
}
