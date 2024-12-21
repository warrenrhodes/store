'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FilterX } from 'lucide-react'
import { ProductCard } from '../ProductCard'
import { GlobalPagination } from '../GlobalPagination'
import { IProduct } from '@/lib/api/products'

interface ProductGridProps {
  products: IProduct[]
  loading: boolean
  clearFilters: () => void
}

export function ProductGrid({ products, loading, clearFilters }: ProductGridProps) {
  if (loading) {
    return (
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`skeleton-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-muted rounded-2xl aspect-[4/5] animate-pulse"
          />
        ))}
      </motion.div>
    )
  }

  if (products.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">
            {"Try adjusting your search or filter criteria to find what you're looking for."}
          </p>
          <Button onClick={clearFilters} variant="outline" className="gap-2">
            <FilterX className="h-4 w-4" />
            Clear all filters
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <GlobalPagination items={products} itemsPerPage={9}>
      {productList => (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden"
        >
          <AnimatePresence>
            {productList.map(product => (
              <ProductCard key={`${product.id}`} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </GlobalPagination>
  )
}
