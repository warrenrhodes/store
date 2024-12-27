'use client'

import { useCallback, useState } from 'react'
import { IPromotion } from '@/lib/api/promotions'
import { IDeliveryInfo } from '@/lib/api/orders'
import { CartItem } from './useCart'

const calculatePromotion = async (
  cart: CartItem[],
  deliveryInfo?: Partial<IDeliveryInfo>,
  query?: Partial<{ [key in keyof IPromotion]: string }>,
) => {
  const searchParams = new URLSearchParams()
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        searchParams.append(key, value)
      }
    }
  }

  const response = await fetch(
    `/api/promotions/calculate${query ? '?' + new URLSearchParams(query).toString() : ''}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart,
        shipping: deliveryInfo,
      }),
    },
  )
  return await response.json()
}

export function usePromotionCalculator() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const _calculatePromotion = useCallback(
    async (
      cart: CartItem[],
      deliveryInfo?: Partial<IDeliveryInfo>,
      query?: Partial<{ [key in keyof IPromotion]: string }>,
    ) => {
      return await calculatePromotion(cart, deliveryInfo, query)
    },
    [],
  )

  const calculatePromotions = useCallback(
    async (
      cart: CartItem[],
      deliveryInfo?: Partial<IDeliveryInfo>,
      query?: Partial<{ [key in keyof IPromotion]: string }>,
    ) => {
      setIsCalculating(true)
      setError(null)

      try {
        const result = await _calculatePromotion(cart, deliveryInfo, query)

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
