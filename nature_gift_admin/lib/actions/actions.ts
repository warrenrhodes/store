import { Prisma, prisma } from '@naturegift/models'
import { connectToDB } from '../mongoDB'

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
    const monthIndex = new Date(order.createdAt).getMonth() // 0 for January --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + order.orderPrices.total
    return acc
  }, {})

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}

export const getMediaById = async (mediaId: string): Promise<string | null> => {
  const media = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/media/${mediaId}`)
  if (media.ok) {
    const url = await media.json()
    return url.mediaUrl
  }
  return null
}

export const uploadImages = async (files: File[]): Promise<string | null> => {
  const formData = new FormData()
  files.forEach((file, index) => {
    formData.append(`files`, file)
  })
  const result = await fetch('/api/media/upload', {
    method: 'POST',
    body: formData,
  })

  if (result.ok) {
    const data = await result.json()
    console.log(data.files[0].file.url)
    return data.files[0].file.url
  }
  return null
}

export async function getProducts(): Promise<Prisma.ProductGetPayload<{}>[]> {
  try {
    const products = await prisma.product.findMany({
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
    })
    return product
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}

export async function getCategories(): Promise<Prisma.CategoryGetPayload<{}>[]> {
  try {
    const categories = await prisma.category.findMany()
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
    const categories = await prisma.categoriesOnProducts.findMany({
      where: {
        productId,
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
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
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
    const categories = await prisma.categoriesOnBlogs.findMany({
      where: {
        blogId,
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
    const blogPost = await prisma.blog.findUnique({
      where: {
        id: blogId,
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
    const blogs = await prisma.blog.findMany({
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

export async function getMedias(): Promise<Prisma.MediaGetPayload<{}>[]> {
  try {
    const medias = await prisma.media.findMany()
    return medias
  } catch (error) {
    console.error('Failed to fetch medias:', error)
    return []
  }
}

export async function getReviews(): Promise<Prisma.ReviewGetPayload<{}>[]> {
  try {
    const reviews = await prisma.review.findMany({
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
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    })
    return review
  } catch (error) {
    console.error('Failed to fetch review:', error)
    return null
  }
}
export async function getOrders(): Promise<Prisma.OrderGetPayload<{}>[]> {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: true,
      },
    })
    return orders
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return []
  }
}

export async function getOrderItemsOfOrder(params: {
  orderId: string
}): Promise<Prisma.OrderItemGetPayload<{}>[]> {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: params.orderId,
      },
    })
    return orderItems
  } catch (error) {
    console.error(`Failed to fetch orderItems of orderId ${params.orderId}:`, error)
    return []
  }
}
export async function getMediasOfProduct(
  productId: string,
): Promise<Prisma.MediasOnProductsGetPayload<{}>[]> {
  try {
    const medias = await prisma.mediasOnProducts.findMany({
      where: {
        productId,
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
    const promotions = await prisma.promotion.findMany({
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
