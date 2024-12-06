'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { getRegularPrice, getReviewAverage } from '@/lib/utils/utils'
import { IProduct } from '@/lib/models/Product'
import { useCart } from '@/hooks/useCart'
import { Button } from './ui/button'
import { Price } from './Price'
import Link from 'next/link'

interface ProductCardProps {
  product: IProduct
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function ProductCard({ product }: ProductCardProps) {
  const cart = useCart()
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div key={`${product._id}`}>
      <Card className="group h-full flex flex-col overflow-hidden">
        <CardHeader className="p-0">
          <Link href={`/shop/${product.slug}`}>
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${product.media[0].url})` }}
              />
              {product.isNewProduct && <Badge className="absolute top-4 left-4">New</Badge>}
              {product.inventory.stockQuantity && product.inventory.stockQuantity <= 10 && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  Low Stock
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </Link>
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <div className="flex items-center justify-between mb-2">
            {product.categories.slice(0, 1).map(category => (
              <Badge variant="outline" key={`${category._id}`}>
                {category.name}
              </Badge>
            ))}

            {getReviewAverage(product.reviews || []) > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {getReviewAverage(product.reviews || [])}
                </span>
                <span className="text-sm text-muted-foreground">({product.reviews?.length})</span>
              </div>
            )}
          </div>
          <CardTitle className="line-clamp-2">{product.title}</CardTitle>
          <div className="mt-2 space-x-1">
            {product.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="inline-block text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
          <Price product={product} />
        </CardContent>
        <CardFooter className="p-6">
          <Button
            className="w-full group"
            onClick={() => {
              cart.addItem({
                product: product,
                price: getRegularPrice(product),
                quantity: 1,
              })
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
