import { clientConfig, serverConfig } from '@/config'
import { DatabaseDocument, getDatabasePath, QueryFilter } from '@spreeloop/database'
import { getTokens, Tokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { cache } from 'react'
import z from 'zod'
import { CollectionsName } from '../firebase/collection-name'
import { backend } from '../firebase/firebase-server/firebase'
import { Blog, Category, Order, Product, Promotion, Review, Shipment } from '../firebase/models'
import { OrderPrices } from '../type'

export type ICategory = DatabaseDocument<Category>
export type IShipment = DatabaseDocument<Shipment>
export type IReview = DatabaseDocument<Review>
export type IBlog = DatabaseDocument<Blog>
export type IPromotion = DatabaseDocument<Promotion>
export type IProduct = DatabaseDocument<Product>
export type IOrder = DatabaseDocument<Order>

export const getTotalSales = async () => {
  const orders = await getOrders()

  const totalOrders = orders.length
  const totalRevenue = orders.reduce(
    (acc, order) => acc + ((order?.data.orderPrices as OrderPrices | undefined)?.total || 0) || 0,
    0,
  )
  return { totalOrders, totalRevenue }
}

export const getTotalCustomers = async () => {
  // const customers = await Customer.find();
  // const totalCustomers = customers.length;
  return 0
}

export const getSalesPerMonth = async () => {
  const orders = await getOrders()

  const salesPerMonth = orders.reduce<Record<number, number>>((acc, order) => {
    const monthIndex = new Date(order.data.createdAt).getMonth()
    acc[monthIndex] =
      (acc[monthIndex] || 0) + ((order?.data.orderPrices as OrderPrices | undefined)?.total || 0) ||
      0
    return acc
  }, {})

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}

async function getProducts(): Promise<IProduct[]> {
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return []

    const products = await backend.database.getCollection<Product>({
      collectionPath: CollectionsName.Products,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

async function getProductById(productId: string): Promise<IProduct | undefined> {
  const productPath = getDatabasePath(CollectionsName.Products, productId)
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return

    const products = await backend.database.getCollection<Product>({
      collectionPath: CollectionsName.Products,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return products.find(product => product.path === productPath)
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return
  }
}

async function getCategories(): Promise<ICategory[]> {
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return []

    const categories = await backend.database.getCollection<Category>({
      collectionPath: CollectionsName.Categories,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}
async function getCategoryById(categoryId: string): Promise<ICategory | undefined> {
  const categoryPath = getDatabasePath(CollectionsName.Categories, categoryId)
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return

    const category = await backend.database.getCollection<Category>({
      collectionPath: CollectionsName.Categories,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return category.find(category => category.path === categoryPath)
  } catch (error) {
    console.error('Failed to fetch category:', error)
    return
  }
}

async function getShipments(): Promise<IShipment[]> {
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return []

    const shipments = await backend.database.getCollection<Shipment>({
      collectionPath: CollectionsName.Shipments,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return shipments
  } catch (error) {
    console.error('Failed to fetch shipments:', error)
    return []
  }
}

async function getBlogs(): Promise<IBlog[]> {
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return []

    const blogs = await backend.database.getCollection<Blog>({
      collectionPath: CollectionsName.Blogs,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return blogs
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return []
  }
}

async function getBlogById(blogId: string): Promise<IBlog | undefined> {
  const blogPath = getDatabasePath(CollectionsName.Blogs, blogId)
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return

    const blogs = await backend.database.getCollection<Blog>({
      collectionPath: CollectionsName.Blogs,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return blogs.find(blog => blog.path === blogPath)
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return
  }
}

async function getReviews(): Promise<IReview[]> {
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return []

    const reviews = await backend.database.getCollection<Review>({
      collectionPath: CollectionsName.Reviews,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return reviews
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    return []
  }
}

async function getReviewById(reviewId: string): Promise<IReview | undefined> {
  const reviewPath = getDatabasePath(CollectionsName.Reviews, reviewId)
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return

    const reviews = await backend.database.getCollection<Review>({
      collectionPath: CollectionsName.Reviews,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return reviews.find(review => review.path === reviewPath)
  } catch (error) {
    console.error('Failed to fetch review:', error)
    return
  }
}

async function getOrders(): Promise<IOrder[]> {
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return []

    const ordersRef = backend.db.collection(CollectionsName.Orders)
    const ordersSnapshot = await ordersRef
      .where(
        'partnersPaths',
        'array-contains',
        getDatabasePath(CollectionsName.Users, token?.decodedToken.uid),
      )
      .get()

    const orders: IOrder[] = []
    ordersSnapshot.forEach(doc => {
      orders.push({ path: doc.id, data: doc.data() } as IOrder)
    })

    return orders
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return []
  }
}

async function getPromotions(): Promise<IPromotion[]> {
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return []

    const promotions = await backend.database.getCollection<Promotion>({
      collectionPath: CollectionsName.Promotions,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return promotions
  } catch (error) {
    console.error('Failed to fetch promotions:', error)
    return []
  }
}

async function getPromotionById(promotionId: string): Promise<IPromotion | undefined> {
  const promotionPath = getDatabasePath(CollectionsName.Promotions, promotionId)
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return

    const promotions = await backend.database.getCollection<Promotion>({
      collectionPath: CollectionsName.Promotions,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return promotions.find(promotion => promotion.path === promotionPath)
  } catch (error) {
    console.error('Failed to fetch promotion:', error)
    return
  }
}

async function getShipmentById(shipmentId: string): Promise<IShipment | undefined> {
  const shipmentPath = getDatabasePath(CollectionsName.Shipments, shipmentId)
  try {
    const token = await getUserTokens()
    if (!token?.decodedToken.uid) return

    const shipment = await backend.database.getCollection<Shipment>({
      collectionPath: CollectionsName.Shipments,
      filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
    })

    return shipment.find(shipment => shipment.path === shipmentPath)
  } catch (error) {
    console.error('Failed to fetch shipment:', error)
    return
  }
}

export const getUserTokens = async (): Promise<Tokens | undefined> => {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  if (!tokens) {
    return
  }
  return tokens
}

export const checkDocumentExists = async (
  collection: string,
  field: string,
  value: string,
): Promise<boolean> => {
  const snapshot = await backend.database.getCollection({
    collectionPath: collection,
    filters: [new QueryFilter(field, '==', value)],
  })

  return snapshot.length > 0
}

export const getUserTokensOnApiRoute = async (
  request: NextRequest,
): Promise<Tokens | undefined> => {
  const tokens = await getTokens(request.cookies, {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  if (!tokens) {
    return
  }
  return tokens
}

export const postData = async (
  req: NextRequest,
  schema: z.ZodSchema,
  collection: string,
  verifyRecordExists?: boolean,
  uniqueField?: string,
  value: string = '',
) => {
  const token = await getUserTokensOnApiRoute(req)

  if (!token) {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const json = await req.json()
  schema.parse(json)

  if (verifyRecordExists && uniqueField) {
    const existingCategory = await checkDocumentExists(collection, uniqueField, value)

    if (existingCategory) {
      return new NextResponse(`${collection} already exists`, { status: 409 })
    }
  }

  const result = await backend.database.createRecord(collection, {
    ...json,
    creatorId: token.decodedToken.uid,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  if (!result) {
    return new NextResponse(`Failed to create ${collection}`, { status: 500 })
  }
  return new NextResponse(null, { status: 200 })
}

export const getDataById = async <T>(req: NextRequest, collection: string, id: string) => {
  const token = await getUserTokensOnApiRoute(req)

  if (!token) {
    return new NextResponse('Unauthorized', { status: 403 })
  }
  const path = getDatabasePath(collection, id)

  const result = await backend.database.getCollection<T>({
    collectionPath: collection,
    filters: [new QueryFilter('creatorId', '==', token?.decodedToken.uid)],
  })

  const data = result.find(shipment => shipment.path === path)

  if (!data) {
    return new NextResponse(`${collection} not found`, { status: 404 })
  }
  return NextResponse.json(data, { status: 200 })
}

export const putData = async (
  req: NextRequest,
  schema: z.ZodSchema,
  collection: string,
  id: string,
) => {
  const token = await getUserTokensOnApiRoute(req)

  if (!token) {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const json = await req.json()
  schema.parse(json)
  const result = await backend.database.setRecord(getDatabasePath(collection, id), {
    ...json,
    updatedAt: new Date().toISOString(),
  })

  if (!result) {
    return new NextResponse(`${collection} not found`, { status: 404 })
  }

  return NextResponse.json(result, { status: 200 })
}
export const deleteData = async (req: NextRequest, collection: string, id: string) => {
  const token = await getUserTokensOnApiRoute(req)

  if (!token) {
    return new NextResponse('Unauthorized', { status: 403 })
  }

  const dataRef = backend.db.collection(collection).doc(id)
  const dataDoc = await dataRef.get()

  if (!dataDoc.exists || dataDoc?.data()?.creatorId !== token.decodedToken.uid) {
    return new NextResponse('Not Found or Unauthorized', { status: 404 })
  }

  await dataRef.delete()

  return NextResponse.json(null, { status: 200 })
}

export const getPromotionsCache = cache(getPromotions)
export const getShipmentByIdCache = cache(getShipmentById)
export const getPromotionByIdCache = cache(getPromotionById)
export const getOrdersCache = cache(getOrders)
export const getReviewByIdCache = cache(getReviewById)
export const getProductsCache = cache(getProducts)
export const getProductByIdCache = cache(getProductById)
export const getCategoriesCache = cache(getCategories)
export const getCategoryByIdCache = cache(getCategoryById)
export const getShipmentsCache = cache(getShipments)
export const getBlogsCache = cache(getBlogs)
export const getBlogByIdCache = cache(getBlogById)
export const getReviewsCache = cache(getReviews)
