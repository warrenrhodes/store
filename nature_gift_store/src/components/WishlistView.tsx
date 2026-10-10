'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from './ProductCard'
import { Button } from './ui/button'
import { useLocalization } from '@/hooks/useLocalization'
import { useWishlistStore } from '@/hooks/store/useWishlistStore'
import { Product } from '@/lib/firebase/models'

export function WishlistView({ products }: { products: Product[] }) {
  const items = useWishlistStore(s => s.items)
  const { localization } = useLocalization()
  const wished = products.filter(p => items.has(p.path))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-3xl font-semibold">{localization.wishlist}</h1>
      {wished.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <Heart className="h-12 w-12 text-muted-foreground" aria-hidden />
          <h2 className="mt-4 text-xl font-semibold">{localization.wishlistEmpty}</h2>
          <p className="mt-2 text-muted-foreground">{localization.wishlistEmptyDescription}</p>
          <Button asChild className="mt-6">
            <Link href="/shop">{localization.continueShopping}</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {wished.map(product => (
            <ProductCard key={product.path} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
