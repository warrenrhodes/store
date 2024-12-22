import { Prisma, prisma } from '@naturegift/models'
import { connectToDB } from '../mongoDB'
import { currentUser, auth } from '@clerk/nextjs/server'

export type IOrder = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            media: {
              include: {
                media: true
              }
            }
          }
        }
      }
    }
  }
}>

export const getTotalSales = async () => {
  const orders = await getOrders()

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((acc, order) => acc + order.orderPrices.total, 0)
  return { totalOrders, totalRevenue }
}

export const getTotalCustomers = async () => {
  await connectToDB()
  // const customers = await Customer.find();
  // const totalCustomers = customers.length;
  return 0
}

export const getSalesPerMonth = async () => {
  const orders = await getOrders()

  const salesPerMonth = orders.reduce<Record<number, number>>((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth()
    acc[monthIndex] = (acc[monthIndex] || 0) + order.orderPrices.total
    return acc
  }, {})

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}

export async function getProducts(): Promise<Prisma.ProductGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const products = await prisma.product.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
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
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const categories = await prisma.categoriesOnProducts.findMany({
      where: {
        product: {
          creatorId: _currentUser.id,
        },
      },
    })
    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export async function getProductId(id: string): Promise<Prisma.ProductGetPayload<{}> | null> {
  try {
    const { userId } = await auth()
    if (!userId) return null

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return null

    const product = await prisma.product.findUnique({
      where: {
        id,
        creatorId: _currentUser.id,
      },
    })
    return product
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}

export async function getCategories(): Promise<Prisma.CategoryGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const categories = await prisma.category.findMany({
      where: {
        creatorId: _currentUser.id,
      },
    })
    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export async function getCategoriesOfProduct(
  productId: string,
): Promise<Prisma.CategoriesOnProductsGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const categories = await prisma.categoriesOnProducts.findMany({
      where: {
        productId,
        product: {
          creatorId: _currentUser.id,
        },
      },
    })
    return categories
  } catch (error) {
    console.error(`Failed to fetch categories of productId ${productId}:`, error)
    return []
  }
}

export async function getCategoryById(
  categoryId: string,
): Promise<Prisma.CategoryGetPayload<{}> | null> {
  try {
    const { userId } = await auth()
    if (!userId) return null

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return null

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
        creatorId: _currentUser.id,
      },
    })
    return category
  } catch (error) {
    console.error('Failed to fetch category:', error)
    return null
  }
}

export async function getCategoriesOfBlog(
  blogId: string,
): Promise<Prisma.CategoriesOnBlogsGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const categories = await prisma.categoriesOnBlogs.findMany({
      where: {
        blogId,
        blog: {
          creatorId: _currentUser.id,
        },
      },
    })
    return categories
  } catch (error) {
    console.error(`Failed to fetch categories of blog ${blogId}:`, error)
    return []
  }
}

export async function getBlogById(blogId: string): Promise<Prisma.BlogGetPayload<{}> | null> {
  try {
    const { userId } = await auth()
    if (!userId) return null

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return null

    const blogPost = await prisma.blog.findUnique({
      where: {
        id: blogId,
        creatorId: _currentUser.id,
      },
    })
    return blogPost
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }
}

export async function getBlogs(): Promise<Prisma.BlogGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const blogs = await prisma.blog.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return blogs
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return []
  }
}

export async function getReviews(): Promise<Prisma.ReviewGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const reviews = await prisma.review.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return reviews
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    return []
  }
}

export async function getReviewById(reviewId: string): Promise<Prisma.ReviewGetPayload<{}> | null> {
  try {
    const { userId } = await auth()
    if (!userId) return null

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return null

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
        creatorId: _currentUser.id,
      },
    })
    return review
  } catch (error) {
    console.error('Failed to fetch review:', error)
    return null
  }
}

export async function getOrders(): Promise<IOrder[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              partnerId: _currentUser.id,
            },
          },
        },
      },
      include: {
        user: true,
        items: {
          where: {
            product: {
              partnerId: _currentUser.id,
            },
          },
          include: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                partnerId: true,
              },
              include: {
                media: {
                  include: {
                    media: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return orders
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return []
  }
}

// export async function getOrderItemsOfOrder(params: {
//   orderId: string
// }): Promise<Prisma.OrderItemGetPayload<{}>[]> {
//   try {
//     const { userId } = await auth()
//     if (!userId) return []

//     const _currentUser = await getUserByClerkId(userId)
//     if (!_currentUser?.id) return []

//     const orderItems = await prisma.orderItem.findMany({
//       where: {
//         orderId: params.orderId,
//         items: {
//           some: {
//             product: {
//               partnerId: _currentUser.id,
//             },
//           },
//         },
//       },
//     })
//     return orderItems
//   } catch (error) {
//     console.error(`Failed to fetch orderItems of orderId ${params.orderId}:`, error)
//     return []
//   }
// }

export async function getMediasOfProduct(
  productId: string,
): Promise<Prisma.MediasOnProductsGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const medias = await prisma.mediasOnProducts.findMany({
      where: {
        productId,
        product: {
          creatorId: _currentUser.id,
        },
      },
    })
    return medias
  } catch (error) {
    console.error(`Failed to fetch medias of productId ${productId}:`, error)
    return []
  }
}

export async function getPromotions(): Promise<Prisma.PromotionGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const promotions = await prisma.promotion.findMany({
      where: {
        creatorId: _currentUser.id,
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

export async function getPromotionById(
  promotionId: string,
): Promise<Prisma.PromotionGetPayload<{}> | null> {
  try {
    const { userId } = await auth()
    if (!userId) return null

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return null

    const promotion = await prisma.promotion.findUnique({
      where: {
        id: promotionId,
        creatorId: _currentUser.id,
      },
    })
    return promotion
  } catch (error) {
    console.error('Failed to fetch promotion:', error)
    return null
  }
}
export async function getShipments(): Promise<Prisma.ShipmentGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []
    const shipments = prisma.shipment.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return shipments
  } catch (error) {
    console.error('Failed to fetch shipments:', error)
    return []
  }
}

export async function getShipmentById(
  shipmentById: string,
): Promise<Prisma.ShipmentGetPayload<{}> | null> {
  try {
    const { userId } = await auth()
    if (!userId) return null

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return null

    const shipment = await prisma.shipment.findUnique({
      where: {
        id: shipmentById,
        creatorId: _currentUser.id,
      },
    })
    return shipment
  } catch (error) {
    console.error('Failed to fetch shipment:', error)
    return null
  }
}

export async function getUserByClerkId(clerkId: string): Promise<Prisma.UserGetPayload<{}> | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    })
    return user || createNewUser()
  } catch (error) {
    console.error('Failed to fetch promotion:', error)
    return createNewUser()
  }
}

export async function createNewUser(): Promise<Prisma.UserGetPayload<{}> | null> {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return null
    }

    const newUser = await prisma.user.upsert({
      where: { clerkId: clerkUser.id },
      update: {},
      create: {
        clerkId: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        fullName: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
        phone: clerkUser.primaryPhoneNumber?.phoneNumber,
        avatar: clerkUser.imageUrl,
        isAnonymous: false,
      },
    })
    return newUser
  } catch (error) {
    console.error('Failed to create new user:', error)
    return null
  }
}

export async function getMedias(): Promise<Prisma.MediaGetPayload<{}>[]> {
  try {
    const { userId } = await auth()
    if (!userId) return []

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) return []

    const medias = await prisma.media.findMany({
      where: {
        creatorId: _currentUser.id,
      },
    })
    return medias
  } catch (error) {
    console.error('Failed to fetch medias:', error)
    return []
  }
}
