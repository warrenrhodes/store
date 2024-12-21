import { prisma, Prisma } from '@naturegift/models'

export type IReview = Prisma.ReviewGetPayload<{
  include: {
    product: true
  }
}>

export async function getReviews(): Promise<IReview[]> {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        product: true,
      },
    })
    return reviews
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    return []
  }
}

export async function getReviewByProductId(productId: string): Promise<IReview[]> {
  try {
    const review = await prisma.review.findMany({
      where: {
        productId: productId,
      },
      include: {
        product: true,
      },
    })
    return review
  } catch (error) {
    console.error('Failed to fetch review:', error)
    return []
  }
}
