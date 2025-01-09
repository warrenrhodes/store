'use client'

import { Tag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart, useCartDeliveryInfo } from '@/hooks/useCart'
import { priceFormatted } from '@/lib/utils/utils'
import { MutableRefObject, useState } from 'react'
import { useEffect } from 'react'
import { usePromotionCalculator } from '@/hooks/usePromotionCalculator'
import { OrderSummary as OrderSummaryType } from '@/lib/api/orders'
import { Skeleton } from '../ui/skeleton'
import { Badge } from '../ui/badge'
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

  if (isCalculating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Promotions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Promotions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{localization.failedToLoadPromotions}</p>
        </CardContent>
      </Card>
    )
  }

  if (!summary) {
    return null
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>{localization.orderSummary}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map(item => (
          <div key={`${item.product.id}`} className="flex justify-between text-sm">
            <span>
              {item.product.title} x {item.quantity}
            </span>
            <span>{priceFormatted(item.price * item.quantity)}</span>
          </div>
        ))}

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{localization.subtotal}</span>
            <span>{priceFormatted(summary.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{localization.shipping}</span>
            <span>{priceFormatted(summary.shipping)}</span>
          </div>
          {summary.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>{localization.discount}</span>
              <span>-{priceFormatted(summary.discount)}</span>
            </div>
          )}
          {summary.appliedPromotions.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">{localization.appliedPromotions}:</h4>
              <div className="space-y-2">
                {summary.appliedPromotions.map(promo => (
                  <div key={promo.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 w-auto">
                      <Badge className="text-[10px] h-9">
                        <Tag className="mr-2 h-4 w-4" /> {promo.code}
                      </Badge>
                    </div>
                    <span className="text-red-600 text-[15px] flex">
                      -{priceFormatted(promo.discountAmount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-medium">
          <span>{localization.total}</span>
          <span>{priceFormatted(summary?.total)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
