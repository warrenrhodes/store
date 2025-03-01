import { ProductGallery } from '@/components/Shop/ProductDetail/ProductGallery'
import { ProductInfo } from '@/components/Shop/ProductDetail/ProductInfo'
import { FeaturesForProducts } from '@/components/Shop/ProductDetail/ProductFeatures'
import { RelatedProducts } from '@/components/Shop/ProductDetail/RelatedProducts'
import { RelatedBlogs } from '@/components/Shop/ProductDetail/RelatedBlogs'
import { ActivePromotions } from '@/components/Shop/ProductDetail/ActivePromotions'
import { ProductReviews } from '@/components/Shop/ProductDetail/ProductReviews'
import GeneralCTAComponent from '@/components/Cta/GeneralCta'
import Loader from '@/components/Loader'
import {
  BlogsLoading,
  HeroLoading,
  ProductInfoLoading,
  ProductsLoading,
} from '@/components/Loading'
import { AutoAddToCart } from './autoAddToCart'
import { getAllCollection, getAllRelatedCollection, getDocumentBySlug } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import {
  Blog,
  BlogStatus,
  Product,
  ProductStatus,
  Promotion,
  PromotionStatus,
  Review,
} from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'

// export async function generateStaticParams() {
//   const product = await getAllCollection<Product>({
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
  const product = await getDocumentBySlug<Product>({
    collection: CollectionsName.Products,
    slug: (await params).slug,
  })
  const metadata = product?.metadata
  return {
    title: metadata.seoTitle,
    description: metadata.seoDescription,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.seoTitle,
      description: metadata.seoDescription,
      url: process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL,
      siteName: 'Nature Gift',
      images: product?.medias.reverse().map(m => ({
        url: m.url,
        width: 800,
        height: 600,
      })),
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <Loader loading={<HeroLoading />}>
              <FeaturedProductReviewLoader slug={slug} />
            </Loader>
            <Loader loading={<ProductsLoading />}>
              <RelatedProductLoader slug={slug} />
            </Loader>
            <GeneralCTAComponent />
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
  const activePromotions = await getAllCollection<Promotion>({
    collection: CollectionsName.Promotions,
    filters: [
      new QueryFilter('status', '==', PromotionStatus.ACTIVE),
      new QueryFilter('startDate', '>=', new Date().toISOString()),
      new QueryFilter('endDate', '<=', new Date().toISOString()),
    ],
  })

  return <ActivePromotions activePromotions={activePromotions} />
}
async function AutoAddToCartLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlug<Product>({
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
  const product = await getDocumentBySlug<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })
  const reviews = await getAllCollection<Review>({
    collection: CollectionsName.Reviews,
    filters: [new QueryFilter('productPath', '==', product?.path)],
  })

  if (!product) return null

  return (
    <div
      itemScope
      itemType={`${process.env.NEXT_PUBLIC_SCHEMA_URL}/shop/${product.slug}`}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <ProductGallery product={product} />
      <ProductInfo product={product} reviews={reviews} />
    </div>
  )
}

async function FeaturedProductsLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlug<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })
  if (!product) return null
  return <FeaturesForProducts product={product} />
}

async function FeaturedProductReviewLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlug<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })

  if (!product) return null
  const reviews = await getAllCollection<Review>({
    collection: CollectionsName.Reviews,
    filters: [new QueryFilter('productPath', '==', product?.path)],
  })
  return <ProductReviews product={product} reviews={reviews} />
}

async function RelatedProductLoader({ slug }: { slug: string }) {
  const relatedProducts = await getAllRelatedCollection<Product>({
    collection: CollectionsName.Products,
    slug: slug,
    filters: [
      new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      new QueryFilter('visibility', '==', true),
    ],
  })
  if (!relatedProducts) return null
  return <RelatedProducts relatedProducts={relatedProducts || []} />
}

async function RelatedBlogLoader({ slug }: { slug: string }) {
  const product = await getDocumentBySlug<Product>({
    collection: CollectionsName.Products,
    slug: slug,
  })
  const relatedBlogs = await getAllCollection<Blog>({
    collection: CollectionsName.Blogs,
    filters: [
      new QueryFilter('status', '==', BlogStatus.PUBLISHED),
      new QueryFilter('categories', 'in', product?.categories.join(',')),
    ],
  })
  if (!relatedBlogs) return null
  return <RelatedBlogs relatedBlogs={relatedBlogs || []} />
}
