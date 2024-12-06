import { ProductGallery } from '@/components/Shop/ProductDetail/ProductGallery'
import { ProductInfo } from '@/components/Shop/ProductDetail/ProductInfo'
import { ProductFeatures } from '@/components/Shop/ProductDetail/ProductFeatures'
import { RelatedProducts } from '@/components/Shop/ProductDetail/RelatedProducts'
import { RelatedBlogs } from '@/components/Shop/ProductDetail/RelatedBlogs'
import { ActivePromotions } from '@/components/Shop/ProductDetail/ActivePromotions'
import { notFound } from 'next/navigation'
import { ProductReviews } from '@/components/Shop/ProductDetail/ProductReviews'
import { fetchAllProducts, fetchProducts } from '@/lib/api/products'
import { getPromotions } from '@/lib/api/promotions'
import GeneralCTAComponent from '@/components/Cta/GeneralCta'
import { getFilterBlogs } from '@/lib/api/blogs'
// export async function generateStaticParams() {
//   try {
//     const productList = await getProducts({})
//     return productList?.map(c => ({ slug: c.slug })) || []
//   } catch (error) {
//     console.info('Could not fetch products during build:', error)
//     return []
//   }
// }

// export async function generateMetadata({ params }: Props) {
//   const selectedProduct = await getProducts({ query: { slug: params.slug } })
//   const product = selectedProduct && selectedProduct[0]
//   return {
//     title: product?.title,
//     description: product?.description.content,
//     keywords: product?.tags,
//     openGraph: {
//       images: product?.media.map(m => ({
//         url: m.url,
//       })),
//     },
//   }
// }

type Props = {
  params: { slug: string }
}
export default async function ProductDetailPage(props: Props) {
  const productList = await fetchAllProducts()
  const activePromotions = await getPromotions()
  const product = productList?.find(p => p.slug === props.params.slug)
  const relatedProducts = productList?.filter(
    p =>
      p.slug !== props.params.slug &&
      p.categories.some(c => product?.categories.map(c => c._id).includes(c._id)),
  )

  if (!product) {
    notFound()
  }
  console.log('product', product)
  const relatedBlogs =
    product &&
    (await getFilterBlogs({
      query: { categories: product.categories.map(c => c._id).join(',') },
    }))

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>

          {activePromotions && (
            <ActivePromotions
              activePromotions={activePromotions?.filter(p => p.actions.length > 0) || []}
            />
          )}
          <ProductFeatures product={product} />
          <ProductReviews product={product} />
          <RelatedProducts relatedProducts={relatedProducts || []} />
          <GeneralCTAComponent />
          <RelatedBlogs relatedBlogs={relatedBlogs || []} />
        </div>
      </div>
    </div>
  )
}
