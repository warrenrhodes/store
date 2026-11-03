// The home sections' markup, shared by the storefront (StoreSections, real data) and the theme
// preview (ThemePreview, sample data). No data loading and no hooks here.
import { SectionTitle } from '@/components/Home/SectionTitle'
import { Review } from '@/lib/firebase/models'
import { Section, videoEmbedUrl } from '@ngift/core/theme'
import { Star } from 'lucide-react'

export type Of<T extends Section['type']> = Extract<Section, { type: T }>

const block = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20'

/** A product section's default heading, by the products it shows. */
export const PRODUCTS_TITLE = {
  featured: 'featuredProducts',
  new: 'newArrivals',
  all: 'ourProducts',
} as const

export function ReviewList({ section, reviews }: { section: Of<'reviews'>; reviews: Review[] }) {
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

export const Faq = ({ section }: { section: Of<'faq'> }) => (
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

export const RichText = ({ section }: { section: Of<'richText'> }) => (
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

export const Video = ({ section }: { section: Of<'video'> }) => {
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
