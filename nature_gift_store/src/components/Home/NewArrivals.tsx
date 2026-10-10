'use client'

import { useLocalization } from '@/hooks/useLocalization'
import { Product } from '@/lib/firebase/models'
import { ProductSection } from './FeaturedProducts'

export function NewArrivals({ products }: { products: Product[] }) {
  const { localization } = useLocalization()
  return (
    <ProductSection
      title={localization.newArrivals}
      subtitle={localization.latestAdditions}
      products={products}
      className="py-16 sm:py-20 bg-muted/50"
    />
  )
}
