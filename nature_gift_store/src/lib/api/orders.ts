import { CartItem } from '@/hooks/useCart'
import { IUser } from './user'
import { Prisma } from '@prisma/client'
import { DeliveryInfo } from '../type'

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
export type IOrder = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            media: {
              include: {
                media: true
              }
            }
          }
        }
      }
    }
  }
}>
export type IOrderItem = IOrder['items'][number]
export type IDeliveryInfo = DeliveryInfo & { cost: number }

export const createOrder = async (params: {
  order: Record<string, unknown>
  cartItems: CartItem[]
  user: IUser | null
}): Promise<IOrder | null> => {
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
