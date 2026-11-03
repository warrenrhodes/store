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
  isValidStoreSlug,
  Order,
  Product,
  Promotion,
  PromotionStatus,
  Review,
  Shipment,
  Store,
  StoreStatus,
} from '../firebase/models'
import { MARKET } from '@ngift/core/site'
import { notFound } from 'next/navigation'

export type ICategory = DatabaseDocument<Category>
export type IShipment = DatabaseDocument<Shipment>
export type IReview = DatabaseDocument<Review>
export type IBlog = DatabaseDocument<Blog>
export type IPromotion = DatabaseDocument<Promotion>
export type IProduct = Product & { path: string }
export type IOrder = DatabaseDocument<Order>

// Raw readers throw on failure; the exported wrappers below log and fall back.

/**
 * Whose data a storefront read returns: one store's (its id), or the marketplace's (null):
 * marketplace product lists keep the listed products of active, listed stores only.
 */
export type StoreScope = string | null

/** Cache tags, dropped by POST /api/revalidate when the admin writes (docs/MULTI_TENANT_PLAN.md, 3.3). */
export const storeTag = (storeId: string) => `store:${storeId}`
/** Reads spanning stores: marketplace lists, reads by path. */
export const MARKET_TAG = 'market'
/** Store slugs and statuses. */
export const STORES_TAG = 'stores'
const scopeTags = (storeId: StoreScope) => [storeId ? storeTag(storeId) : MARKET_TAG]

const query = async <T>(collection: string, filters: QueryFilter[] = [], storeId: StoreScope) => {
  const scoped = storeId
    ? [new QueryFilter('storeId', '==', storeId)]
    : collection === CollectionsName.Products
      ? [new QueryFilter('marketplaceListed', '==', true)]
      : []
  const data = await backend.database.getCollection<T>({
    collectionPath: collection,
    filters: [...filters, ...scoped],
  })
  const docs = data.map(item => ({ ...item.data, path: item.path }))
  if (storeId || collection !== CollectionsName.Products) return docs
  const listed = new Set(await readListedStoreIds())
  return docs.filter(doc => listed.has((doc as { storeId?: string }).storeId ?? ''))
}

const getDocumentBySlug = async <T>(props: {
  collection: string
  slug: string
  storeId: StoreScope
}) => {
  const [doc] = await query<T>(
    props.collection,
    [new QueryFilter('slug', '==', props.slug)],
    props.storeId,
  )
  return doc
}

const getAllCollection = <T>(props: {
  collection: string
  filters?: QueryFilter[]
  storeId: StoreScope
}) => query<T>(props.collection, props.filters, props.storeId)

const getAllRelatedCollection = async <T extends { slug: string }>(props: {
  collection: string
  slug: string
  filters?: QueryFilter[]
  storeId: StoreScope
}) =>
  (await query<T>(props.collection, props.filters, props.storeId)).filter(
    item => item.slug != props.slug,
  )

const getDocumentByPath = async <T>(props: { path: string }) => {
  const data = await backend.database.getRecord<T>(props.path)
  return { ...data.data, path: data.path }
}

/**
 * Firestore free tier = 50k reads/day. Data read on every product, ad and checkout view is
 * shared across requests and instances for a few minutes; admin edits show up within that delay.
 * Reads that fail throw inside the cache, so a failure is never cached.
 */
// The admin drops them earlier through POST /api/revalidate; the delay is the safety net.
const SHARED_CACHE_SECONDS = 300

/** `read` shared under `key` for SHARED_CACHE_SECONDS, or until one of `tags` is revalidated. */
const cachedRead = <R>(key: unknown[], tags: string[], read: () => Promise<R>) =>
  unstable_cache(read, [JSON.stringify(key)], { revalidate: SHARED_CACHE_SECONDS, tags })()

const readListedStoreIds = () =>
  cachedRead(['listed-stores'], [STORES_TAG], async () =>
    (
      await backend.db
        .collection(CollectionsName.Stores)
        .where('status', '==', StoreStatus.ACTIVE)
        .where('marketplaceListed', '==', true)
        .select()
        .get()
    ).docs.map(doc => doc.id),
  )

/** Active promotions of a store; of every store on the marketplace (display only, never priced). */
const readActivePromotions = (storeId: StoreScope) =>
  cachedRead(['active-promotions', storeId], scopeTags(storeId), async () => {
    let promotions = backend.db
      .collection(CollectionsName.Promotions)
      .where('status', '==', PromotionStatus.ACTIVE)
    if (storeId) promotions = promotions.where('storeId', '==', storeId)
    return (await promotions.get()).docs.map<Promotion>(doc => ({
      ...(doc.data() as Promotion),
      path: doc.ref.path,
    }))
  })

