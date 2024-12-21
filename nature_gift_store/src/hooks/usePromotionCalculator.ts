'use client'

import { useState } from 'react'
import { calculatePromotion, IPromotion } from '@/lib/api/promotions'
import { IDeliveryInfo, OrderSummary } from '@/lib/api/orders'
import { CartItem } from './useCart'
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
