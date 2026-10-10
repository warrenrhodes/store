import { ProductGallery } from '@/components/Shop/ProductDetail/ProductGallery'
import { ProductInfo } from '@/components/Shop/ProductDetail/ProductInfo'
import { FeaturesForProducts } from '@/components/Shop/ProductDetail/ProductFeatures'
import { RelatedProducts } from '@/components/Shop/ProductDetail/RelatedProducts'
import { RelatedBlogs } from '@/components/Shop/ProductDetail/RelatedBlogs'
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
  getDocumentBySlugCache,
} from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogStatus, Product, ProductStatus, Review } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
import { Inventory, Price } from '@/lib/type'
import { getRegularPrice, getReviewAverage } from '@/lib/utils/utils'

// export async function generateStaticParams() {
//   const product = await getAllCollectionCache<Product>({
//     collection: CollectionsName.Products,
//     filters: [
//       new QueryFilter('status', '==', ProductStatus.PUBLISHED),
//       new QueryFilter('visibility', '==', true),
//     ],
//   })

//   return product.map(post => ({
//     slug: post.slug,
//   }))
// }

export async function generateMetadata({ params }: Props) {
  const product = await getDocumentBySlugCache<Product>({
    collection: CollectionsName.Products,
    slug: (await params).slug,
  })
  if (!product) return {}
  const metadata = product.metadata
  const title = metadata?.seoTitle || product.title
  return {
    title,
    description: metadata?.seoDescription,
    keywords: metadata?.keywords,
    openGraph: {
      title,
      description: metadata?.seoDescription,
      url: process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL,
      siteName: 'Nature Gift',
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
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export default async function ProductDetailPage(props: Props) {
  const { slug } = await props.params
  const searchParams = await props.searchParams

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28 lg:pb-16">
        {searchParams?.autoAddToCart ? (
          <Loader loading={<ProductInfoLoading />}>
            <AutoAddToCartLoader slug={slug} />
          </Loader>
        ) : (
          <div className="flex flex-col gap-16">
            <Loader loading={<ProductInfoLoading />}>
              <FeaturedProductLoader slug={slug} />
            </Loader>
            <Loader loading={<ProductsLoading />}>
              <ActivePromotionsLoader />
            </Loader>
            <Loader loading={<ProductsLoading />}>
              <FeaturedProductsLoader slug={slug} />
            </Loader>
            <div id="reviews" className="scroll-mt-24">
              <Loader loading={<HeroLoading />}>
                <FeaturedProductReviewLoader slug={slug} />
              </Loader>
            </div>
            <Loader loading={<ProductsLoading />}>
              <RelatedProductLoader slug={slug} />
            </Loader>
            <Loader loading={<BlogsLoading />}>
              <RelatedBlogLoader slug={slug} />
            </Loader>
          </div>
        )}
      </div>
    </div>
  )
}

async function ActivePromotionsLoader() {
  const activePromotions = await getAllValidPromotionCache()

  return <ActivePromotions activePromotions={activePromotions} />
}
async function AutoAddToCartLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlugCache<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })

  if (!product) return null

  return (
    <div className="flex items-center justify-center">
      <AutoAddToCart product={product} />
    </div>
  )
}
async function FeaturedProductLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlugCache<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })
  if (!product) return null

  const reviews = await getAllCollectionCache<Review>({
    collection: CollectionsName.Reviews,
    filters: [new QueryFilter('productPath', '==', product?.path)],
  })

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
      url: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/shop/${product.slug}`,
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
      <ProductInfo product={product} reviews={reviews} />
    </div>
  )
}

async function FeaturedProductsLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlugCache<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })
  if (!product) return null
  return <FeaturesForProducts product={product} />
}

async function FeaturedProductReviewLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlugCache<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })

  if (!product) return null
  const reviews = await getAllCollectionCache<Review>({
    collection: CollectionsName.Reviews,
    filters: [new QueryFilter('productPath', '==', product?.path)],
  })
  return <ProductReviews product={product} reviews={reviews} />
}

async function RelatedProductLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlugCache<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })

  if (!product) return []
  const productWithoutTarget = await getAllRelatedCollectionCache<Product>({
    collection: CollectionsName.Products,
    slug: slug,
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

async function RelatedBlogLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlugCache<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })
  const allBlog = await getAllCollectionCache<Blog>({
    collection: CollectionsName.Blogs,
    filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
  })
  const relatedBlogs = allBlog
    .filter(e => e.categories.some(category => product.categories.includes(category)))
    .slice(0, 5)
  if (!relatedBlogs) return null
  return <RelatedBlogs relatedBlogs={relatedBlogs || []} />
}