const getAllValidPromotion = async (storeId: StoreScope): Promise<Promotion[]> => {
  try {
    const now = Date.now()
    // Date window filtered after the cache (and in memory: avoids a composite index)
    return (await readActivePromotions(storeId)).filter(p => {
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

/**
 * A store's shipments plus only the locations they use (not the whole collection). On the
 * marketplace, every store's zones, each with its storeId: the checkout keeps the cart's store's.
 */
const readShippingZones = (storeId: StoreScope) =>
  cachedRead(['shipping-zones', storeId], scopeTags(storeId), async () => {
    const shipments = (
      await (
        storeId
          ? backend.db.collection(CollectionsName.Shipments).where('storeId', '==', storeId)
          : backend.db.collection(CollectionsName.Shipments)
      ).get()
    ).docs.map(doc => ({ ...(doc.data() as Shipment), path: doc.ref.path }))
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
  })

const getShippingZones = async (storeId: StoreScope) => {
  try {
    return await readShippingZones(storeId)
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
  new FlockNotifier({ webhookUrl: process.env.PLATFORM_FLOCK_WEBHOOK_URL ?? '' }).sendText(
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

/**
 * Shared across requests (keyed by the arguments, tagged by their store), deduped per request.
 * Catalogue reads take a `storeId` (StoreScope): no storefront list without it.
 */
const shared = <P extends object, R>(
  name: string,
  read: (props: P) => Promise<R>,
  fallback: () => R,
) =>
  cache(
    safe(
      name,
      (props: P) =>
        cachedRead(
          [name, props],
          'storeId' in props ? scopeTags(props.storeId as StoreScope) : [MARKET_TAG],
          () => read(props),
        ),
      fallback,
    ),
  )

// Catalogue data (products, blogs, categories, reviews): a few minutes stale is fine.
export const getAllRelatedCollectionCache = shared(
  'related-collection',
  getAllRelatedCollection,
  () => [],
) as <T extends { slug: string }>(props: {
  collection: string
  slug: string
  filters?: QueryFilter[]
  storeId: StoreScope
}) => Promise<T[]>
export const getDocumentBySlugCache = shared(
  'document-by-slug',
  getDocumentBySlug,
  () => undefined,
) as <T>(props: { collection: string; slug: string; storeId: StoreScope }) => Promise<T | undefined>
/** By path, any store: callers check the store where it matters (tagged `market`). */
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
  storeId: StoreScope
}) => Promise<T[]>

export type SiteStore = Store & { id: string }
/** What a page is served for: the marketplace (store null) or one active store. */
export type SiteContext = { site: string; store: SiteStore | null }

/** stores/{id}, or null. */
export const getStoreCache = cache(
  safe(
    'store',
    (id: string) =>
      cachedRead(['store', id], [storeTag(id)], async () => {
        const doc = await backend.db.collection(CollectionsName.Stores).doc(id).get()
        return doc.exists ? ({ ...(doc.data() as Store), id } as SiteStore) : null
      }),
    () => null,
  ),
)

const readStoreIdBySlug = safe(
  'store-slug',
  (slug: string) =>
    cachedRead(['store-slug', slug], [STORES_TAG], async () => {
      const doc = await backend.db.collection(CollectionsName.StoreSlugs).doc(slug).get()
      return (doc.get('storeId') as string | undefined) ?? null
    }),
  () => null,
)

/**
 * The site a request is for: the marketplace, or an active store found by its slug. Null (a
 * 404) for an unknown slug or a store that isn't active (waiting for its payment, suspended).
 */
export const getSiteContext = cache(async (site: string): Promise<SiteContext | null> => {
  if (site === MARKET) return { site, store: null }
  if (!isValidStoreSlug(site)) return null
  const id = await readStoreIdBySlug(site)
  const store = id ? await getStoreCache(id) : null
  return store?.status === StoreStatus.ACTIVE ? { site, store } : null
})

/** The page's site (params of app/[site]), or a 404. */
export const siteOf = async (params: Promise<{ site: string }>) => {
  const ctx = await getSiteContext((await params).site)
  if (!ctx) notFound()
  return ctx
}

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

/**
 * A store's active promotions with up-to-date usage counts for those with a total limit (the
 * list itself is cached for a few minutes; a few extra reads keep an exhausted code from
 * showing as valid). Always one store: promotions are never priced across stores.
 */
export const getPromotionsWithFreshUsage = async (storeId: string): Promise<Promotion[]> => {
  const promotions = await getAllValidPromotionCache(storeId)
  const limited = promotions.filter(p => p.usageLimit?.total)
  if (limited.length === 0) return promotions
  try {
    const docs = await backend.db.getAll(...limited.map(p => backend.db.doc(p.path)))
    const counts = new Map(docs.map(doc => [doc.ref.path, (doc.get('usageCount') as number) ?? 0]))
    return promotions.map(p => (counts.has(p.path) ? { ...p, usageCount: counts.get(p.path) } : p))
  } catch (error) {
    console.error('Error reading promotion usage:', error)
    return promotions
  }
}
