import { ProductGallery } from '@/components/Shop/ProductDetail/ProductGallery'
import { ProductInfo } from '@/components/Shop/ProductDetail/ProductInfo'
import { FeaturesForProducts } from '@/components/Shop/ProductDetail/ProductFeatures'
import { RelatedProducts } from '@/components/Shop/ProductDetail/RelatedProducts'
import { RelatedBlogs } from '@/components/Shop/ProductDetail/RelatedBlogs'
import { getFreeShippingAreas, getPromotionProducts } from '@/lib/utils/promotion-calculator'
import { ActivePromotions } from '@/components/Shop/ProductDetail/ActivePromotions'
import { ProductReviews } from '@/components/Shop/ProductDetail/ProductReviews'
import Loader from '@/components/Loader'
import {
  BlogsLoading,
  HeroLoading,
  ProductInfoLoading,
  ProductsLoading,
} from '@/components/Loading'
import { AutoAddToCart } from './autoAddToCart'
import {
  getAllCollectionCache,
  getAllRelatedCollectionCache,
  getAllValidPromotionCache,
  getShippingZonesCache,
  getDocumentBySlugCache,
  getListedStoresCache,
  getStoreCache,
  siteOf,
  StoreScope,
} from '@/lib/api/utils'
import { absoluteUrl } from '@/lib/site'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogStatus, Product, ProductStatus, Review } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
import { Inventory, Price } from '@/lib/type'
import { getRegularPrice, getReviewAverage, isPublishedReview } from '@/lib/utils/utils'

/**
 * The product of this page: in a store, that store's; on the marketplace, a listed one, the
 * one sold by `vendor` (a store id, from ?vendeur=) when two stores use the same slug.
 */
const productOf = (slug: string, storeId: StoreScope, vendor?: string) =>
  getDocumentBySlugCache<Product>({ collection: CollectionsName.Products, slug, storeId, vendor })

type Scoped = { slug: string; storeId: StoreScope; vendor?: string }

/** ?vendeur=<store slug> on the marketplace: that listed store's id. */
const vendorOf = async (storeId: StoreScope, param: unknown) => {
  if (storeId || typeof param !== 'string') return undefined
  return (await getListedStoresCache()).find(s => s.slug === param)?.id
}

/** The product's page in its own store: the canonical URL, also from the marketplace. */
const productUrl = async (product: Product) => {
  const store = product.storeId ? await getStoreCache(product.storeId) : null
  return store
    ? absoluteUrl(store.slug, `/shop/${product.slug}`)
    : absoluteUrl('_market', `/shop/${product.slug}`)
}

export async function generateMetadata({ params, searchParams }: Props) {
  const ctx = await siteOf(params)
  const storeId = ctx.store?.id ?? null
  const vendor = await vendorOf(storeId, (await searchParams).vendeur)
  const product = await productOf((await params).slug, storeId, vendor)
  if (!product) return {}
  const metadata = product.metadata
  const title = metadata?.seoTitle || product.title
  const url = await productUrl(product)
  return {
    title,
    description: metadata?.seoDescription,
    keywords: metadata?.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: metadata?.seoDescription,
      url,
      siteName: ctx.store?.name ?? 'N.Gift',
      images: [
        ...[...product.medias].reverse().map(m => ({
          url: m.url,
          width: 800,
          height: 600,
        })),
      ],
    },
    type: 'product',
  }
}

