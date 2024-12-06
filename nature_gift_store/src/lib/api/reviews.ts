import { IReview } from '../models/Reviews'

export const getReviewByProductId = async (productId: string): Promise<IReview[] | null> => {
  const reviews = await fetch(
    `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/reviews?productId=${productId}`,
  )

  if (!reviews.ok) return null
  return await reviews.json()
}
