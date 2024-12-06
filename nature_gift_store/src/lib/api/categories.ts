import { ICategory } from '../models/Category'

export const getCategories = async (): Promise<ICategory[] | null> => {
  const reviews = await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/categories`, {
    next: { revalidate: 3600 },
  })

  if (!reviews.ok) return null
  return await reviews.json()
}