type Props = {
  params: Promise<{ site: string; slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export default async function ProductDetailPage(props: Props) {
  const { slug } = await props.params
  const storeId = (await siteOf(props.params)).store?.id ?? null
  const searchParams = await props.searchParams
  const vendor = await vendorOf(storeId, searchParams?.vendeur)

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28 lg:pb-16">
        {searchParams?.autoAddToCart ? (
          <Loader loading={<ProductInfoLoading />}>
            <AutoAddToCartLoader slug={slug} storeId={storeId} vendor={vendor} />
          </Loader>
        ) : (
          <div className="flex flex-col gap-16">
            <Loader loading={<ProductInfoLoading />}>
              <FeaturedProductLoader
                slug={slug}
                storeId={storeId}
                vendor={vendor}
                promoCode={typeof searchParams?.promo === 'string' ? searchParams.promo : undefined}
              />
            </Loader>
            <Loader loading={<ProductsLoading />}>
              <ActivePromotionsLoader slug={slug} storeId={storeId} vendor={vendor} />
            </Loader>
            <Loader loading={<ProductsLoading />}>
              <FeaturedProductsLoader slug={slug} storeId={storeId} vendor={vendor} />
            </Loader>
            <div id="reviews" className="scroll-mt-24">
              <Loader loading={<HeroLoading />}>
                <FeaturedProductReviewLoader slug={slug} storeId={storeId} vendor={vendor} />
              </Loader>
            </div>
            <Loader loading={<ProductsLoading />}>
              <RelatedProductLoader slug={slug} storeId={storeId} vendor={vendor} />
            </Loader>
            <Loader loading={<BlogsLoading />}>
              <RelatedBlogLoader slug={slug} storeId={storeId} vendor={vendor} />
            </Loader>
          </div>
        )}
      </div>
    </div>
  )
}

async function ActivePromotionsLoader({ slug, storeId, vendor }: Scoped) {
  const product = await productOf(slug, storeId, vendor)
  if (!product) return null
  // The product's store's promotions (on the marketplace too), minus those for other products.
  const activePromotions = await getAllValidPromotionCache(product.storeId ?? null)
  const relevant = activePromotions.filter(
    p => getPromotionProducts(p)?.includes(product?.path ?? '') ?? true,
  )

  return <ActivePromotions activePromotions={relevant} />
}
async function AutoAddToCartLoader({ slug, storeId, vendor }: Scoped) {
  const product = await productOf(slug, storeId, vendor)

  if (!product) return null

  return (
    <div className="flex items-center justify-center">
      <AutoAddToCart product={product} />
    </div>
  )
}
async function FeaturedProductLoader({
  slug,
  storeId,
  vendor,
  promoCode,
}: Scoped & { promoCode?: string }) {
  const product = await productOf(slug, storeId, vendor)
  if (!product) return null

  const reviews = (
    await getAllCollectionCache<Review>({
      collection: CollectionsName.Reviews,
      filters: [new QueryFilter('productPath', '==', product.path)],
      storeId: product.storeId ?? null,
    })
  ).filter(isPublishedReview)

  const price = product.price as unknown as Price
  const stock = (product.inventory as Inventory)?.stockQuantity
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.medias.map(m => m.url),
    description: product.metadata?.seoDescription,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'XAF',
      price: getRegularPrice(product),
      availability: `https://schema.org/${stock === 0 ? 'OutOfStock' : 'InStock'}`,
      url: await productUrl(product),
    },
    ...(reviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: getReviewAverage(reviews),
        reviewCount: reviews.length,
      },
    }),
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ProductGallery product={product} />
      <ProductInfo
        product={product}
        reviews={reviews}
        freeShippingAreas={getFreeShippingAreas(
          await getAllValidPromotionCache(product.storeId ?? null),
          product.path,
          await getShippingZonesCache(product.storeId ?? null),
          promoCode ? [promoCode] : [],
        )}
      />
    </div>
  )
}

async function FeaturedProductsLoader({ slug, storeId, vendor }: Scoped) {
  const product = await productOf(slug, storeId, vendor)
  if (!product) return null
  return <FeaturesForProducts product={product} />
}

async function FeaturedProductReviewLoader({ slug, storeId, vendor }: Scoped) {
  const product = await productOf(slug, storeId, vendor)

  if (!product) return null
  const reviews = (
    await getAllCollectionCache<Review>({
      collection: CollectionsName.Reviews,
      filters: [new QueryFilter('productPath', '==', product.path)],
      storeId: product.storeId ?? null,
    })
  ).filter(isPublishedReview)
  return <ProductReviews product={product} reviews={reviews} />
}

async function RelatedProductLoader({ slug, storeId, vendor }: Scoped) {
  const product = await productOf(slug, storeId, vendor)

  if (!product) return []
  const productWithoutTarget = await getAllRelatedCollectionCache<Product>({
    collection: CollectionsName.Products,
    slug: slug,
    storeId,
    filters: [
      new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      new QueryFilter('visibility', '==', true),
    ],
  })
  const relatedProducts = productWithoutTarget
    .filter(e => e.categories.some(category => product.categories.includes(category)))
    .slice(0, 5)
  if (!relatedProducts) return null
  return <RelatedProducts relatedProducts={relatedProducts || []} />
}

async function RelatedBlogLoader({ slug, storeId, vendor }: Scoped) {
  const product = await productOf(slug, storeId, vendor)
  if (!product) return null
  const allBlog = await getAllCollectionCache<Blog>({
    collection: CollectionsName.Blogs,
    storeId: product.storeId ?? null,
    filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
  })
  const relatedBlogs = allBlog
    .filter(e => e.categories.some(category => product.categories.includes(category)))
    .slice(0, 5)
  if (!relatedBlogs) return null
  return <RelatedBlogs relatedBlogs={relatedBlogs || []} />
}
