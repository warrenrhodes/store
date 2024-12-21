import { BrandValues } from '@/components/Home/BrandValues'
import { CategoryShowcase } from '@/components/Home/CategoryShowcase'
import { FeaturedBlogs } from '@/components/Home/FeaturedBlogs'
import { FeaturedProducts } from '@/components/Home/FeaturedProducts'
import { HeroSection } from '@/components/Home/HeroSection'
import { NewArrivals } from '@/components/Home/NewArrivals'
import { PromotionBanner } from '@/components/Home/PromotionBanner'
import Loader from '@/components/Loader'
import {
  BlogsLoading,
  CategoryLoading,
  HeroLoading,
  ProductsLoading,
  PromotionLoading,
} from '@/components/Loading'
import { fetchAllBlogs } from '@/lib/api/blogs'
import { getCategories } from '@/lib/api/categories'
import { fetchProductsByQuery } from '@/lib/api/products'
import { getPromotions } from '@/lib/api/promotions'

export default function Home() {
  return (
    <main>
      <Loader loading={<HeroLoading />}>
        <HeroSection />
      </Loader>
      <Loader loading={<CategoryLoading />}>
        <Categories />
      </Loader>
      <Loader loading={<ProductsLoading />}>
        <FeaturedProductsLoader />
      </Loader>
      <Loader loading={<PromotionLoading />}>
        <PromotionBannerLoader />
      </Loader>
      <Loader loading={<ProductsLoading />}>
        <NewArrivalsLoader />
      </Loader>
      <BrandValues />
      <Loader loading={<BlogsLoading />}>
        <FeaturedBlogsLoader />
      </Loader>
    </main>
  )
}

async function Categories() {
  const categories = (await getCategories()) || []
  const filteredCategories = categories.filter(category => category.parentId === null)
  return <CategoryShowcase categories={filteredCategories} />
}

async function FeaturedProductsLoader() {
  const featuredProducts =
    (await fetchProductsByQuery({
      query: {
        isFeature: 'true',
      },
    })) || []

  return <FeaturedProducts products={featuredProducts.slice(0, 6)} />
}

async function PromotionBannerLoader() {
  const promotionBanner = (await getPromotions()) || []

  return <PromotionBanner promotions={promotionBanner} />
}

async function NewArrivalsLoader() {
  const newArrivals =
    (await fetchProductsByQuery({
      query: {
        isNewProduct: 'true',
      },
    })) || []

  return <NewArrivals products={newArrivals.slice(0, 6)} />
}

async function FeaturedBlogsLoader() {
  const featuredBlogs = (await fetchAllBlogs()) || []

  return <FeaturedBlogs blogs={featuredBlogs.filter(blog => blog.metadata.featured)} />
}
