import { CartItem } from '../models/Cart'
import { IDeliveryInfo } from '../models/order'
import { IPromotion } from '../models/Promotions'

export const calculatePromotion = async (
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
    `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/promotions/calculate${query ? '?' + new URLSearchParams(query).toString() : ''}`,
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

export const getPromotions = async (): Promise<IPromotion[] | null> => {
  const promotions = await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/promotions`)

  if (promotions.ok) {
    const result = await promotions.json()
    return result
  }
  return null
}
