'use client'

import { ArrowRight } from 'lucide-react'
import { SiteLink as Link } from '@/components/Site'
import { ProductCard } from '../ProductCard'
import { useLocalization } from '@/hooks/useLocalization'
import { Product } from '@/lib/firebase/models'
import { DictWords } from '@/lib/localizations'

export function ProductSection({
  title,
  titleKey,
  subtitle,
  products,
  className,
}: {
  title?: string | null
  /** Default heading, in the visitor's language, when `title` is empty. */
  titleKey?: `${DictWords}`
  subtitle?: string
  products: Product[]
  className?: string
}) {
  const { localization } = useLocalization()
  if (products.length === 0) return null

  return (
    <section className={className ?? 'py-16 sm:py-20'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title || (titleKey && localization[titleKey as DictWords])}
            </h2>
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          </div>
          <Link
            href="/shop"
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            {localization.viewAll}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {products.map(product => (
            <ProductCard key={`${product.path}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  const { localization } = useLocalization()
  return (
    <ProductSection
      title={localization.featuredProducts}
      subtitle={localization.topRatedProducts}
      products={products}
    />
  )
}
