import { DatabaseDocument } from '@spreeloop/database'
import { NextRequest, NextResponse } from 'next/server'
import { cache } from 'react'
import z from 'zod'
import { CollectionsName } from '../firebase/collection-name'
import {
  getUserTokens,
  getUserTokensOnApiRoute,
  isTakenInStore,
  requireStore,
  scopedCreate,
  scopedDelete,
  scopedGet,
  scopedList,
  scopedUpdate,
  Unauthorized,
} from '../tenant'
import {
  Blog,
  Category,
  Checkout,
  DeliveryLocation,
  Order,
  OrderStatus,
  Product,
  Promotion,
  Review,
  Shipment,
} from '../firebase/models'
import { OrderPrices, UserData } from '../type'
import { refusalRate, SALE_STATUSES } from '../orders/order-logic'

export type ICategory = DatabaseDocument<Category>
export type IShipment = DatabaseDocument<Shipment>
export type ILocation = DatabaseDocument<DeliveryLocation>
export type IReview = DatabaseDocument<Review>
export type IBlog = DatabaseDocument<Blog>
export type IPromotion = DatabaseDocument<Promotion>
export type IProduct = DatabaseDocument<Product>
export type IOrder = DatabaseDocument<Order>
export type ICheckout = DatabaseDocument<Checkout>

const COUNTED_STATUSES = new Set<string>(SALE_STATUSES)

/** KPIs for the dashboard. Cancelled and rejected orders are excluded from revenue. */
export const getDashboardStats = async () => {
  const orders = await getOrders()
  const total = (o: IOrder) => (o.data.orderPrices as OrderPrices | undefined)?.total || 0
  const counted = orders.filter(o => COUNTED_STATUSES.has(o.data.status))

  const revenue = counted.reduce((acc, o) => acc + total(o), 0)
  const customers = new Set(
    orders.map(o => (o.data.userData as UserData | undefined)?.phone).filter(Boolean),
  ).size

  // Last 12 calendar months, oldest first, keyed by year+month so years never mix.
  const now = new Date()
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
    return {
      key: `${d.getFullYear()}-${d.getMonth()}`,
      name: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      sales: 0,
    }
  })
  const byKey = new Map(months.map(m => [m.key, m]))
  for (const o of counted) {
    const d = new Date(o.data.createdAt)
    const month = byKey.get(`${d.getFullYear()}-${d.getMonth()}`)
    if (month) month.sales += total(o)
  }

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime())
    .slice(0, 5)

  // Best sellers by units, over orders that count as sales.
  const sold = new Map<string, { title: string; units: number; revenue: number }>()
  for (const o of counted) {
    for (const item of o.data.items ?? []) {
      const line = sold.get(item.product.path) ?? {
        title: item.product.title,
        units: 0,
        revenue: 0,
      }
      line.units += item.quantity
      line.revenue += item.price * item.quantity
      sold.set(item.product.path, line)
    }
  }
  const topProducts = [...sold.values()].sort((a, b) => b.units - a.units).slice(0, 5)

  const delivered = orders.filter(o => o.data.status === OrderStatus.COMPLETED).length
  const failed = orders.filter(o => o.data.status === OrderStatus.FAILED_DELIVERY).length
  const toShip = orders.filter(o =>
    [OrderStatus.ACCEPTED, OrderStatus.OUT_FOR_DELIVERY].includes(o.data.status),
  ).length

  // Abandoned checkouts of the last 30 days and how many became orders.
  const since = Date.now() - 30 * 24 * 3600 * 1000
  const checkouts = (await getCheckouts()).filter(
    c => new Date(c.data.createdAt).getTime() >= since,
  )
  const recovered = checkouts.filter(c => c.data.orderPath).length

  const lowStock = (await getProducts())
    .map(p => ({
      title: p.data.title,
      id: p.path.split('/').pop()!,
      stock: p.data.inventory?.stockQuantity,
      threshold: p.data.inventory?.lowStockThreshold ?? 0,
    }))
    .filter(p => typeof p.stock === 'number' && p.stock <= Math.max(p.threshold, 0))
    .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))

  return {
    revenue,
    orderCount: counted.length,
    pendingCount: orders.filter(o => o.data.status === OrderStatus.PENDING).length,
    averageOrder: counted.length ? Math.round(revenue / counted.length) : 0,
    customers,
    salesByMonth: months.map(({ name, sales }) => ({ name, sales })),
    recentOrders,
    topProducts,
    refusalRate: refusalRate(delivered, failed),
    finishedDeliveries: delivered + failed,
    toShip,
    abandoned: checkouts.length - recovered,
    checkoutConversion: checkouts.length ? recovered / checkouts.length : 0,
    lowStock,
    pendingReviews: (await getReviews()).filter(r => r.data.status === 'PENDING').length,
  }
}

/** Logs and falls back to empty, like the pages expect (signed out or no store included). */
const orEmpty = async <T>(label: string, load: () => Promise<T[]>): Promise<T[]> => {
  try {
    return await load()
  } catch (error) {
    if (!(error instanceof Unauthorized)) console.error(`Failed to fetch ${label}:`, error)
    return []
  }
}

const orNone = async <T>(label: string, load: () => Promise<T | undefined>) => {
  try {
    return await load()
  } catch (error) {
    if (!(error instanceof Unauthorized)) console.error(`Failed to fetch ${label}:`, error)
    return undefined
  }
}

