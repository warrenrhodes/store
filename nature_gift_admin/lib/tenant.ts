// The only way the admin reads or writes a store's collections (docs/MULTI_TENANT_PLAN.md, 3.5).
// Every query is filtered on the current store's id, every write stamps it, and a document of
// another store is answered as "not found". scripts/check-tenant.mjs keeps it that way in CI.
import { clientConfig, serverConfig } from '@/config'
import { DatabaseDocument, QueryFilter } from '@spreeloop/database'
import type { DocumentReference, DocumentSnapshot, Transaction } from 'firebase-admin/firestore'
import { getTokens, Tokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { cache } from 'react'
import { CollectionsName } from './firebase/collection-name'
import { backend } from './firebase/firebase-server/firebase'
import { Invite, Membership, Store, StoreRole } from './firebase/models'
import { PLATFORM_URL } from './storefront'

/** Cookie written by the store switcher. Only a hint: the membership is checked on every request. */
export const STORE_COOKIE = 'current-store'

export class Unauthorized extends Error {}

export type StoreContext = {
  uid: string
  email: string | null
  storeId: string
  role: StoreRole
  store: Store
  /** Custom claim `platformAdmin: true` (scripts/set-platform-admin.mjs). */
  platformAdmin: boolean
}

const authOptions = {
  apiKey: clientConfig.apiKey,
  cookieName: serverConfig.cookieName,
  cookieSignatureKeys: serverConfig.cookieSignatureKeys,
  serviceAccount: serverConfig.serviceAccount,
}

export const getUserTokens = cache(
  async (): Promise<Tokens | undefined> =>
    (await getTokens(await cookies(), authOptions)) ?? undefined,
)

export const getUserTokensOnApiRoute = async (request: NextRequest) =>
  (await getTokens(request.cookies, authOptions)) ?? undefined

const fresh = <T>(value: T): T => JSON.parse(JSON.stringify(value))

/** A Firestore document id taken from a URL: no path separators. */
const isDocId = (id: unknown): id is string =>
  typeof id === 'string' && id.length > 0 && id.length <= 200 && !id.includes('/')

export const membershipId = (storeId: string, uid: string) => `${storeId}_${uid}`
export const inviteId = (storeId: string, email: string) => `${storeId}_${email.toLowerCase()}`

/** Pending invitations for this email become memberships (the invited person just signed in). */
async function acceptInvites(uid: string, email: string | null) {
  if (!email) return
  const invites = await backend.db
    .collection(CollectionsName.Invites)
    .where('email', '==', email.toLowerCase())
    .get()
  if (invites.empty) return
  const batch = backend.db.batch()
  for (const doc of invites.docs) {
    const invite = doc.data() as Invite
    const membership: Membership = {
      storeId: invite.storeId,
      uid,
      role: invite.role,
      email: email.toLowerCase(),
      createdAt: new Date().toISOString(),
    }
    batch.set(
      backend.db.collection(CollectionsName.Memberships).doc(membershipId(invite.storeId, uid)),
      membership,
      { merge: true },
    )
    batch.delete(doc.ref)
  }
  await batch.commit()
}

/** The signed-in user's stores, by name. */
export const getMyStores = cache(async () => {
  const tokens = await getUserTokens()
  if (!tokens) return []
  const { uid, email } = tokens.decodedToken
  await acceptInvites(uid, email ?? null)
  const memberships = await backend.db
    .collection(CollectionsName.Memberships)
    .where('uid', '==', uid)
    .get()
  const stores = await Promise.all(
    memberships.docs.map(async m => {
      const doc = await backend.db.collection(CollectionsName.Stores).doc(m.get('storeId')).get()
      return doc.exists
        ? { id: doc.id, role: m.get('role') as StoreRole, store: doc.data() as Store }
        : undefined
    }),
  )
  return stores
    .filter((s): s is NonNullable<typeof s> => !!s)
    .sort((a, b) => a.store.name.localeCompare(b.store.name))
})

/**
 * The store the signed-in user works on: the cookie's store if they are a member (or platform
 * admin), else their first store. Null when signed out or without any store.
 */
export const getStoreContext = cache(async (): Promise<StoreContext | null> => {
  const tokens = await getUserTokens()
  if (!tokens) return null
  const { uid } = tokens.decodedToken
  const email = tokens.decodedToken.email ?? null
  const platformAdmin = tokens.decodedToken.platformAdmin === true

  const wanted = (await cookies()).get(STORE_COOKIE)?.value
  if (isDocId(wanted)) {
    const [membership, store] = await Promise.all([
      backend.db.collection(CollectionsName.Memberships).doc(membershipId(wanted, uid)).get(),
      backend.db.collection(CollectionsName.Stores).doc(wanted).get(),
    ])
    if (store.exists && (membership.exists || platformAdmin)) {
      return {
        uid,
        email,
        storeId: wanted,
        role: membership.exists ? (membership.get('role') as StoreRole) : StoreRole.OWNER,
        store: store.data() as Store,
        platformAdmin,
      }
    }
  }
  const [first] = await getMyStores()
  if (!first) return null
  return { uid, email, storeId: first.id, role: first.role, store: first.store, platformAdmin }
})

/** Throws Unauthorized unless signed in with a store (and its owner when `owner` is set). */
export async function requireStore(options: { owner?: boolean } = {}) {
  const ctx = await getStoreContext()
  if (!ctx) throw new Unauthorized('No store')
  if (options.owner && ctx.role !== StoreRole.OWNER) throw new Unauthorized('Owner only')
  return ctx
}

/** Documents of the current store, optionally narrowed by more filters. */
export async function scopedList<T>(collection: string, filters: QueryFilter[] = []) {
  const { storeId } = await requireStore()
  const docs = await backend.database.getCollection<T>({
    collectionPath: collection,
    filters: [new QueryFilter('storeId', '==', storeId), ...filters],
  })
  return fresh(docs) as DatabaseDocument<T>[]
}

/** How many documents the current store has in `collection` (a count query, ~1 read). */
export async function scopedCount(collection: string) {
  const { storeId } = await requireStore()
  const snapshot = await backend.db
    .collection(collection)
    .where('storeId', '==', storeId)
    .count()
    .get()
  return snapshot.data().count
}

/** One document of the current store, or undefined (also for another store's document). */
export async function scopedGet<T>(collection: string, id: string) {
  const { storeId } = await requireStore()
  if (!isDocId(id)) return undefined
  const doc = await backend.db.collection(collection).doc(id).get()
  if (!doc.exists || doc.get('storeId') !== storeId) return undefined
  return fresh({ path: doc.ref.path, data: doc.data() as T }) as DatabaseDocument<T>
}

/**
 * Drops the storefront's cached reads of this store (and the marketplace's) through its
 * POST /api/revalidate, so an edit shows at once; the 5-minute cache TTL covers a failure.
 * Called after every write below. Never throws.
 */
export async function revalidateStorefront(storeId: string) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || !PLATFORM_URL) return
  try {
    const res = await fetch(`${PLATFORM_URL}/api/revalidate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: [`store:${storeId}`, 'market', 'stores'] }),
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) console.error('Storefront revalidation failed:', res.status)
  } catch (error) {
    console.error('Storefront revalidation failed:', error)
  }
}

/** A zone may only list its own store's locations (ids of another store's are refused). */
async function checkOwnLocations(
  collection: string,
  data: Record<string, unknown>,
  storeId: string,
) {
  if (collection !== CollectionsName.Shipments || !Array.isArray(data.locationIds)) return
  const ids = data.locationIds.map(String)
  if (ids.length === 0) return
  if (!ids.every(isDocId)) throw new Unauthorized('Invalid location')
  const docs = await backend.db.getAll(
    ...ids.map(id => backend.db.collection(CollectionsName.Locations).doc(id)),
  )
  if (docs.some(doc => !doc.exists || doc.get('storeId') !== storeId)) {
    throw new Unauthorized("Another store's location")
  }
}

/** Creates a document in the current store. storeId, creatorId and the dates can't be forged. */
export async function scopedCreate(collection: string, data: Record<string, unknown>) {
  const ctx = await requireStore()
  await checkOwnLocations(collection, data, ctx.storeId)
  const now = new Date().toISOString()
  const created = await backend.database.createRecord(collection, {
    ...data,
    // New products show on the marketplace (if the store is listed), like migrated ones; only
    // the platform's moderation (/platform/products) hides one.
    ...(collection === CollectionsName.Products ? { marketplaceListed: true } : {}),
    storeId: ctx.storeId,
    creatorId: ctx.uid,
    createdAt: now,
    updatedAt: now,
  })
  await revalidateStorefront(ctx.storeId)
  return created
}

// marketplaceListed: set by the platform's moderation only, never by the store's own edits.
const LOCKED_FIELDS = ['storeId', 'creatorId', 'createdAt', 'marketplaceListed'] as const

/** Merges `data` into a document of the current store. False if it isn't one. */
export async function scopedUpdate(collection: string, id: string, data: Record<string, unknown>) {
  if (!(await scopedGet(collection, id))) return false
  const { storeId } = await requireStore()
  await checkOwnLocations(collection, data, storeId)
  const rest = { ...data }
  for (const field of LOCKED_FIELDS) delete rest[field]
  await backend.database.setRecord(`${collection}/${id}`, {
    ...rest,
    updatedAt: new Date().toISOString(),
  })
  await revalidateStorefront(storeId)
  return true
}

/** Deletes a document of the current store. False if it isn't one. */
export async function scopedDelete(collection: string, id: string) {
  if (!(await scopedGet(collection, id))) return false
  const { storeId } = await requireStore()
  await backend.db.collection(collection).doc(id).delete()
  await revalidateStorefront(storeId)
  return true
}

/**
 * Runs `work` in a transaction on a document of the current store. `getScoped(path)` reads
 * another document in the same transaction, undefined if it belongs to another store.
 */
export async function scopedTransaction<T, R>(
  collection: string,
  id: string,
  work: (helpers: {
    tx: Transaction
    data: T
    ref: DocumentReference
    ctx: StoreContext
    getScoped: (path: string) => Promise<DocumentSnapshot | undefined>
  }) => Promise<R>,
): Promise<R | undefined> {
  const ctx = await requireStore()
  if (!isDocId(id)) return undefined
  const ref = backend.db.collection(collection).doc(id)
  const result = await backend.db.runTransaction(async tx => {
    const doc = await tx.get(ref)
    if (!doc.exists || doc.get('storeId') !== ctx.storeId) return undefined
    const getScoped = async (path: string) => {
      const [name, docId, ...rest] = path.split('/')
      if (!name || !isDocId(docId) || rest.length) return undefined
      const other = await tx.get(backend.db.collection(name).doc(docId))
      return other.exists && other.get('storeId') === ctx.storeId ? other : undefined
    }
    return work({ tx, data: doc.data() as T, ref, ctx, getScoped })
  })
  if (result !== undefined) await revalidateStorefront(ctx.storeId)
  return result
}

/** True if another document of the current store uses this value. */
export async function isTakenInStore(
  collection: string,
  field: string,
  value: string,
  exceptId?: string,
) {
  const { storeId } = await requireStore()
  const snapshot = await backend.db
    .collection(collection)
    .where('storeId', '==', storeId)
    .where(field, '==', value)
    .limit(2)
    .get()
  return snapshot.docs.some(doc => doc.id !== exceptId)
}
