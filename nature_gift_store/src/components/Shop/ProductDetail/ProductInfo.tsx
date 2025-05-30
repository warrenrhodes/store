'use client'

import { motion } from 'framer-motion'
import {
  ChevronRight,
  ChevronsRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Separator } from '@/components/ui/separator'
import { Price as ProductPriceCP } from '@/components/Price'
import {
  canDisplayPromoPrice,
  getPercentageDiscount,
  getRegularPrice,
  getReviewAverage,
} from '@/lib/utils/utils'
import { useCart } from '@/hooks/useCart'
import { useCartSideBar } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useLocalization } from '@/hooks/useLocalization'
import { Feature, Price, ProductDescription } from '@/lib/type'
import { Product, Review } from '@/lib/firebase/models'
import { useState } from 'react'
import Link from 'next/link'

export function ProductInfo({ product, reviews }: { product: Product; reviews: Review[] }) {
  const {
    title,
    features: productFeatures,
    description: productDescription,
    price: productPrice,
  } = product
  const cart = useCart()
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const MAX_CHARS = 300
  const cartSideBar = useCartSideBar()
  const cartItem = cart.cartItems.find(item => item.product.path === product.path)
  const { localization } = useLocalization()
  const price: Price | undefined = productPrice as unknown as Price | undefined
  const description = productDescription as ProductDescription
  const features = productFeatures as Feature[]

  const truncatedText = (text: string) => text.slice(0, MAX_CHARS).concat('.....')
  const shouldTruncate = (text: string) => text.length > MAX_CHARS

  const handleClickDecrement = () => {
    if (!cartItem) return
    if (1 >= cartItem.quantity) return
    cart.decreaseQuantity(cartItem.product.path)
  }
  const handleClickIncrement = () => {
    if (!cartItem) {
      cart.addItem({
        product: product,
        quantity: 1,
        price: getRegularPrice(product),
      })
      return
    }

    if (99 <= cartItem.quantity) return
    cart.increaseQuantity(cartItem.product.path)
  }

  const percentageDiscount = canDisplayPromoPrice(product)
    ? getPercentageDiscount(price.regular, price.sale)
    : 0
  return (
    <div className="space-y-6">
      <div>
        <h1 itemProp="name" className="text-3xl font-bold">
          {title}
        </h1>
        <div className="space-x-1">
          {product.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="inline-block text-xs text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(getReviewAverage(reviews || []))
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium">{getReviewAverage(reviews || [])}</span>
          </div>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-muted-foreground">
            {reviews.length} {localization.reviews}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ProductPriceCP product={product} />
          {percentageDiscount > 0 && (
            <Badge variant="destructive">
              {localization.save} {percentageDiscount.toFixed(0)}%
            </Badge>
          )}
        </div>
      </div>
      <span>
        <span
          itemProp="description"
          className="prose prose-slate prose-sm sm:prose leading-relaxed text-gray-400"
          dangerouslySetInnerHTML={{
            __html: isExpanded ? description.content : truncatedText(description.content),
          }}
        />
        {shouldTruncate && (
          <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="group">
            {isExpanded ? localization.showLess : localization.readMore}
            {
              <ChevronsRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            }
          </Button>
        )}
      </span>
      {product.blogUrl && (
        <div>
          <Button variant="outline" asChild className="group">
            <Link href={product.blogUrl}>
              {localization.getMoreInformation}
              {
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
            </Link>
          </Button>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{localization.quantity}</label>
          <div className="nc-NcInputNumber__content flex w-[104px] items-center justify-between sm:w-28 mt-5">
            <Button variant="outline" size="icon" onClick={handleClickDecrement}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center">{cartItem?.quantity || 1}</span>
            <Button variant="outline" size="icon" onClick={handleClickIncrement}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className=" flex flex-col gap-5">
          <div className="flex gap-4">
            <Button
              variant={'outline'}
              className="flex-1 group flex w-full py-5 gap-1 border-2 border-primary font-bold transition-all duration-300"
              onClick={() => {
                if (!cartItem) {
                  handleClickIncrement()
                }
                cartSideBar.onOpenChange(true)
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />{' '}
              {localization.addToCart}
            </Button>

            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <Button
            className="flex w-full py-5 text-secondary items-center gap-1 border-2 border-primary font-bold transition-all duration-300"
            onClick={() => {
              if (!cartItem) {
                handleClickIncrement()
              }
              setTimeout(() => {
                router.push('/cart')
              }, 1000)
            }}
          >
            {localization.buyNow}
          </Button>
        </div>
      </div>

      <Separator />

      {features && features.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">{localization.keyFeatures}</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {features.map(feature => (
              <li key={feature.title} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-primary mr-2"
                />
                {feature.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
