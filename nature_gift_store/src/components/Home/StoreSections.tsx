// A store's home page: its theme's sections, in order (docs/MULTI_TENANT_PLAN.md, 3.7). One
// renderer per section type (markup in SectionViews, shared with the theme preview); the admin
// validates every section (zod) before saving it.
import { CategoryShowcase } from '@/components/Home/CategoryShowcase'
import { ProductSection } from '@/components/Home/FeaturedProducts'
import { HeroSection } from '@/components/Home/HeroSection'
import { PromotionBanner } from '@/components/Home/PromotionBanner'
import { Faq, Of, PRODUCTS_TITLE, ReviewList, RichText, Video } from '@/components/Home/SectionViews'
import Loader from '@/components/Loader'
import { CategoryLoading, ProductsLoading, PromotionLoading } from '@/components/Loading'
import { getAllCollectionCache, getAllValidPromotionCache } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Category, Product, ProductStatus, Review, ReviewStatus } from '@/lib/firebase/models'
import { Section } from '@ngift/core/theme'
import { QueryFilter } from '@spreeloop/database'
import type { ReactNode } from 'react'

type Props<T extends Section['type']> = { section: Of<T>; storeId: string }

async function Products({ section, storeId }: Props<'featuredProducts'>) {
  const flag = { featured: 'isFeature', new: 'isNewProduct', all: null }[section.source]
  const products =
    (await getAllCollectionCache<Product>({
      collection: CollectionsName.Products,
      storeId,
      filters: [
        ...(flag ? [new QueryFilter(flag, '==', true)] : []),
        new QueryFilter('visibility', '==', true),
        new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      ],
    })) || []
  return (
    <ProductSection
      title={section.title}
      titleKey={PRODUCTS_TITLE[section.source]}
      products={products.slice(0, section.limit)}
    />
  )
}

async function Categories({ section, storeId }: Props<'categoryGrid'>) {
  const categories =
    (await getAllCollectionCache<Category>({ collection: CollectionsName.Categories, storeId })) ||
    []
  return (
    <CategoryShowcase
      title={section.title}
      categories={categories.filter(category => category.parentPath === null)}
    />
  )
}

async function Promotions({ storeId }: Props<'promoBanner'>) {
  return <PromotionBanner promotions={await getAllValidPromotionCache(storeId)} />
}

async function Reviews({ section, storeId }: Props<'reviews'>) {
  const reviews = (
    (await getAllCollectionCache<Review>({
      collection: CollectionsName.Reviews,
      storeId,
    })) || []
  )
    .filter(r => !r.status || r.status === ReviewStatus.APPROVED)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, section.limit)
  return <ReviewList section={section} reviews={reviews} />
}

const RENDER: { [T in Section['type']]: (props: Props<T>) => ReactNode } = {
  hero: ({ section }) => <HeroSection {...section} />,
  featuredProducts: props => (
    <Loader loading={<ProductsLoading />}>
      <Products {...props} />
    </Loader>
  ),
  categoryGrid: props => (
    <Loader loading={<CategoryLoading />}>
      <Categories {...props} />
    </Loader>
  ),
  promoBanner: props => (
    <Loader loading={<PromotionLoading />}>
      <Promotions {...props} />
    </Loader>
  ),
  reviews: props => (
    <Loader loading={null}>
      <Reviews {...props} />
    </Loader>
  ),
  faq: Faq,
  richText: RichText,
  video: Video,
}

export function StoreSections({ sections, storeId }: { sections: Section[]; storeId: string }) {
  return (
    <main>
      {sections
        .filter(section => !section.hidden && RENDER[section.type])
        .map(section => {
          const Render = RENDER[section.type] as (props: Props<typeof section.type>) => ReactNode
          return <Render key={section.id} section={section} storeId={storeId} />
        })}
    </main>
  )
}
