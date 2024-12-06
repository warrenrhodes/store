import { ICategory } from '../models/Category'

export const getCategories = async (): Promise<ICategory[] | null> => {
  const reviews = await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/categories`, {})

  if (!reviews.ok) return null
  return await reviews.json()
}