/** Orders and checkouts are addressed by id (path = id) in the admin pages. */
const byId = <T>(docs: DatabaseDocument<T>[]) =>
  docs.map(d => ({ ...d, path: d.path.split('/').pop()! }))

const getProducts = () =>
  orEmpty('products', () => scopedList<Product>(CollectionsName.Products)) as Promise<IProduct[]>
const getProductById = (id: string) =>
  orNone('product', () => scopedGet<Product>(CollectionsName.Products, id))
const getCategories = () =>
  orEmpty('categories', () => scopedList<Category>(CollectionsName.Categories))
const getCategoryById = (id: string) =>
  orNone('category', () => scopedGet<Category>(CollectionsName.Categories, id))
const getShipments = () =>
  orEmpty('shipments', () => scopedList<Shipment>(CollectionsName.Shipments))
const getShipmentById = (id: string) =>
  orNone('shipment', () => scopedGet<Shipment>(CollectionsName.Shipments, id))
const getBlogs = () => orEmpty('blogs', () => scopedList<Blog>(CollectionsName.Blogs))
const getBlogById = (id: string) => orNone('blog', () => scopedGet<Blog>(CollectionsName.Blogs, id))
const getReviews = () => orEmpty('reviews', () => scopedList<Review>(CollectionsName.Reviews))
const getReviewById = (id: string) =>
  orNone('review', () => scopedGet<Review>(CollectionsName.Reviews, id))
const getPromotions = () =>
  orEmpty('promotions', () => scopedList<Promotion>(CollectionsName.Promotions))
const getPromotionById = (id: string) =>
  orNone('promotion', () => scopedGet<Promotion>(CollectionsName.Promotions, id))
const getOrders = () =>
  orEmpty('orders', async () => byId(await scopedList<Order>(CollectionsName.Orders)))
const getOrderById = (id: string) =>
  orNone('order', async () => {
    const order = await scopedGet<Order>(CollectionsName.Orders, id)
    return order && byId([order])[0]
  })
const getCheckouts = () =>
  orEmpty('checkouts', async () => byId(await scopedList<Checkout>(CollectionsName.Checkouts)))

/** The store's locations (its shipments and promotions reference them). */
const getLocations = () =>
  orEmpty('locations', async () =>
    (await scopedList<DeliveryLocation>(CollectionsName.Locations)).sort(
      (a, b) => a.data.city.localeCompare(b.data.city) || a.data.name.localeCompare(b.data.name),
    ),
  )

export { getUserTokens, getUserTokensOnApiRoute }

const forbidden = (error: unknown) =>
  error instanceof Unauthorized ? new NextResponse('Unauthorized', { status: 403 }) : undefined

export const postData = async (
  req: NextRequest,
  schema: z.ZodSchema,
  collection: string,
  verifyRecordExists?: boolean,
  uniqueField?: string,
  value: string = '',
) => {
  try {
    await requireStore()
    const json = await req.json()
    schema.parse(json)

    if (verifyRecordExists && uniqueField) {
      if (await isTakenInStore(collection, uniqueField, value)) {
        return new NextResponse(`${collection} already exists`, { status: 409 })
      }
    }

    const result = await scopedCreate(collection, json)
    if (!result) {
      return new NextResponse(`Failed to create ${collection}`, { status: 500 })
    }
    return new NextResponse(null, { status: 200 })
  } catch (error) {
    const response = forbidden(error)
    if (response) return response
    throw error
  }
}

export const getDataById = async (_req: NextRequest, collection: string, id: string) => {
  try {
    const data = await scopedGet(collection, id)
    if (!data) {
      return new NextResponse(`${collection} not found`, { status: 404 })
    }
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    const response = forbidden(error)
    if (response) return response
    throw error
  }
}

export const putData = async (
  req: NextRequest,
  schema: z.ZodSchema,
  collection: string,
  id: string,
) => {
  try {
    await requireStore()
    const json = await req.json()
    schema.parse(json)
    if (!(await scopedUpdate(collection, id, json))) {
      return new NextResponse(`${collection} not found`, { status: 404 })
    }
    return NextResponse.json(true, { status: 200 })
  } catch (error) {
    const response = forbidden(error)
    if (response) return response
    throw error
  }
}

export const deleteData = async (_req: NextRequest, collection: string, id: string) => {
  try {
    if (!(await scopedDelete(collection, id))) {
      return new NextResponse('Not Found or Unauthorized', { status: 404 })
    }
    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    const response = forbidden(error)
    if (response) return response
    throw error
  }
}

export const getPromotionsCache = cache(getPromotions)
export const getShipmentByIdCache = cache(getShipmentById)
export const getPromotionByIdCache = cache(getPromotionById)
export const getOrdersCache = cache(getOrders)
export const getOrderByIdCache = cache(getOrderById)
export const getCheckoutsCache = cache(getCheckouts)
export const getReviewByIdCache = cache(getReviewById)
export const getProductsCache = cache(getProducts)
export const getProductByIdCache = cache(getProductById)
export const getCategoriesCache = cache(getCategories)
export const getCategoryByIdCache = cache(getCategoryById)
export const getShipmentsCache = cache(getShipments)
export const getLocationsCache = cache(getLocations)
export const getBlogsCache = cache(getBlogs)
export const getBlogByIdCache = cache(getBlogById)
export const getReviewsCache = cache(getReviews)
