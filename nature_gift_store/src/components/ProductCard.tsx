'use client'

import { getReviewsForProduct } from '@/actions/review'
import { useCart } from '@/hooks/useCart'
import { useLocalization } from '@/hooks/useLocalization'
import { useWishlist } from '@/hooks/useWishlist'
import { Product, Review } from '@/lib/firebase/models'
import { Inventory, Price as IPrice } from '@/lib/type'
import { FAKE_BLUR } from '@/lib/utils/constants'
import {
  canDisplayPromoPrice,
  cn,
  getPercentageDiscount,
  getRegularPrice,
  getReviewAverage,
} from '@/lib/utils/utils'
import { getDocumentId } from '@spreeloop/database'
import { Heart, Plus, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Price } from './Price'
import { Button } from './ui/button'

export function ProductCard({ product }: { product: Product }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const cart = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { localization } = useLocalization()

  useEffect(() => {
    // ponytail: one server action per card; batch on the server if the grid gets large
    getReviewsForProduct(getDocumentId(product.path)).then(setReviews)
  }, [product.path])

  const price = product.price as unknown as IPrice
  const stock = (product.inventory as Inventory)?.stockQuantity
  const soldOut = stock === 0
  const discount = canDisplayPromoPrice(product)
    ? getPercentageDiscount(price.regular, price.sale)
    : 0
  const rating = getReviewAverage(reviews)
  const wished = isInWishlist(product.path)
  const [main, hover] = product.medias

  return (
    <div className="group relative flex h-full flex-col">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={main.url}
          alt={product.title}
          fill
          className={cn(
            'object-cover transition duration-500 group-hover:scale-[1.03]',
            hover && 'group-hover:opacity-0',
          )}
          placeholder="blur"
          blurDataURL={main.blurDataUrl || FAKE_BLUR}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {hover && (
          <Image
            src={hover.url}
            alt=""
            fill
            className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {soldOut ? (
            <span className="rounded bg-foreground px-2 py-0.5 text-xs font-semibold text-background">
              {localization.outOfStock}
            </span>
          ) : discount > 0 ? (
            <span className="rounded bg-sale px-2 py-0.5 text-xs font-semibold text-sale-foreground">
              -{discount.toFixed(0)}%
            </span>
          ) : null}
          {product.isNewProduct && !soldOut && (
            <span className="rounded bg-background px-2 py-0.5 text-xs font-semibold text-foreground shadow-sm">
              {localization.new}
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        aria-label={localization.addToWishlist}
        aria-pressed={wished}
        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm transition hover:scale-105 cursor-pointer"
        onClick={() => toggleWishlist(product.path)}
      >
        <Heart className={cn('h-4 w-4', wished && 'fill-destructive text-destructive')} />
      </button>

      <div className="flex flex-1 flex-col gap-1 pt-3">
        {product.categories[0] && (
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.categories[0]}
          </span>
        )}
        <Link
          href={`/shop/${product.slug}`}
          className="line-clamp-2 text-sm font-medium leading-snug hover:underline underline-offset-4"
        >
          {product.title}
        </Link>
        {rating > 0 && (
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviews.length})</span>
          </div>
        )}
        <Price product={product} className="mt-auto pt-1" />
      </div>

      <Button
        variant="outline"
        className="mt-3 w-full"
        disabled={soldOut}
        onClick={() => cart.addItem({ product, price: getRegularPrice(product), quantity: 1 })}
      >
        <Plus className="mr-1 h-4 w-4" aria-hidden />
        {soldOut ? localization.outOfStock : localization.addToCart}
      </Button>
    </div>
  )
}
