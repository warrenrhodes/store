import { ICategory } from '../models/Category'
import { IProduct, IPromotion, IReview } from '../types'

export const getCollections = async () => {
  const collections = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/collections`)
  if (collections.ok) {
    const result = await collections.json()
    return result
  }
  return null
}

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/collections/${collectionId}`,
  )
  if (collection.ok) {
    const result = await collection.json()
    return result
  }
  return null
}

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/products`)
  if (products.ok) {
    const result = await products.json()
    return result
  }
  return null
}

export const getProductDetails = async (productId: string): Promise<IProduct | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/products/${productId}`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`)
  return await searchedProducts.json()
}

export const getOrders = async (customerId: string) => {
  const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`)
  return await orders.json()
}

export const getRelatedProducts = async (productId: string): Promise<IProduct[] | null> => {
  const relatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/products/${productId}/related`,
  )

  if (!relatedProducts.ok) return null
  return await relatedProducts.json()
}

export const getProductDescriptionImage = async (mediaId: string): Promise<string | null> => {
  const media = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/${mediaId}`)

  if (media.ok) {
    const url = await media.json()
    return url.mediaUrl
  }
  return null
}
export const getPromotions = async (): Promise<IPromotion[] | null> => {
  const promotions = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/promotions`)

  if (promotions.ok) {
    const result = await promotions.json()
    return result
  }
  return null
}

export const getReviewByProductId = async (productId: string): Promise<IReview[] | null> => {
  const reviews = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/reviews?productId=${productId}`,
  )

  if (!reviews.ok) return null
  return await reviews.json()
}


export const getCategories = async (): Promise<ICategory[] | null> => {
  const reviews = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/categories`)

  if (!reviews.ok) return null
  return await reviews.json()
}