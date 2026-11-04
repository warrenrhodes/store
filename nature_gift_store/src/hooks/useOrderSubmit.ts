'use client'

import { useAuthStore } from '@/hooks/store/auth-store'
import { toast } from '@/hooks/use-toast'
import { CartItem } from '@/hooks/useCart'
import { getCheckoutId, resetCheckoutId } from '@/hooks/useCheckoutCapture'
import { useLocalization } from '@/hooks/useLocalization'
import { usePromoCodes } from '@/hooks/usePromoCodes'
import { useTemporalUser } from '@/hooks/useTemporalUser'
import { createOrder } from '@/lib/api/orders'
import { DeliveryFormData } from '@/lib/utils/validation-form'
import { sendGTMEvent } from '@next/third-parties/google'
import { trackPixel } from '@/lib/analytics/pixel'
import { getDocumentId } from '@spreeloop/database'
import { useSite, useSiteRouter } from '@/components/Site'
import { useState } from 'react'

/**
 * Places the order for `items` (cart checkout and ad-page direct checkout share it): sends the
 * discount codes and checkout id, explains stock/promotion conflicts, tracks the purchase and
 * opens the confirmation page with the customer's tracking link. Prices are computed server-side.
 * `adId`: the ad page (blog id) whose own thank-you page the confirmation shows.
 */
export function useOrderSubmit({
  items,
  onPlaced,
  adId,
}: {
  items: CartItem[]
  onPlaced: () => void
  adId?: string
}) {
  const router = useSiteRouter()
  const { site } = useSite()
  const { user } = useAuthStore()
  const { localization } = useLocalization()
  const { setUserData } = useTemporalUser()
  const { codes, clear: clearCodes } = usePromoCodes()
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (data: DeliveryFormData) => {
    const gtmItems = items.map(e => ({
      item_id: getDocumentId(e.product.path),
      item_name: e.product.title,
      quantity: e.quantity,
    }))
    sendGTMEvent({ event: 'add_shipping_info', currency: 'XAF', items: gtmItems })

    setIsLoading(true)
    const result = await createOrder({
      site,
      order: {
        deliveryInfo: {
          address: data.address,
          deliveryDate: data.deliveryDate,
          deliveryTime: data.deliveryTime,
          city: data.city,
          additionalNotes: data.additionalNotes || null,
          deliveryMethod: data.shipping.method,
          location: data.shipping.location,
          locationId: data.shipping.locationId,
        },
        userData: {
          id: user?.authId || '',
          email: data.email || '',
          fullName: data.fullName,
          phone: data.phone,
        },
      },
      cartItems: items,
      promoCodes: codes,
      checkoutId: getCheckoutId(),
    })

    // `in` narrows the union (the project builds without strictNullChecks).
    if ('error' in result) {
      toast({
        description:
          result.error === 'OUT_OF_STOCK'
            ? localization.errorOutOfStock
            : result.error === 'PROMOTION_EXHAUSTED'
              ? localization.promotionExhausted
              : localization.orderError,
        variant: 'destructive',
      })
      setIsLoading(false)
      return
    }

    const { orders, checkoutGroupId, trackingToken } = result
    const [order] = orders
    // One purchase for the cart: the order id (also the Meta Conversions API event id), or the
    // group id when the marketplace cart made one order per store.
    const transactionId = checkoutGroupId ?? getDocumentId(order.path)
    try {
      sendGTMEvent({
        event: 'purchase',
        currency: 'XAF',
        value: orders.reduce((sum, o) => sum + o.orderPrices.total, 0),
        transaction_id: transactionId,
        event_id: transactionId,
        items: orders.flatMap(o =>
          o.items.map(e => ({
            item_id: getDocumentId(e.product.path),
            item_name: e.product.title,
            quantity: e.quantity,
            price: e.price,
          })),
        ),
        userInfo: {
          id: user?.authId,
          email: order.userData?.email,
          full_name: order.userData?.fullName,
          phone: order.userData?.phone,
          address: order.deliveryInfo.address,
          city: order.deliveryInfo?.city,
          location: order.deliveryInfo?.location,
        },
      })
      // One Purchase per order, deduplicated with the server's Conversions API event by the
      // same id (the order id).
      for (const o of orders) {
        trackPixel(
          'Purchase',
          o.items.map(i => ({ path: i.product.path, quantity: i.quantity, price: i.price })),
          getDocumentId(o.path),
        )
      }
    } catch (error) {
      console.log(error)
    }

    setUserData({ ...data })
    clearCodes()
    resetCheckoutId()
    onPlaced()
    router.replace(
      checkoutGroupId
        ? `/order/success?group=${checkoutGroupId}&t=${trackingToken}`
        : `/order/success?order=${transactionId}&t=${trackingToken}${adId ? `&ad=${adId}` : ''}`,
    )
  }

  return { submit, isLoading }
}
