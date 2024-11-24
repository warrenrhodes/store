'use client'

import { IProduct } from '@/lib/types'
import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'

interface ProductListProps {
  products: IProduct[]
}

export function ProductList({ products }: ProductListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </motion.div>
  )
}
