'use client'

import {
  ChevronRight,
  Heart,
  Leaf,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  Star,
  Truck,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Price as ProductPriceCP } from '@/components/Price'
import {
  canDisplayPromoPrice,
  cn,
  getPercentageDiscount,
  getRegularPrice,
  getReviewAverage,
} from '@/lib/utils/utils'
import { useCart, useCartSideBar } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useLocalization } from '@/hooks/useLocalization'
import { Feature, Inventory, Price, ProductDescription } from '@/lib/type'
import { Product, Review } from '@/lib/firebase/models'
import { useState } from 'react'
import Link from 'next/link'

export function ProductInfo({ product, reviews }: { product: Product; reviews: Review[] }) {
  const cart = useCart()
  const router = useRouter()
  const cartSideBar = useCartSideBar()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { localization } = useLocalization()
  const [quantity, setQuantity] = useState(1)

  const price = product.price as unknown as Price
  const description = product.description as ProductDescription
  const features = (product.features as Feature[]) || []
  const stock = (product.inventory as Inventory)?.stockQuantity
  const soldOut = stock === 0
  const maxQuantity = stock || 99
  const rating = getReviewAverage(reviews || [])
  const wished = isInWishlist(product.path)
  const discount = canDisplayPromoPrice(product)
    ? getPercentageDiscount(price.regular, price.sale)
    : 0

  const addToCart = () => {
    const cartItem = cart.cartItems.find(item => item.product.path === product.path)
    if (cartItem) {
      cart.setQuantity(product.path, Math.min(maxQuantity, cartItem.quantity + quantity))
    } else {
      cart.addItem({ product, quantity, price: getRegularPrice(product) })
    }
  }

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: product.title, url }).catch(() => {})
    } else {
      await navigator.clipboard.writeText(url)
      toast({ title: localization.linkCopied })
    }
  }

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-foreground">
              {localization.home}
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <li>
            <Link href="/shop" className="hover:text-foreground">
              {localization.shop}
            </Link>
          </li>
          {product.categories[0] && (
            <>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              <li className="text-foreground">{product.categories[0]}</li>
            </>
          )}
        </ol>
      </nav>

      <div className="space-y-3">
        <h1 itemProp="name" className="text-3xl font-semibold leading-tight sm:text-4xl">
          {product.title}
        </h1>
        <a href="#reviews" className="flex w-fit items-center gap-2 text-sm hover:underline">
          <span className="flex" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < Math.round(rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-muted-foreground/40',
                )}
              />
            ))}
          </span>
          <span className="text-muted-foreground">
            {rating > 0 && `${rating} · `}
            {reviews.length} {localization.reviews}
          </span>
        </a>
      </div>

      <div className="flex items-center gap-3">
        <ProductPriceCP product={product} className="[&_span:first-child]:text-2xl" />
        {discount > 0 && (
          <span className="rounded bg-sale px-2 py-0.5 text-xs font-semibold text-sale-foreground">
            {localization.save} {discount.toFixed(0)}%
          </span>
        )}
      </div>

      <p className="flex items-center gap-2 text-sm">
        <span
          className={cn(
            'h-2 w-2 rounded-full',
            soldOut ? 'bg-destructive' : stock && stock <= 10 ? 'bg-sale' : 'bg-primary',
          )}
          aria-hidden
        />
        {soldOut
          ? localization.outOfStock
          : stock && stock <= 10
            ? localization.onlyLeft.replace('{n}', String(stock))
            : localization.inStock}
      </p>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <div
            className="flex h-12 items-center rounded-md border"
            role="group"
            aria-label={localization.quantity}
          >
            <button
              type="button"
              aria-label="-1"
              className="flex h-full w-11 items-center justify-center disabled:opacity-40"
              disabled={quantity <= 1}
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="+1"
              className="flex h-full w-11 items-center justify-center disabled:opacity-40"
              disabled={quantity >= maxQuantity}
              onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button
            variant="outline"
            className="order-last h-12 w-full border-foreground text-base sm:order-none sm:w-auto sm:flex-1"
            disabled={soldOut}
            onClick={() => {
              addToCart()
              cartSideBar.onOpenChange(true)
            }}
          >
            {soldOut ? localization.outOfStock : localization.addToCart}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto h-12 w-12 shrink-0 sm:ml-0"
            aria-label={localization.addToWishlist}
            aria-pressed={wished}
            onClick={() => toggleWishlist(product.path)}
          >
            <Heart className={cn('h-5 w-5', wished && 'fill-destructive text-destructive')} />
          </Button>
        </div>
        <Button
          className="h-12 w-full text-base"
          disabled={soldOut}
          onClick={() => {
            addToCart()
            router.push('/checkout')
          }}
        >
          {localization.buyNow}
        </Button>
        <button
          type="button"
          onClick={share}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <Share2 className="h-4 w-4" aria-hidden />
          {localization.share}
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-3 rounded-lg bg-muted/60 p-4 text-sm">
        {[
          { icon: Truck, label: localization.fastDelivery },
          { icon: ShieldCheck, label: localization.securePayment },
          { icon: Leaf, label: localization.naturalProducts },
          { icon: MessageCircle, label: localization.customerSupport },
        ].map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            {label}
          </li>
        ))}
      </ul>

      <Accordion type="multiple" defaultValue={['description']}>
        <AccordionItem value="description">
          <AccordionTrigger>{localization.description}</AccordionTrigger>
          <AccordionContent>
            <div
              itemProp="description"
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: description.content }}
            />
          </AccordionContent>
        </AccordionItem>
        {features.length > 0 && (
          <AccordionItem value="features">
            <AccordionTrigger>{localization.keyFeatures}</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm">
                {features.map(feature => (
                  <li key={feature.title} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {feature.title}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      {product.blogUrl && (
        <Link
          href={product.blogUrl}
          className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4"
        >
          {localization.getMoreInformation}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      )}

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
        <ProductPriceCP product={product} className="flex-1" />
        <Button
          className="h-11 px-6"
          disabled={soldOut}
          onClick={() => {
            addToCart()
            cartSideBar.onOpenChange(true)
          }}
        >
          {soldOut ? localization.outOfStock : localization.addToCart}
        </Button>
      </div>
    </div>
  )
}
