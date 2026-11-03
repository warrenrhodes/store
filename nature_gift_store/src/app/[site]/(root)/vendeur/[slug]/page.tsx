import { VendorHeader } from '@/components/Market/VendorHeader'
import { ProductCard } from '@/components/ProductCard'
import { getAllCollectionCache, getListedStoresCache, siteOf } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Product, ProductStatus } from '@/lib/firebase/models'
import { absoluteUrl } from '@/lib/site'
import { QueryFilter } from '@spreeloop/database'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ site: string; slug: string }> }

/** A listed store, on the marketplace only (a store's own pages are under /boutique/<slug>). */
const vendorOf = async (props: Props) => {
  const [{ store }, { slug }] = await Promise.all([siteOf(props.params), props.params])
  if (store) return undefined
  return (await getListedStoresCache()).find(s => s.slug === slug)
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const vendor = await vendorOf(props)
  return vendor
    ? {
        title: vendor.name,
        alternates: { canonical: absoluteUrl('_market', `/vendeur/${vendor.slug}`) },
      }
    : {}
}

/** Vendor page: the store's marketplace products, and the way to its own storefront. */
export default async function VendorPage(props: Props) {
  const vendor = await vendorOf(props)
  if (!vendor) notFound()
  const products =
    (await getAllCollectionCache<Product>({
      collection: CollectionsName.Products,
      storeId: null,
      filters: [
        new QueryFilter('storeId', '==', vendor.id),
        new QueryFilter('visibility', '==', true),
        new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      ],
    })) || []
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <VendorHeader name={vendor.name} slug={vendor.slug} empty={products.length === 0} />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
        {products.map(product => (
          <ProductCard key={product.path} product={product} />
        ))}
      </div>
    </main>
  )
}
