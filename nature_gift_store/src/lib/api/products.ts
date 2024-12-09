import { IProduct } from '../models/Product'
import { prismaClient } from '@/prisma-models'

export const fetchProductsByQuery = async ({
  query,
}: {
  query: Partial<{ [key in keyof IProduct]: string }>
}): Promise<IProduct[] | null> => {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      searchParams.append(key, value)
    }
  }

  const featuresProducts = await fetch(
    `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/products/filter${query ? '?' + searchParams.toString() : ''}`,
  )

  if (!featuresProducts.ok) return null

  return await featuresProducts.json()
}

export const fetchAllProducts = async (): Promise<IProduct[] | null> => {
  try {
    const allUsers = await prismaClient.product.findMany()

    return allUsers
  } catch (error) {
    console.log(error)

    return null
  }
  // const result = await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/products`)
  // if (!result.ok) return null
  // return await result.json()
}

export const fetchProductBySlug = async ({ slug }: { slug: string }): Promise<IProduct | null> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/products/${slug}`)
  if (!result.ok) return null
  return await result.json()
}

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/search/${query}`,
  )
  return await searchedProducts.json()
}

export const fetchRelatedProducts = async (slug: string): Promise<IProduct[] | null> => {
  const relatedBlogs = await fetch(
    `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/api/products/${slug}/related`,
  )

  if (!relatedBlogs.ok) return null
  return await relatedBlogs.json()
}
