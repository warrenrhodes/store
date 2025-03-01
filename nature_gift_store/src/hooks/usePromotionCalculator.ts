'use client'

import { useCallback, useState } from 'react'
import { CartItem } from './useCart'
import { IDeliveryInfo } from '@/lib/firebase/models'

const calculatePromotion = async (cart: CartItem[], deliveryInfo?: Partial<IDeliveryInfo>) => {
  const response = await fetch(`/api/promotions/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cart,
      shipping: deliveryInfo,
    }),
  })
  return await response.json()
}

export function usePromotionCalculator() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const _calculatePromotion = useCallback(
    async (cart: CartItem[], deliveryInfo?: Partial<IDeliveryInfo>) => {
      return await calculatePromotion(cart, deliveryInfo)
    },
    [],
  )

  const calculatePromotions = useCallback(
    async (cart: CartItem[], deliveryInfo?: Partial<IDeliveryInfo>) => {
      setIsCalculating(true)
      setError(null)

      try {
        const result = await _calculatePromotion(cart, deliveryInfo)

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
    },
    [_calculatePromotion],
  )

  return {
    calculatePromotions,
    isCalculating,
    error,
  }
}
