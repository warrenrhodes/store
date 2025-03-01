import { CartItem } from '@/hooks/useCart'
import { Order } from '../firebase/models'

export const createOrder = async (params: {
  order: Record<string, unknown>
  cartItems: CartItem[]
}): Promise<Order | null> => {
  const response = await fetch(`/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    return null
  }
  return await response.json()
}
