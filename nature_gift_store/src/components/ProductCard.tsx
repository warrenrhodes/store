'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { cn, getRegularPrice, getReviewAverage } from '@/lib/utils/utils'
import { useCart } from '@/hooks/useCart'
import { Button } from './ui/button'
import { Price } from './Price'
import Link from 'next/link'
import Image from 'next/image'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useWishlist } from '@/hooks/useWishlist'
import { useLocalization } from '@/hooks/useLocalization'
import { Inventory } from '@/lib/type'
import { Product, Review } from '@/lib/firebase/models'
import { useCallback, useEffect, useState } from 'react'
import { getDocumentId } from '@spreeloop/database'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const cart = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { localization } = useLocalization()

  const fetchReview = useCallback(async () => {
    const reviews = await fetch(`/api/reviews/filter?productId=${getDocumentId(product.path)}`)

    if (reviews.ok) {
      const s = await reviews.json()
      setReviews(s)
    }
  }, [])
  useEffect(() => {
    fetchReview()
  }, [fetchReview])
  return (
    <motion.div key={`${product.path}`}>
      <Card className="group h-full flex flex-col overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative">
            <Link href={`/shop/${product.slug}`}>
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src={product.medias[0].url}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={product.medias[0].blurDataUrl || FAKE_BLUR}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.isNewProduct && (
                  <Badge className="absolute top-4 left-4">{localization.new}</Badge>
                )}
                {(product.inventory as Inventory).stockQuantity &&
                  (product.inventory as Inventory).stockQuantity <= 10 && (
                    <Badge variant="destructive" className="absolute bottom-4 right-4 ring-1">
                      {localization.lowStock}
                    </Badge>
                  )}
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'absolute top-4 right-4 backdrop-blur-sm z-0',
                isInWishlist(product.path)
                  ? 'bg-red-500/80 hover:bg-red-500 text-white hover:text-white'
                  : 'bg-white/80 hover:bg-white',
              )}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                toggleWishlist(product.path)
              }}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-2">
          <div className="flex items-center mb-2 gap-2 w-full">
            {product.categories.slice(0, 3).map(category => (
              <Badge variant="outline" key={`${category}`} className="line-clamp-1 text-center">
                {category}
              </Badge>
            ))}

            {getReviewAverage(reviews) > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{getReviewAverage(reviews || [])}</span>
                <span className="text-sm text-muted-foreground">({reviews.length})</span>
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
        <CardFooter className="w-full p-2">
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
            {localization.addToCart}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
