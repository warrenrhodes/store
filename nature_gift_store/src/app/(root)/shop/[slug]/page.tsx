import { ProductGallery } from '@/components/Shop/ProductDetail/ProductGallery'
import { ProductInfo } from '@/components/Shop/ProductDetail/ProductInfo'
import { FeaturesForProducts } from '@/components/Shop/ProductDetail/ProductFeatures'
import { RelatedProducts } from '@/components/Shop/ProductDetail/RelatedProducts'
import { RelatedBlogs } from '@/components/Shop/ProductDetail/RelatedBlogs'
import { ActivePromotions } from '@/components/Shop/ProductDetail/ActivePromotions'
import { ProductReviews } from '@/components/Shop/ProductDetail/ProductReviews'
import { fetchProductBySlug, fetchRelatedProducts } from '@/lib/api/products'
import { getPromotions } from '@/lib/api/promotions'
import GeneralCTAComponent from '@/components/Cta/GeneralCta'
import { fetchBlogsByQuery } from '@/lib/api/blogs'
import Loader from '@/components/Loader'
import {
  BlogsLoading,
  HeroLoading,
  ProductInfoLoading,
  ProductsLoading,
} from '@/components/Loading'
import { AutoAddToCart } from './autoAddToCart'
// export async function generateStaticParams() {
//   try {
//     const productList = await getProducts({})
//     return productList?.map(c => ({ slug: c.slug })) || []
//   } catch (error) {
//     console.info('Could not fetch products during build:', error)
//     return []
//   }
// }

export async function generateMetadata({ params }: Props) {
  const product = await fetchProductBySlug({ slug: (await params).slug })
  return {
    title: product?.title,
    description: product?.description.content,
    keywords: product?.tags,
    openGraph: {
      images: product?.media.map(m => ({
        url: m.media.url,
      })),
    },
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
  const activePromotions = await getPromotions()

  return <ActivePromotions activePromotions={activePromotions} />
}
async function AutoAddToCartLoader({ slug }: { slug: string }) {
  const product = await fetchProductBySlug({ slug: slug })

  if (!product) return null

  return (
    <div className="flex items-center justify-center">
      <AutoAddToCart product={product} />
    </div>
  )
}
async function FeaturedProductLoader({ slug }: { slug: string }) {
  const product = await fetchProductBySlug({ slug: slug })

  if (!product) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ProductGallery product={product} />
      <ProductInfo product={product} />
    </div>
  )
}

async function FeaturedProductsLoader({ slug }: { slug: string }) {
  const product = await fetchProductBySlug({ slug: slug })
  if (!product) return null
  return <FeaturesForProducts product={product} />
}

async function FeaturedProductReviewLoader({ slug }: { slug: string }) {
  const product = await fetchProductBySlug({ slug: slug })
  if (!product) return null
  return <ProductReviews product={product} />
}

async function RelatedProductLoader({ slug }: { slug: string }) {
  const relatedProducts = await fetchRelatedProducts(slug)
  if (!relatedProducts) return null
  return <RelatedProducts relatedProducts={relatedProducts || []} />
}

async function RelatedBlogLoader({ slug }: { slug: string }) {
  const product = await fetchProductBySlug({ slug: slug })
  const relatedBlogs = await fetchBlogsByQuery({
    query: { categories: product?.categories.map(c => c.categoryId).join(',') },
  })
  if (!relatedBlogs) return null
  return <RelatedBlogs relatedBlogs={relatedBlogs || []} />
}
