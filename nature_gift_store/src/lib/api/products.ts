import { prisma, Prisma } from '@naturegift/models'

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating'

export interface Filters {
  search: string
  categories: string[]
  priceRange: [number, number]
  sortBy: SortOption
  colors: string[]
  tags: string[]
}
const productWithRelations = Prisma.validator<Prisma.ProductDefaultArgs>()({
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

export type IProduct = Prisma.ProductGetPayload<typeof productWithRelations>

export const fetchProductsByQuery = async ({
  query,
}: {
  query: Partial<{ [key in keyof Prisma.ProductGetPayload<{}>]: string }>
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
  Prisma.CategoriesOnProductsGetPayload<{}>[]
> {
  try {
    const categories = await prisma.categoriesOnProducts.findMany()
    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export async function getProductId(id: string): Promise<Prisma.ProductGetPayload<{}> | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
        media: true,
      },
    })
    return product
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}
