'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'
import { IProduct } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={item}>
      <Link href={`/products/${product._id}`}>
        <Card className="group overflow-hidden">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.media[0].url}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex flex-col items-start gap-2">
              <div>
                <h3 className="font-bold line-clamp-1">{product.title}</h3>
              </div>
              <div className="flex flex-wrap items-end">
                {product.promoPrice && (
                  <p className="font-semibold text-[15px]">FCFA {product.promoPrice}</p>
                )}
                <p
                  className={cn({
                    'line-through text-[10px] text-red-600': product.promoPrice,
                    'font-semibold text-[15px]': !product.promoPrice,
                  })}
                >
                  FCFA {product.price}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.categories.slice(0, 2).map(category => (
                <Badge key={category._id} variant="outline">
                  {category.title}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
