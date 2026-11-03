// A store's home page: its theme's sections, in order (docs/MULTI_TENANT_PLAN.md, 3.7). One
// renderer per section type; the admin validates every section (zod) before saving it.
import { CategoryShowcase } from '@/components/Home/CategoryShowcase'
import { ProductSection } from '@/components/Home/FeaturedProducts'
import { HeroSection } from '@/components/Home/HeroSection'
import { PromotionBanner } from '@/components/Home/PromotionBanner'
import { SectionTitle } from '@/components/Home/SectionTitle'
import Loader from '@/components/Loader'
import { CategoryLoading, ProductsLoading, PromotionLoading } from '@/components/Loading'
import { getAllCollectionCache, getAllValidPromotionCache } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Category, Product, ProductStatus, Review, ReviewStatus } from '@/lib/firebase/models'
import { Section, videoEmbedUrl } from '@ngift/core/theme'
import { QueryFilter } from '@spreeloop/database'
import { Star } from 'lucide-react'
import type { ReactNode } from 'react'

type Of<T extends Section['type']> = Extract<Section, { type: T }>
type Props<T extends Section['type']> = { section: Of<T>; storeId: string }

const block = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20'

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
      titleKey={
        ({ featured: 'featuredProducts', new: 'newArrivals', all: 'ourProducts' } as const)[
          section.source
        ]
      }
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
  if (!reviews.length) return null
  return (
    <section className={block}>
      <SectionTitle title={section.title} fallback="customerReviews" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <li key={i} className="rounded-lg border bg-card p-5">
            <p className="flex gap-0.5" aria-label={`${review.rating}/5`}>
              {[1, 2, 3, 4, 5].map(n => (
                <Star
                  key={n}
                  aria-hidden
                  className={`h-4 w-4 ${n <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
                />
              ))}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{review.comment}</p>
            <p className="mt-3 text-sm font-medium text-muted-foreground">{review.userName}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

const Faq = ({ section }: Props<'faq'>) => (
  <section className={`${block} max-w-3xl`}>
    <SectionTitle title={section.title} fallback="frequentlyAskedQuestions" />
    <div className="mt-8 divide-y rounded-lg border">
      {section.items.map((item, i) => (
        <details key={i} className="group p-4">
          <summary className="cursor-pointer font-medium">{item.question}</summary>
          <p className="mt-3 whitespace-pre-line text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  </section>
)

const RichText = ({ section }: Props<'richText'>) => (
  <section className={`${block} max-w-3xl`}>
    {section.title && <h2 className="text-2xl font-semibold sm:text-3xl">{section.title}</h2>}
    <div className="mt-4 space-y-4 leading-relaxed">
      {section.text.split(/\n\s*\n/).map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  </section>
)

const Video = ({ section }: Props<'video'>) => {
  const src = videoEmbedUrl(section.url)
  if (!src) return null
  return (
    <section className={`${block} max-w-4xl`}>
      {section.title && (
        <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">{section.title}</h2>
      )}
      <div className="aspect-video overflow-hidden rounded-lg bg-muted">
        <iframe
          src={src}
          title={section.title || 'Video'}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        />
      </div>
    </section>
  )
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
