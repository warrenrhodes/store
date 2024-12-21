import { CartItem } from '@/hooks/useCart'
import { Prisma } from '@naturegift/models'
import { IUser } from './user'

export interface OrderSummary {
  subtotal: number
  shipping: number
  discount: number
  total: number
  appliedPromotions: Array<{
    id: string
    code: string
    discountAmount: number
    type: string
  }>
}
const ordersWithRelations = Prisma.validator<Prisma.OrderDefaultArgs>()({})
export type IOrder = Prisma.OrderGetPayload<typeof ordersWithRelations>
export type IDeliveryInfo = IOrder['deliveryInfo'] & { cost: number }

export const createOrder = async (params: {
  order: IOrder
  cartItems: CartItem[]
  user: IUser | null
}): Promise<string | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/orders`, {
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
