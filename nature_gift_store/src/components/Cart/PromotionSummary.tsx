'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { usePromotionCalculator } from '@/hooks/usePromotionCalculator'
import { priceFormatted } from '@/lib/utils/utils'
import { Tag } from 'lucide-react'
import { IDeliveryInfo, OrderSummary } from '@/lib/api/orders'
import { CartItem } from '@/hooks/useCart'

interface PromotionSummaryProps {
  cartItems: CartItem[]
  deliveryInfo?: Partial<IDeliveryInfo>
}

export function PromotionSummary({ cartItems, deliveryInfo }: PromotionSummaryProps) {
  const [summary, setSummary] = useState<OrderSummary | null>(null)
  const { calculatePromotions, isCalculating, error } = usePromotionCalculator()

  useEffect(() => {
    async function updatePromotions() {
      const result = await calculatePromotions(cartItems, deliveryInfo)
      if (result) {
        setSummary(result)
      }
    }

    updatePromotions()
  }, [cartItems, deliveryInfo])

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
          <p className="text-destructive">Failed to load promotions</p>
        </CardContent>
      </Card>
    )
  }

  if (!summary) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{priceFormatted(summary.subtotal)}</span>
        </div>
        {deliveryInfo && (
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{priceFormatted(summary.shipping)}</span>
          </div>
        )}

        {summary.appliedPromotions.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Applied Promotions:</h4>
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
            <span>Total</span>
            <span>{priceFormatted(summary.total)}</span>
          </div>
          {summary.discount > 0 && (
            <p className="text-sm text-green-600 mt-1">
              You saved {priceFormatted(summary.discount)}!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
