import { prisma, Prisma } from '@naturegift/models'
import { IDeliveryInfo } from './orders'
import { CartItem } from '@/hooks/useCart'

export type IPromotion = Prisma.PromotionGetPayload<{}>
export async function getPromotions(): Promise<IPromotion[]> {
  try {
    const promotions = await prisma.promotion.findMany({
      where: {
        status: 'ACTIVE',
        startDate: {
          lte: new Date(), // Start date is less than or equal to now
        },
        endDate: {
          gte: new Date(), // End date is greater than or equal to now
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return promotions
  } catch (error) {
    console.error('Failed to fetch promotions:', error)
    return []
  }
}

export async function getPromotionById(promotionId: string): Promise<IPromotion | null> {
  try {
    const promotion = await prisma.promotion.findUnique({
      where: {
        id: promotionId,
      },
    })
    return promotion
  } catch (error) {
    console.error('Failed to fetch promotion:', error)
    return null
  }
}

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
