'use client'

import { useState } from 'react'
import { CartItem } from '@/lib/models/Cart'
import { OrderSummary } from '@/lib/models/orderSummary'
import { IPromotion } from '@/lib/models/Promotions'
import { IDeliveryInfo } from '@/lib/models/order'
import { calculatePromotion } from '@/lib/api/promotions'

export function usePromotionCalculator() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function calculatePromotions(
    cart: CartItem[],
    deliveryInfo?: Partial<IDeliveryInfo>,
    query?: Partial<{ [key in keyof IPromotion]: string }>,
  ): Promise<OrderSummary | null> {
    setIsCalculating(true)
    setError(null)

    try {
      const result = await calculatePromotion(cart, deliveryInfo, query)

      if (result.error) {
        setError(result.error)
        return null
      }

      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setIsCalculating(false)
    }
  }

  return {
    calculatePromotions,
    isCalculating,
    error,
  }
}
