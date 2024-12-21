import { prisma, Prisma } from '@naturegift/models'

export type IPromotion = Prisma.PromotionGetPayload<object>
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
