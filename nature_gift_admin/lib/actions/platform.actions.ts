'use server'

// Platform owner console (/platform): every store, cash payments, activation. Reserved to the
// `platformAdmin` custom claim (scripts/set-platform-admin.mjs). Allowed to use `backend`
// across stores by scripts/check-tenant.mjs.
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import {
  defaultStoreSettings,
  isValidStoreSlug,
  Membership,
  Store,
  StorePayment,
  StorePlan,
  StoreRole,
  StoreSecrets,
  StoreStatus,
} from '@/lib/firebase/models'
import { getUserTokens, membershipId, revalidateStorefront, Unauthorized } from '@/lib/tenant'
import { extendPaidUntil } from '@ngift/core/store-rules'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requirePlatformAdmin() {
  const tokens = await getUserTokens()
  if (tokens?.decodedToken.platformAdmin !== true) throw new Unauthorized('Platform admin only')
  return { uid: tokens.decodedToken.uid, email: tokens.decodedToken.email ?? null }
}

const back = (params: Record<string, string>): never =>
  redirect(`/platform?${new URLSearchParams(params)}`)

export async function isPlatformAdmin() {
  return (await getUserTokens())?.decodedToken.platformAdmin === true
}

/** Every store, pending first, then by name. Small collection: read whole, platform admin only. */
export async function listStoresForPlatform() {
  await requirePlatformAdmin()
  const snapshot = await backend.db.collection(CollectionsName.Stores).get()
  const rank = { [StoreStatus.PENDING]: 0, [StoreStatus.ACTIVE]: 1, [StoreStatus.SUSPENDED]: 2 }
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...(doc.data() as Store) }))
    .sort((a, b) => rank[a.status] - rank[b.status] || a.name.localeCompare(b.name))
}

/**
 * New store for an existing admin account (the owner signs up first), created `pending`
 * until the first cash payment. The slug is reserved in the same transaction.
 */
export async function createStore(formData: FormData) {
  await requirePlatformAdmin()
  const name = String(formData.get('name') ?? '').trim()
  const slug = String(formData.get('slug') ?? '')
    .trim()
    .toLowerCase()
  const ownerEmail = String(formData.get('ownerEmail') ?? '')
    .trim()
    .toLowerCase()
  if (name.length < 2) return back({ error: 'Name: at least 2 characters.' })
  if (!isValidStoreSlug(slug)) {
    return back({ error: 'Address: 3 to 40 lower-case letters, digits and single dashes.' })
  }
  const owner = await backend.auth.getUserByEmail(ownerEmail).catch(() => undefined)
  if (!owner) {
    return back({ error: `No admin account for ${ownerEmail}: they must sign up first.` })
  }

  const storeRef = backend.db.collection(CollectionsName.Stores).doc()
  const slugRef = backend.db.collection(CollectionsName.StoreSlugs).doc(slug)
  const now = new Date().toISOString()
  const taken = await backend.db.runTransaction(async tx => {
    if ((await tx.get(slugRef)).exists) return true
    tx.create(slugRef, { storeId: storeRef.id })
    tx.create(storeRef, {
      name,
      slug,
      ownerUid: owner.uid,
      status: StoreStatus.PENDING,
      plan: StorePlan.FREE,
      paidUntil: null,
      marketplaceListed: true,
      settings: defaultStoreSettings(),
      createdAt: now,
      updatedAt: now,
    } satisfies Store)
    tx.create(backend.db.collection(CollectionsName.StoreSecrets).doc(storeRef.id), {
      metaCapiTokens: {},
      flockWebhookUrl: null,
    } satisfies StoreSecrets)
    tx.set(
      backend.db.collection(CollectionsName.Memberships).doc(membershipId(storeRef.id, owner.uid)),
      {
        storeId: storeRef.id,
        uid: owner.uid,
        role: StoreRole.OWNER,
        email: ownerEmail,
        createdAt: now,
      } satisfies Membership,
    )
    return false
  })
  if (taken) return back({ error: `The address ${slug} is already taken.` })
  revalidatePath('/platform')
  back({ saved: `${name} created (pending payment).` })
}

