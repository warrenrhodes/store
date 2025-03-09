'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { usePromotionCalculator } from '@/hooks/usePromotionCalculator'
import { priceFormatted } from '@/lib/utils/utils'
import { Tag } from 'lucide-react'
import { CartItem } from '@/hooks/useCart'
import { useLocalization } from '@/hooks/useLocalization'
import { IDeliveryInfo, OrderSummary } from '@/lib/firebase/models'

interface PromotionSummaryProps {
  cartItems: CartItem[]
  deliveryInfo?: Partial<IDeliveryInfo>
}

export function PromotionSummary({ cartItems, deliveryInfo }: PromotionSummaryProps) {
  const [summary, setSummary] = useState<OrderSummary | null>(null)
  const { calculatePromotions, isCalculating, error } = usePromotionCalculator()
  const { localization } = useLocalization()
  useEffect(() => {
    async function updatePromotions() {
      const result = await calculatePromotions(cartItems, deliveryInfo)
      if (result) {
        setSummary(result)
      }
    }

    updatePromotions()
  }, [calculatePromotions, cartItems, deliveryInfo])

  if (isCalculating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{localization.promotions}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{localization.orderSummary}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>{localization.subtotal}</span>
          <span>{priceFormatted(summary.subtotal)}</span>
        </div>
        {deliveryInfo && (
          <div className="flex justify-between">
            <span>{localization.shipping}</span>
            <span>{priceFormatted(summary.shipping)}</span>
          </div>
        )}

        {summary.appliedPromotions.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">{localization.appliedPromotions}:</h4>
            <div className="space-y-2">
              {summary.appliedPromotions.map(promo => (
                <div key={promo.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs h-6">
                      <Tag className="mr-2 h-4 w-4" /> {promo.code}
                    </Badge>
                  </div>
                  <span className="text-red-600">-{priceFormatted(promo.discountAmount)}</span>
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
            <p className="text-sm text-green-600 mt-1">
              {localization.save} {priceFormatted(summary.discount)}!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
