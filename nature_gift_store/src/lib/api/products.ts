import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating'

export interface Filters {
  search: string
  categories: string[]
  priceRange: [number, number]
  sortBy: SortOption
  colors: string[]
  tags: string[]
}

export type IProduct = Prisma.ProductGetPayload<{
  include: {
    categories: {
      include: {
        category: true
      }
    }
    media: {
      include: {
        media: true
      }
    }
    reviews: true
  }
}>

export const fetchProductsByQuery = async ({
  query,
}: {
  query: Partial<{ [key in keyof Prisma.ProductGetPayload<object>]: string }>
}): Promise<IProduct[] | null> => {
  try {
    const products = await prisma.product.findMany({
      where: {
        visibility: true,
        status: 'published',
        ...Object.entries(query).reduce((acc, [key, value]) => {
          if (value !== undefined) {
            acc[key] = value === 'true' ? true : value === 'false' ? false : value
          }
          return acc
        }, {} as any),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        media: {
          include: {
            media: true,
          },
        },
        reviews: true,
      },
    })
    return products
  } catch (error) {
    console.error('Failed to fetch products by query:', error)
    return null
  }
}

export const fetchProductBySlug = async ({ slug }: { slug: string }): Promise<IProduct | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        media: {
          include: {
            media: true,
          },
        },
        reviews: true,
      },
    })
    return product
  } catch (error) {
    console.error('Failed to fetch product by slug:', error)
    return null
  }
}

export const fetchRelatedProducts = async (slug: string): Promise<IProduct[]> => {
  try {
    // First get the product categories
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        categories: true,
        media: true,
      },
    })
    if (!product) return []

    // Then find products with similar categories
    const relatedProducts = await prisma.product.findMany({
      where: {
        visibility: true,
        status: 'published',
        slug: { not: slug },
        OR: [
          {
            categories: {
              some: {
                categoryId: {
                  in: product.categories.map(c => c.categoryId),
                },
              },
            },
          },
          {
            tags: {
              hasSome: product.tags,
            },
          },
        ],
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        media: {
          include: {
            media: true,
          },
        },
        reviews: true,
      },
      take: 4, // Limit to 4 related products
    })
    return relatedProducts
  } catch (error) {
    console.error('Failed to fetch related products:', error)
    return []
  }
}

export async function getProducts(): Promise<IProduct[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        visibility: true,
        status: 'published',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        media: {
          include: {
            media: true,
          },
        },
        reviews: true,
      },
    })
    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export async function getCategoriesOnProduct(): Promise<
  Prisma.CategoriesOnProductsGetPayload<object>[]
> {
  try {
    const categories = await prisma.categoriesOnProducts.findMany()
    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export async function getProductId(id: string): Promise<IProduct | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        media: {
          include: {
            media: true,
          },
        },
        reviews: true,
      },
    })
    return product
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}
