import { DatabaseDocument, QueryFilter } from '@spreeloop/database'
import {
  Blog,
  Category,
  Order,
  Product,
  Promotion,
  PromotionStatus,
  Review,
  Shipment,
} from '../firebase/models'
import { backend } from '../firebase/firebase-server/firebase'
import { CollectionsName } from '../firebase/collection-name'

export type ICategory = DatabaseDocument<Category>
export type IShipment = DatabaseDocument<Shipment>
export type IReview = DatabaseDocument<Review>
export type IBlog = DatabaseDocument<Blog>
export type IPromotion = DatabaseDocument<Promotion>
export type IProduct = Product & { path: string }
export type IOrder = DatabaseDocument<Order>

export async function getDocumentBySlug<T>(props: {
  collection: string
  slug: string
}): Promise<T | undefined> {
  try {
    const data = await backend.database.getCollection<T>({
      collectionPath: props.collection,
      filters: [new QueryFilter('slug', '==', props.slug)],
    })

    const doc = data[0]?.data

    return doc ? { ...doc, path: data[0].path } : undefined
  } catch (error) {
    console.error(`Failed to fetch ${props.collection}:`, error)
    return
  }
}
export const getAllCollection = async <T>(props: {
  collection: string
  filters?: QueryFilter[]
}): Promise<T[] | undefined> => {
  try {
    const data = await backend.database.getCollection<T>({
      collectionPath: props.collection,
      filters: props.filters,
    })
    return data.map(item => ({ ...item.data, path: item.path }))
  } catch (error) {
    console.error(`Failed to fetch ${props.collection}:`, error)
    return
  }
}

export const getAllRelatedCollection = async <T extends { slug: string }>(props: {
  collection: string
  slug: string
  filters?: QueryFilter[]
}): Promise<T[] | undefined> => {
  try {
    const data = await backend.database.getCollection<T>({
      collectionPath: props.collection,
      filters: props.filters,
    })

    return data.filter(item => item.data.slug != props.slug).map(e => ({ ...e.data, path: e.path }))
  } catch (error) {
    console.error(`Failed to fetch ${props.collection}:`, error)
    return
  }
}

export const getDocumentByPath = async <T>(props: { path: string }): Promise<T | undefined> => {
  try {
    const data = await backend.database.getRecord<T>(props.path)

    return { ...data.data, path: data.path }
  } catch (error) {
    console.error(`Failed to fetch ${props.path}:`, error)
    return Promise.resolve(undefined)
  }
}

export const getAllValidPromotion = async (): Promise<Promotion[]> => {
  try {
    const query = backend.db.collection(CollectionsName.Promotions)
    query.where('status', '==', PromotionStatus.ACTIVE)
    query.where('startDate', '<=', new Date().toISOString())
    query.where('endDate', '>=', new Date().toISOString())

    return await query.get().then(querySnapshot => {
      return querySnapshot.docs.map<Promotion>(doc => ({
        ...(doc.data() as Promotion),
        path: doc.ref.path,
      }))
    })
  } catch (error) {
    console.error('Error fetching promotions:', error)
    return []
  }
}