/** Cash received: logs the payment, moves paidUntil forward and activates the store. */
export async function recordCashPayment(formData: FormData) {
  const admin = await requirePlatformAdmin()
  const storeId = String(formData.get('storeId') ?? '')
  const amount = Number(formData.get('amount'))
  const months = Number(formData.get('months'))
  const note = String(formData.get('note') ?? '').trim() || null
  if (!(amount > 0) || !Number.isInteger(amount)) {
    return back({ error: 'Amount: a whole number of FCFA.' })
  }
  if (!Number.isInteger(months) || months < 1 || months > 24) {
    return back({ error: 'Months: 1 to 24.' })
  }
  const storeRef = backend.db.collection(CollectionsName.Stores).doc(storeId)
  const paidUntil = await backend.db.runTransaction(async tx => {
    const store = await tx.get(storeRef)
    if (!store.exists) return undefined
    const until = extendPaidUntil(store.get('paidUntil'), months)
    const now = new Date().toISOString()
    tx.create(backend.db.collection(CollectionsName.StorePayments).doc(), {
      storeId,
      amount,
      method: 'cash',
      periodMonths: months,
      paidUntil: until,
      recordedBy: admin.email ?? admin.uid,
      note,
      createdAt: now,
    } satisfies StorePayment)
    tx.update(storeRef, { paidUntil: until, status: StoreStatus.ACTIVE, updatedAt: now })
    return until
  })
  if (!paidUntil) return back({ error: 'Store not found.' })
  await revalidateStorefront(storeId)
  revalidatePath('/platform')
  back({ saved: `Payment recorded, paid until ${paidUntil.slice(0, 10)}.` })
}

/** Status, plan and marketplace listing, set by hand. */
export async function updateStoreFlags(formData: FormData) {
  await requirePlatformAdmin()
  const storeRef = backend.db
    .collection(CollectionsName.Stores)
    .doc(String(formData.get('storeId') ?? ''))
  if (!(await storeRef.get()).exists) return back({ error: 'Store not found.' })
  const changes: Partial<Store> = {}
  const status = formData.get('status')
  if (status !== null) {
    if (!Object.values(StoreStatus).includes(status as StoreStatus)) {
      return back({ error: 'Unknown status.' })
    }
    changes.status = status as StoreStatus
  }
  const plan = formData.get('plan')
  if (plan !== null) {
    if (!Object.values(StorePlan).includes(plan as StorePlan))
      return back({ error: 'Unknown plan.' })
    changes.plan = plan as StorePlan
  }
  const listed = formData.get('marketplaceListed')
  if (listed !== null) changes.marketplaceListed = listed === 'true'
  await storeRef.update({ ...changes, updatedAt: new Date().toISOString() })
  await revalidateStorefront(storeRef.id)
  revalidatePath('/platform')
  back({ saved: 'Saved.' })
}

export async function getPayments(storeId: string) {
  await requirePlatformAdmin()
  const snapshot = await backend.db
    .collection(CollectionsName.StorePayments)
    .where('storeId', '==', storeId)
    .get()
  return snapshot.docs
    .map(doc => doc.data() as StorePayment)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/** A store's products, for the marketplace moderation page (/platform/products). */
export async function listStoreProductsForPlatform(storeId: string) {
  await requirePlatformAdmin()
  const [store, products] = await Promise.all([
    backend.db.collection(CollectionsName.Stores).doc(storeId).get(),
    backend.db
      .collection(CollectionsName.Products)
      .where('storeId', '==', storeId)
      .select('title', 'slug', 'status', 'marketplaceListed')
      .get(),
  ])
  if (!store.exists) return undefined
  return {
    name: store.get('name') as string,
    products: products.docs
      .map(doc => ({
        id: doc.id,
        title: String(doc.get('title') ?? ''),
        slug: String(doc.get('slug') ?? ''),
        status: String(doc.get('status') ?? ''),
        listed: doc.get('marketplaceListed') === true,
      }))
      .sort((a, b) => a.title.localeCompare(b.title)),
  }
}

/**
 * Hides a product from the marketplace, or lists it again. The store can't change it (tenant.ts
 * locks marketplaceListed); its own storefront keeps showing the product.
 */
export async function setProductListed(formData: FormData) {
  await requirePlatformAdmin()
  const productId = String(formData.get('productId') ?? '')
  const ref = /^[\w-]{1,200}$/.test(productId)
    ? backend.db.collection(CollectionsName.Products).doc(productId)
    : undefined
  const product = ref && (await ref.get())
  if (!product?.exists) return back({ error: 'Product not found.' })
  const storeId = product.get('storeId') as string
  await ref!.update({
    marketplaceListed: formData.get('listed') === 'true',
    updatedAt: new Date().toISOString(),
  })
  await revalidateStorefront(storeId)
  redirect(`/platform/products?store=${encodeURIComponent(storeId)}&saved=1`)
}
