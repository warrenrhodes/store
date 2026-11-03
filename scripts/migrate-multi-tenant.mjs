#!/usr/bin/env node
// Phase 1 migration (docs/MULTI_TENANT_PLAN.md): one store per existing vendor, and `storeId`
// on every store document. Dry run by default; --apply writes. Safe to run again: existing
// stores and storeId values are never overwritten.
//
//   FIRESTORE_EMULATOR_HOST=127.0.0.1:8085 node scripts/migrate-multi-tenant.mjs
//   node scripts/migrate-multi-tenant.mjs --env nature_gift_admin/.env | --service-account key.json [--apply]
//        [--map <uid>=<slug>,<Store name>]...
//
// A migrated store has the vendor's uid as its id, is `active`, listed on the marketplace,
// and its owner is that vendor.
import { arg, connect, flag } from './lib/firebase-admin.mjs'

const APPLY = flag('apply')
const BATCH = 400
const BY_CREATOR = ['products', 'categories', 'blogs', 'shipments', 'promotions']
const BY_PARTNER = ['orders', 'checkouts']

// --map uid=slug,Name (repeatable)
const maps = new Map()
process.argv.forEach((a, i) => {
  if (a !== '--map') return
  const [uid, rest = ''] = process.argv[i + 1].split('=')
  const [slug, ...name] = rest.split(',')
  maps.set(uid, { slug, name: name.join(',').trim() || undefined })
})

const slugify = text =>
  (text ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '')

const { admin, db, target } = connect()
console.log(`${APPLY ? 'APPLY' : 'DRY RUN'} on ${target}\n`)

const read = async name => (await db.collection(name).get()).docs
const docs = Object.fromEntries(
  await Promise.all([...BY_CREATOR, 'reviews', ...BY_PARTNER].map(async c => [c, await read(c)])),
)
const partnerUid = doc => (doc.get('partnersPaths') ?? [])[0]?.split('/')[1]

// 1. Vendors: every creator and order partner.
const vendors = new Set()
for (const c of BY_CREATOR)
  docs[c].forEach(d => d.get('creatorId') && vendors.add(d.get('creatorId')))
for (const c of BY_PARTNER) docs[c].forEach(d => partnerUid(d) && vendors.add(partnerUid(d)))

const storeIds = new Set((await read('stores')).map(d => d.id))
const slugs = new Set((await read('storeSlugs')).map(d => d.id))
const newStores = []
for (const uid of vendors) {
  if (storeIds.has(uid)) continue
  const user = (await db.doc(`users/${uid}`).get()).data()
  const auth = await admin
    .auth()
    .getUser(uid)
    .catch(() => undefined)
  const email = (user?.email ?? auth?.email ?? '').toLowerCase() || null
  const map = maps.get(uid)
  const name = map?.name ?? user?.fullName ?? auth?.displayName ?? email?.split('@')[0] ?? uid
  let base = map?.slug ?? slugify(name)
  if (base.length < 3) base = `boutique-${uid.slice(0, 6).toLowerCase()}`
  let slug = base
  for (let n = 2; slugs.has(slug); n++) slug = `${base}-${n}`
  if (map?.slug && slug !== map.slug) {
    console.error(`--map ${uid}: the address ${map.slug} is already taken`)
    process.exit(1)
  }
  slugs.add(slug)
  newStores.push({ uid, name, slug, email })
}

// 2. storeId on documents that have none.
const known = new Set([...storeIds, ...newStores.map(s => s.uid)])
const productCreator = new Map(docs.products.map(d => [d.ref.path, d.get('creatorId')]))
const updates = []
const orphans = []
const multiVendor = []
const plan = (doc, storeId, extra = {}) => {
  if (doc.get('storeId')) {
    if (Object.keys(extra).length) updates.push([doc.ref, extra])
    return
  }
  if (!storeId || !known.has(storeId)) return orphans.push(doc.ref.path)
  updates.push([doc.ref, { storeId, ...extra }])
}
for (const c of BY_CREATOR) {
  for (const d of docs[c]) {
    const extra =
      c === 'products' && d.get('marketplaceListed') === undefined
        ? { marketplaceListed: true }
        : {}
    plan(d, d.get('creatorId'), extra)
  }
}
for (const d of docs.reviews) {
  plan(d, d.get('creatorId') ?? productCreator.get(d.get('productPath')))
}
for (const c of BY_PARTNER) {
  for (const d of docs[c]) {
    if (new Set(d.get('partnersPaths') ?? []).size > 1) multiVendor.push(d.ref.path)
    plan(d, partnerUid(d))
  }
}

console.log(`Stores to create: ${newStores.length}`)
newStores.forEach(s =>
  console.log(`  ${s.uid} → /boutique/${s.slug} "${s.name}" (${s.email ?? 'no email'})`),
)
console.log(`Documents to update: ${updates.length}`)
for (const c of [...BY_CREATOR, 'reviews', ...BY_PARTNER]) {
  const n = updates.filter(([ref]) => ref.parent.id === c).length
  if (n) console.log(`  ${c}: ${n}`)
}
console.log(
  `Orders/checkouts with several vendors (kept in the first one's store): ${multiVendor.length}`,
)
multiVendor.forEach(p => console.log(`  ${p}`))
console.log(`Without a vendor (left as is): ${orphans.length}`)
orphans.forEach(p => console.log(`  ${p}`))

if (!APPLY) {
  console.log('\nDry run: nothing written. Add --apply to write.')
  process.exit(0)
}

const now = new Date().toISOString()
const writes = [
  ...newStores.flatMap(s => [
    [
      db.doc(`stores/${s.uid}`),
      {
        name: s.name,
        slug: s.slug,
        ownerUid: s.uid,
        status: 'active',
        plan: 'free',
        paidUntil: null,
        marketplaceListed: true,
        settings: {
          whatsapp: null,
          contactEmail: s.email,
          currency: 'XAF',
          gtmIds: [],
          metaPixelIds: [],
          notificationEmails: [],
          notificationPhones: [],
        },
        createdAt: now,
        updatedAt: now,
      },
      'create',
    ],
    [db.doc(`storeSlugs/${s.slug}`), { storeId: s.uid }, 'create'],
    [db.doc(`storeSecrets/${s.uid}`), { metaCapiTokens: {}, flockWebhookUrl: null }, 'create'],
    [
      db.doc(`memberships/${s.uid}_${s.uid}`),
      { storeId: s.uid, uid: s.uid, role: 'owner', email: s.email, createdAt: now },
      'set',
    ],
  ]),
  ...updates.map(([ref, data]) => [ref, data, 'update']),
]
for (let i = 0; i < writes.length; i += BATCH) {
  const batch = db.batch()
  for (const [ref, data, kind] of writes.slice(i, i + BATCH)) {
    if (kind === 'create') batch.create(ref, data)
    else if (kind === 'set') batch.set(ref, data, { merge: true })
    else batch.update(ref, data)
  }
  await batch.commit()
  console.log(`  wrote ${Math.min(i + BATCH, writes.length)}/${writes.length}`)
}
console.log('\nDone.')
process.exit(0)
