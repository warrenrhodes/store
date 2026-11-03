'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { usePromotionCalculator } from '@/hooks/usePromotionCalculator'
import { foldFreeShipping, priceFormatted } from '@/lib/utils/utils'
import { Tag } from 'lucide-react'
import { CartItem } from '@/hooks/useCart'
import { useLocalization } from '@/hooks/useLocalization'
import { IDeliveryInfo, OrderSummary } from '@/lib/firebase/models'
import { usePromoCodes } from '@/hooks/usePromoCodes'

interface PromotionSummaryProps {
  cartItems: CartItem[]
  deliveryInfo?: Partial<IDeliveryInfo>
}

export function PromotionSummary({ cartItems, deliveryInfo }: PromotionSummaryProps) {
  const [summary, setSummary] = useState<OrderSummary | null>(null)
  const { calculatePromotions, isCalculating, error } = usePromotionCalculator()
  const { localization } = useLocalization()
  const codes = usePromoCodes(state => state.codes)
  useEffect(() => {
    async function updatePromotions() {
      const result = await calculatePromotions(cartItems, deliveryInfo, codes)
      if (result) {
        setSummary(result)
      }
    }

    updatePromotions()
  }, [calculatePromotions, cartItems, deliveryInfo, codes])

  if (isCalculating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{localization.orderSummary}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" aria-busy>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    )
  }

  if (!summary || error) {
    return null
  }

  const shown = foldFreeShipping(summary.shipping, summary.appliedPromotions)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{localization.orderSummary}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>{localization.subtotal}</span>
          <span>{priceFormatted(summary.subtotal)}</span>
        </div>
        {deliveryInfo && (
          <div className="flex justify-between">
            <span>{localization.shipping}</span>
            <span className={shown.waived ? 'font-medium text-primary' : undefined}>
              {shown.waived && !shown.shipping ? localization.free : priceFormatted(shown.shipping)}
            </span>
          </div>
        )}

        {shown.promotions.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">{localization.appliedPromotions}:</h4>
            <div className="space-y-2">
              {shown.promotions.map(promo => (
                <div key={promo.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs h-6">
                      <Tag className="mr-2 h-4 w-4" /> {promo.code}
                    </Badge>
                  </div>
                  <span className="text-primary">-{priceFormatted(promo.discountAmount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold">
            <span>{localization.total}</span>
            <span>{priceFormatted(summary.total)}</span>
          </div>
          {summary.discount > 0 && (
            <p className="text-sm text-primary mt-1">
              {localization.save} {priceFormatted(summary.discount)}!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
