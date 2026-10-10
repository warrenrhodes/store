'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FilterX } from 'lucide-react'
import { ProductCard } from '../ProductCard'
import { GlobalPagination } from '../GlobalPagination'
import { useLocalization } from '@/hooks/useLocalization'
import { Product } from '@/lib/firebase/models'

interface ProductGridProps {
  products: Product[]
  loading: boolean
  clearFilters: () => void
}

export function ProductGrid({ products, loading, clearFilters }: ProductGridProps) {
  const { localization } = useLocalization()

  if (loading) {
    return (
      <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`skeleton-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-muted rounded-lg aspect-square animate-pulse"
          />
        ))}
      </motion.div>
    )
  }

  if (products.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-medium mb-2">{localization.noProductsFound}</h3>

          <Button onClick={clearFilters} variant="outline" className="gap-2">
            <FilterX className="h-4 w-4" />
            {localization.clearAll}
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <GlobalPagination items={products} itemsPerPage={12}>
      {productList => (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6">
          {productList.map(product => (
            <ProductCard key={`${product.path}`} product={product} />
          ))}
        </div>
      )}
    </GlobalPagination>
  )
}
