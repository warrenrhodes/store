'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { IProduct } from '@/lib/models/Product'
import { useCart } from '@/hooks/useCart'
import { ProductCard } from '../ProductCard'
import { fetchProducts } from '@/lib/api/products'

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<IProduct[]>([])

  const _fetchProducts = useCallback(async () => {
    const newProducts = await fetchProducts({
      query: {
        isFeature: 'true',
      },
    })
    if (newProducts) {
      setProducts(newProducts)
    }
  }, [])

  useEffect(() => {
    _fetchProducts()
  }, [_fetchProducts])

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Top-rated products chosen for quality and innovation
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
