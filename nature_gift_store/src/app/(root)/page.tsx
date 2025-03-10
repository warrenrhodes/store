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
import { getAllCollection, getAllValidPromotion } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogStatus, Category, Product, ProductStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'

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
  const categories =
    (await getAllCollection<Category>({ collection: CollectionsName.Categories })) || []
  const filteredCategories = categories.filter(category => category.parentPath === null)
  return <CategoryShowcase categories={filteredCategories} />
}

async function FeaturedProductsLoader() {
  const featuredProducts =
    (await getAllCollection<Product>({
      collection: CollectionsName.Products,
      filters: [
        new QueryFilter('isFeature', '==', true),
        new QueryFilter('visibility', '==', true),
        new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      ],
    })) || []
  return <FeaturedProducts products={featuredProducts.slice(0, 6)} />
}

async function PromotionBannerLoader() {
  const promotionBanner = await getAllValidPromotion()

  return <PromotionBanner promotions={promotionBanner} />
}

async function NewArrivalsLoader() {
  const newArrivals =
    (await getAllCollection<Product>({
      collection: CollectionsName.Products,
      filters: [
        new QueryFilter('isNewProduct', '==', true),
        new QueryFilter('visibility', '==', true),
        new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      ],
    })) || []

  return <NewArrivals products={newArrivals.slice(0, 6)} />
}

async function FeaturedBlogsLoader() {
  const featuredBlogs =
    (await getAllCollection<Blog>({
      collection: CollectionsName.Blogs,
      filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
    })) || []

  return <FeaturedBlogs blogs={featuredBlogs.filter(blog => blog.metadata.featured)} />
}
