'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useCallback } from 'react'
import { IProduct } from '@/lib/models/Product'
import { fetchProducts } from '@/lib/api/products'
import { Price } from '../Price'
import Link from 'next/link'
import { cn } from '@/lib/utils/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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

export function NewArrivals() {
  const [products, setProducts] = useState<IProduct[]>([])

  const _fetchProducts = useCallback(async () => {
    const newProducts = await fetchProducts({
      query: {
        isNewProduct: 'true',
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
    <section
      className={cn({
        hidden: products.length === 0,
        'py-24 bg-gray-50': products.length > 0,
      })}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">New Arrivals</h2>
            <p className="mt-2 text-lg text-gray-600">The latest additions to our collection</p>
          </div>
          <Button variant="ghost" className="group" asChild>
            <Link href="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map(product => (
            <motion.div key={product._id} variants={itemVariants}>
              <Card className="group cursor-pointer h-full overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${product.media[0].url})` }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-semibold">{product.title}</h3>
                  <Price product={product} />
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="outline" className="w-full group" asChild>
                    <Link href={`/shop/${product.slug}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
