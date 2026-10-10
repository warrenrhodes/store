'use client'
import { ProductCard } from '@/components/ProductCard'
import { useLocalization } from '@/hooks/useLocalization'
import { Product } from '@/lib/firebase/models'

export function RelatedProducts({ relatedProducts }: { relatedProducts: Product[] }) {
  const { localization } = useLocalization()
  if (relatedProducts.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8">{localization.youMayAlsoLike}</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
        {relatedProducts.slice(0, 4).map(product => (
          <ProductCard key={`${product.path}`} product={product} />
        ))}
      </div>
    </section>
  )
}
