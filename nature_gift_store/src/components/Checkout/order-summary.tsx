'use client'

import { Tag } from 'lucide-react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { useCart, useCartDeliveryInfo } from '@/hooks/useCart'
import { priceFormatted } from '@/lib/utils/utils'
import { MutableRefObject, useState } from 'react'
import { useEffect } from 'react'
import { usePromotionCalculator } from '@/hooks/usePromotionCalculator'
import { OrderSummary as OrderSummaryType } from '@/lib/firebase/models'
import { Skeleton } from '../ui/skeleton'
import { useLocalization } from '@/hooks/useLocalization'

export function OrderSummary({
  orderSummary,
}: {
  orderSummary: MutableRefObject<OrderSummaryType | undefined>
}) {
  const { cartItems } = useCart()
  const { cartDeliveryInfo } = useCartDeliveryInfo()

  const [summary, setSummary] = useState<OrderSummaryType | null>(null)
  const { calculatePromotions, isCalculating, error } = usePromotionCalculator()
  const { localization } = useLocalization()

  useEffect(() => {
    async function updatePromotions() {
      const result = await calculatePromotions(cartItems, cartDeliveryInfo)
      if (result) {
        orderSummary.current = result
        setSummary(result)
      }
    }

    updatePromotions()
  }, [cartItems, cartDeliveryInfo])

  return (
    <div className="rounded-xl border bg-muted/40 p-5 lg:sticky lg:top-24">
      <h2 className="text-xl font-semibold">{localization.orderSummary}</h2>
      <ul className="mt-5 space-y-4">
        {cartItems.map(item => (
          <li key={`${item.product.path}`} className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-lg border bg-background">
              <Image
                src={item.product.medias[0].url}
                alt=""
                fill
                sizes="64px"
                className="rounded-lg object-cover"
              />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-xs font-semibold text-background">
                {item.quantity}
              </span>
            </div>
            <span className="flex-1 text-sm font-medium line-clamp-2">{item.product.title}</span>
            <span className="text-sm tabular-nums">
              {priceFormatted(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <Separator className="my-5" />

      {isCalculating || !summary ? (
        <div className="space-y-3" aria-busy>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{localization.subtotal}</span>
            <span className="tabular-nums">{priceFormatted(summary.subtotal)}</span>
          </div>
          {summary.shipping > 0 && (
            <div className="flex justify-between">
              <span>{localization.shipping}</span>
              <span className="tabular-nums">{priceFormatted(summary.shipping)}</span>
            </div>
          )}
          {summary.appliedPromotions.map(promo => (
            <div key={promo.id} className="flex justify-between text-primary">
              <span className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" aria-hidden /> {promo.code}
              </span>
              <span className="tabular-nums">-{priceFormatted(promo.discountAmount)}</span>
            </div>
          ))}
          <Separator className="!my-4" />
          <div className="flex items-baseline justify-between text-base font-semibold">
            <span>{localization.total}</span>
            <span className="text-xl tabular-nums">{priceFormatted(summary.total)}</span>
          </div>
        </div>
      )}
      {error && (
        <p className="mt-3 text-sm text-destructive">{localization.failedToLoadPromotions}</p>
      )}
    </div>
  )
}
