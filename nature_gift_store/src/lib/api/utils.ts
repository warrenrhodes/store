import { toDate } from '@/lib/utils/utils'
import { toShippingZones } from '@/lib/utils/shipping-zones'
import { DatabaseDocument, QueryFilter } from '@spreeloop/database'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { FlockNotifier } from '../notifications/flock/flock'
import { CollectionsName } from '../firebase/collection-name'
import { backend } from '../firebase/firebase-server/firebase'
import {
  Blog,
  Category,
  DeliveryLocation,
  Order,
  Product,
  Promotion,
  PromotionStatus,
  Review,
  Shipment,
} from '../firebase/models'

export type ICategory = DatabaseDocument<Category>
export type IShipment = DatabaseDocument<Shipment>
export type IReview = DatabaseDocument<Review>
export type IBlog = DatabaseDocument<Blog>
export type IPromotion = DatabaseDocument<Promotion>
export type IProduct = Product & { path: string }
export type IOrder = DatabaseDocument<Order>

// Raw readers throw on failure; the exported wrappers below log and fall back.
const getDocumentBySlug = async <T>(props: { collection: string; slug: string }) => {
  const data = await backend.database.getCollection<T>({
    collectionPath: props.collection,
    filters: [new QueryFilter('slug', '==', props.slug)],
  })
  const doc = data[0]?.data
  return doc ? { ...doc, path: data[0].path } : undefined
}

const getAllCollection = async <T>(props: { collection: string; filters?: QueryFilter[] }) => {
  const data = await backend.database.getCollection<T>({
    collectionPath: props.collection,
    filters: props.filters,
  })
  return data.map(item => ({ ...item.data, path: item.path }))
}

const getAllRelatedCollection = async <T extends { slug: string }>(props: {
  collection: string
  slug: string
  filters?: QueryFilter[]
}) => {
  const data = await backend.database.getCollection<T>({
    collectionPath: props.collection,
    filters: props.filters,
  })
  return data.filter(item => item.data.slug != props.slug).map(e => ({ ...e.data, path: e.path }))
}

const getDocumentByPath = async <T>(props: { path: string }) => {
  const data = await backend.database.getRecord<T>(props.path)
  return { ...data.data, path: data.path }
}

/**
 * Firestore free tier = 50k reads/day. Data read on every product, ad and checkout view is
 * shared across requests and instances for a few minutes; admin edits show up within that delay.
 * Reads that fail throw inside the cache, so a failure is never cached.
 */
// ponytail: time-based only; on-demand revalidation needs the admin to call a store webhook.
const SHARED_CACHE_SECONDS = 300

const readActivePromotions = unstable_cache(
  async () =>
    (
      await backend.db
        .collection(CollectionsName.Promotions)
        .where('status', '==', PromotionStatus.ACTIVE)
        .get()
    ).docs.map<Promotion>(doc => ({ ...(doc.data() as Promotion), path: doc.ref.path })),
  ['active-promotions'],
  { revalidate: SHARED_CACHE_SECONDS },
)

const getAllValidPromotion = async (): Promise<Promotion[]> => {
  try {
    const now = Date.now()
    // Date window filtered after the cache (and in memory: avoids a composite index)
    return (await readActivePromotions()).filter(p => {
      const start = toDate(p.startDate)?.getTime()
      const end = toDate(p.endDate)?.getTime()
      return start !== undefined && end !== undefined && start <= now && now <= end
    })
  } catch (error) {
    console.error('Error fetching promotions:', error)
    alertReadFailure('promotions', error)
    return []
  }
}

/** Shipments plus only the locations they use (not the whole collection). */
const readShippingZones = unstable_cache(
  async () => {
    const shipments = (await backend.db.collection(CollectionsName.Shipments).get()).docs.map(
      doc => ({ ...(doc.data() as Shipment), path: doc.ref.path }),
    )
    const ids = [
      ...new Set(shipments.filter(s => s.isActive !== false).flatMap(s => s.locationIds ?? [])),
    ]
    const locations = ids.length
      ? (
          await backend.db.getAll(
            ...ids.map(id => backend.db.collection(CollectionsName.Locations).doc(id)),
          )
        )
          .filter(doc => doc.exists)
          .map(doc => ({ ...(doc.data() as DeliveryLocation), path: doc.ref.path }))
      : []
    return toShippingZones(shipments, locations)
  },
  ['shipping-zones'],
  { revalidate: SHARED_CACHE_SECONDS },
)

const getShippingZones = async () => {
  try {
    return await readShippingZones()
  } catch (error) {
    console.error('Error fetching shipping zones:', error)
    alertReadFailure('shipping-zones', error)
    return []
  }
}

// ponytail: per-instance throttle; enough to be told the store can't read its data.
let lastAlert = 0
/** Tells the team (Flock) that the store can't read Firestore, at most every 10 minutes. */
const alertReadFailure = (name: string, error: unknown) => {
  if (Date.now() - lastAlert < 10 * 60_000) return
  lastAlert = Date.now()
  new FlockNotifier({ webhookUrl: process.env.FLOCK_WEBHOOK_URL as string }).sendText(
    `🚨 Store can't read Firestore (${name}): ${String((error as Error)?.message ?? error).slice(0, 300)}`,
  )
}

/** Never throws: a failed read is logged, reported and replaced by `fallback()`. */
const safe =
  <A extends unknown[], R>(name: string, read: (...args: A) => Promise<R>, fallback: () => R) =>
  async (...args: A): Promise<R> => {
    try {
      return await read(...args)
    } catch (error) {
      console.error(`Failed to read ${name}:`, error)
      alertReadFailure(name, error)
      return fallback()
    }
  }

/** Shared across requests for SHARED_CACHE_SECONDS (keyed by the arguments), deduped per request. */
const shared = <A extends unknown[], R>(
  name: string,
  read: (...args: A) => Promise<R>,
  fallback: () => R,
) => cache(safe(name, unstable_cache(read, [name], { revalidate: SHARED_CACHE_SECONDS }), fallback))

// Catalogue data (products, blogs, categories, reviews): a few minutes stale is fine.
export const getAllRelatedCollectionCache = shared(
  'related-collection',
  getAllRelatedCollection,
  () => [],
) as <T extends { slug: string }>(props: {
  collection: string
  slug: string
  filters?: QueryFilter[]
}) => Promise<T[]>
export const getDocumentBySlugCache = shared(
  'document-by-slug',
  getDocumentBySlug,
  () => undefined,
) as <T>(props: { collection: string; slug: string }) => Promise<T | undefined>
export const getDocumentByPathCache = shared(
  'document-by-path',
  getDocumentByPath,
  () => undefined,
) as <T>(props: { path: string }) => Promise<T | undefined>
export const getAllCollectionCache = shared('collection', getAllCollection, () => []) as <
  T,
>(props: {
  collection: string
  filters?: QueryFilter[]
}) => Promise<T[]>

// Fresh reads: price and stock when ordering, a customer's own orders.
export const getDocumentByPathFresh = cache(
  safe('document-by-path', getDocumentByPath, () => undefined),
) as <T>(props: { path: string }) => Promise<T | undefined>
export const getAllCollectionFresh = cache(safe('collection', getAllCollection, () => [])) as <
  T,
>(props: {
  collection: string
  filters?: QueryFilter[]
}) => Promise<T[]>

export const getAllValidPromotionCache = cache(getAllValidPromotion)
export const getShippingZonesCache = cache(getShippingZones)
