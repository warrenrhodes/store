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
import {
  getAllCollectionCache,
  getAllValidPromotionCache,
  siteOf,
  StoreScope,
} from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Blog, BlogStatus, Category, Product, ProductStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'

export default async function Home({ params }: { params: Promise<{ site: string }> }) {
  const storeId = (await siteOf(params)).store?.id ?? null
  return (
    <main>
      <Loader loading={<HeroLoading />}>
        <HeroSection />
      </Loader>
      <BrandValues />
      <Loader loading={<CategoryLoading />}>
        <Categories storeId={storeId} />
      </Loader>
      <Loader loading={<ProductsLoading />}>
        <FeaturedProductsLoader storeId={storeId} />
      </Loader>
      <Loader loading={<PromotionLoading />}>
        <PromotionBannerLoader storeId={storeId} />
      </Loader>
      <Loader loading={<ProductsLoading />}>
        <NewArrivalsLoader storeId={storeId} />
      </Loader>
      <Loader loading={<BlogsLoading />}>
        <FeaturedBlogsLoader storeId={storeId} />
      </Loader>
    </main>
  )
}

async function Categories({ storeId }: { storeId: StoreScope }) {
  const categories =
    (await getAllCollectionCache<Category>({ collection: CollectionsName.Categories, storeId })) ||
    []
  const filteredCategories = categories.filter(category => category.parentPath === null)
  return <CategoryShowcase categories={filteredCategories} />
}

async function FeaturedProductsLoader({ storeId }: { storeId: StoreScope }) {
  const featuredProducts =
    (await getAllCollectionCache<Product>({
      collection: CollectionsName.Products,
      storeId,
      filters: [
        new QueryFilter('isFeature', '==', true),
        new QueryFilter('visibility', '==', true),
        new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      ],
    })) || []
  return <FeaturedProducts products={featuredProducts.slice(0, 4)} />
}

async function PromotionBannerLoader({ storeId }: { storeId: StoreScope }) {
  const promotionBanner = await getAllValidPromotionCache(storeId)

  return <PromotionBanner promotions={promotionBanner} />
}

async function NewArrivalsLoader({ storeId }: { storeId: StoreScope }) {
  const newArrivals =
    (await getAllCollectionCache<Product>({
      collection: CollectionsName.Products,
      storeId,
      filters: [
        new QueryFilter('isNewProduct', '==', true),
        new QueryFilter('visibility', '==', true),
        new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      ],
    })) || []

  return <NewArrivals products={newArrivals.slice(0, 4)} />
}

async function FeaturedBlogsLoader({ storeId }: { storeId: StoreScope }) {
  const featuredBlogs =
    (await getAllCollectionCache<Blog>({
      collection: CollectionsName.Blogs,
      storeId,
      filters: [new QueryFilter('status', '==', BlogStatus.PUBLISHED)],
    })) || []

  return <FeaturedBlogs blogs={featuredBlogs.filter(blog => blog.metadata.featured)} />
}
