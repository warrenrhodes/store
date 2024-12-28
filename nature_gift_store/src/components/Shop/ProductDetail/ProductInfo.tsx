'use client'

import { motion } from 'framer-motion'
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Separator } from '@/components/ui/separator'
import { Price } from '@/components/Price'
import {
  canDisplayPromoPrice,
  getPercentageDiscount,
  getRegularPrice,
  getReviewAverage,
} from '@/lib/utils/utils'
import { useCart } from '@/hooks/useCart'
import { useCartSideBar } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { IProduct } from '@/lib/api/products'

export function ProductInfo({ product }: { product: IProduct }) {
  const { title, features, description, price } = product
  const cart = useCart()
  const router = useRouter()
  const cartSideBar = useCartSideBar()
  const cartItem = cart.cartItems.find(item => item.product.id === product.id)
  const handleClickDecrement = () => {
    if (!cartItem) return
    if (1 >= cartItem.quantity) return
    cart.decreaseQuantity(cartItem.product.id)
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
    cart.increaseQuantity(cartItem.product.id)
  }

  const percentageDiscount = canDisplayPromoPrice(product)
    ? getPercentageDiscount(price.regular, price.sale)
    : 0
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
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
                  i < Math.floor(getReviewAverage(product?.reviews || []))
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium">
              {getReviewAverage(product?.reviews || [])}
            </span>
          </div>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-muted-foreground">{product?.reviews?.length} reviews</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Price product={product} />
          {percentageDiscount > 0 && (
            <Badge variant="destructive">Save {percentageDiscount.toFixed(0)}%</Badge>
          )}
        </div>
      </div>

      {description.contentType === 'TEXT' ? (
        <p className="text-muted-foreground">{description.content}</p>
      ) : (
        <div
          className="prose prose-slate prose-sm sm:prose leading-relaxed text-gray-400"
          dangerouslySetInnerHTML={{
            __html: product.description.content,
          }}
        />
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Quantity</label>
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
              className="flex-1 group flex w-full  py-5 gap-1 border-2 border-primary font-bold transition-all duration-300"
              onClick={() => {
                if (!cartItem) {
                  handleClickIncrement()
                }
                cartSideBar.onOpenChange(true)
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />{' '}
              Add to cart
            </Button>

            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <Button
            className="flex w-full  py-5 text-secondary items-center gap-1 border-2 border-primary font-bold transition-all duration-300"
            onClick={() => {
              if (!cartItem) {
                handleClickIncrement()
              }
              setTimeout(() => {
                router.push('/cart')
              }, 1000)
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>

      <Separator />

      {features && (
        <div className="space-y-2">
          <h3 className="font-medium">Key Features</h3>
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
