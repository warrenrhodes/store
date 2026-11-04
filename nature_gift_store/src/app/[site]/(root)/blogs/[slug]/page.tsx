import AdsBlogDetail from '@/components/Blogs/AdsBlockDetail/AdsBlockDetail'
import Loader from '@/components/Loader'
import BlogSkeleton from '@/components/Loading'
import {
  getAllRelatedCollectionCache,
  getAllValidPromotionCache,
  getShippingZonesCache,
  getDocumentByPathCache,
  getDocumentBySlugCache,
  siteOf,
} from '@/lib/api/utils'
import { absoluteUrl } from '@/lib/site'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogMetadata, BlogStatus, Product } from '@/lib/firebase/models'
import { getFreeShippingAreas } from '@/lib/utils/promotion-calculator'
import { filterZonesByCity } from '@/lib/utils/shipping-zones'
import { getDocumentId, QueryFilter } from '@spreeloop/database'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ site: string; slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props) {
  const { site, store } = await siteOf(params)
  const { slug } = await params
  const blog = await getDocumentBySlugCache<Blog>({
    collection: CollectionsName.Blogs,
    slug,
    storeId: store?.id ?? null,
  })
  if (!blog) return {}
  const metadata = blog?.metadata as undefined | BlogMetadata
  const name = store?.name ?? 'N.Gift'
  return {
    applicationName: name,
    alternates: { canonical: absoluteUrl(site, `/blogs/${slug}`) },
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: metadata.author.name, url: metadata.author.avatar }],
    creator: metadata.author.name,
    publisher: metadata.author.name,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: absoluteUrl(site, `/blogs/${slug}`),
      siteName: name,
      images: [
        {
          url: metadata.coverImage?.url ?? '/default-image.png',
        },
      ],
      publishedTime: blog?.publishedAt,
      type: 'article',
    },
  }
}

export default async function BlogAdsDetailPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { store } = await siteOf(props.params)
  const blog = await getDocumentBySlugCache<Blog>({
    collection: CollectionsName.Blogs,
    slug: params.slug,
    storeId: store?.id ?? null,
  })
  if (!blog) {
    notFound()
  }
  // The blog's store sells, delivers and discounts (on the marketplace too).
  const storeId = blog.storeId ?? null

  const allBlog = await getAllRelatedCollectionCache<Blog>({
    collection: CollectionsName.Blogs,
    slug: params.slug,
    storeId,
    filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
  })
  const relatedBlogs = allBlog
    .filter(e => e.categories.some(category => blog.categories.includes(category)))
    .slice(0, 5)

  let associateProduct: Product | undefined
  if (blog.associateProductPath) {
    associateProduct = await getDocumentByPathCache<Product>({
      path: blog.associateProductPath ?? '',
    })
  }
  if (searchParams?.product) {
    associateProduct = await getDocumentBySlugCache<Product>({
      slug: searchParams?.product as string,
      collection: CollectionsName.Products,
      storeId: storeId,
    })
  }
  // Only a product of the blog's store can be ordered from its page.
  if (associateProduct && associateProduct.storeId !== blog.storeId) associateProduct = undefined

  // Ads targeting one city link with ?ville=<city>: only that city's areas are offered.
  const shipments = filterZonesByCity(
    await getShippingZonesCache(storeId),
    searchParams?.ville as string | undefined,
  )
  const freeShippingAreas = associateProduct
    ? getFreeShippingAreas(
        await getAllValidPromotionCache(storeId),
        associateProduct.path,
        shipments,
        typeof searchParams?.promo === 'string' ? [searchParams.promo] : [],
      )
    : null

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loader loading={<BlogSkeleton />}>
          <AdsBlogDetail
            // The thank-you page is shown by /order/success: not sent to the browser here.
            blog={{ ...blog, thankYouPage: null }}
            // Always sent: /order/success decides, so a page opened before its thank-you page was
            // set (or served from cache) still leads to it.
            adId={getDocumentId(blog.path)}
            shipments={shipments}
            associateProduct={associateProduct}
            relatedBlogs={relatedBlogs}
            freeShippingAreas={freeShippingAreas}
          />
        </Loader>
      </div>
    </div>
  )
}
