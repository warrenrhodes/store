// @refresh reset
'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '../ProductCard'

import { useLocalization } from '@/hooks/useLocalization'
import { Product } from '@/lib/firebase/models'
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  const { localization } = useLocalization()

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {localization.featuredProducts}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{localization.topRatedProducts}</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map(product => (
            <ProductCard key={`${product.path}`} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
