'use client'

import { useCallback, useState } from 'react'
import { CartItem } from './useCart'
import { IDeliveryInfo } from '@/lib/firebase/models'
import { useSite } from '@/components/Site'

const calculatePromotion = async (
  site: string,
  cart: CartItem[],
  deliveryInfo?: Partial<IDeliveryInfo>,
  codes: string[] = [],
) => {
  const response = await fetch(`/api/promotions/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      site,
      cart,
      shipping: deliveryInfo,
      codes,
    }),
  })
  return await response.json()
}

export function usePromotionCalculator() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { site } = useSite()

  const _calculatePromotion = useCallback(
    async (cart: CartItem[], deliveryInfo?: Partial<IDeliveryInfo>, codes?: string[]) => {
      return await calculatePromotion(site, cart, deliveryInfo, codes)
    },
    [site],
  )

  const calculatePromotions = useCallback(
    async (cart: CartItem[], deliveryInfo?: Partial<IDeliveryInfo>, codes?: string[]) => {
      setIsCalculating(true)
      setError(null)

      try {
        const result = await _calculatePromotion(cart, deliveryInfo, codes)

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
