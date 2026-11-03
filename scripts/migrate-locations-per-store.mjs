#!/usr/bin/env node
// Phase 2 migration (docs/MULTI_TENANT_PLAN.md, item 7): each store gets its own locations.
// Run after migrate-multi-tenant.mjs (it reads the shipments' and promotions' storeId).
// Dry run by default; --apply writes. Safe to run again: a location that has a storeId is
// never touched, and copies have a fixed id (<location id>_<store id>).
//
//   FIRESTORE_EMULATOR_HOST=127.0.0.1:8085 node scripts/migrate-locations-per-store.mjs
//   node scripts/migrate-locations-per-store.mjs --env nature_gift_admin/.env | --service-account key.json
//        [--default-store <storeId>] [--apply]
//
// A location used by one store (in its shipments, or its promotions' LOCATION conditions)
// gets that store's id. A location used by several stores stays with one of them (the
// default store if it is one, else the first by id) and is copied for each of the others,
// whose shipments and promotions are rewritten to the copy. An unused location goes to
// --default-store (the store that had them all before, N.Gift); without it, none is moved.
import { arg, connect, flag } from './lib/firebase-admin.mjs'

const APPLY = flag('apply')
const DEFAULT_STORE = arg('default-store')
const BATCH = 400

const { db, target } = connect()
console.log(`${APPLY ? 'APPLY' : 'DRY RUN'} on ${target}\n`)

const read = async name => (await db.collection(name).get()).docs
const [stores, locations, shipments, promotions] = await Promise.all(
  ['stores', 'locations', 'shipments', 'promotions'].map(read),
)
const storeIds = new Set(stores.map(d => d.id))
if (DEFAULT_STORE && !storeIds.has(DEFAULT_STORE)) {
  console.error(`--default-store ${DEFAULT_STORE}: no such store`)
  process.exit(1)
}

/** Ids in a LOCATION condition: a JSON list, or comma-separated (older promotions). */
const parseIds = value => {
  try {
    const list = JSON.parse(value)
    if (Array.isArray(list)) return list.map(String)
  } catch {}
  return String(value ?? '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean)
}
const locationConditions = doc =>
  (doc.get('conditions') ?? []).filter(c => c.type === 'LOCATION')

// Which stores use each location.
const users = new Map()
const use = (id, storeId) => {
  if (!storeId || !storeIds.has(storeId)) return
  if (!users.has(id)) users.set(id, new Set())
  users.get(id).add(storeId)
}
for (const s of shipments) for (const id of s.get('locationIds') ?? []) use(id, s.get('storeId'))
for (const p of promotions) {
  for (const c of locationConditions(p)) parseIds(c.value).forEach(id => use(id, p.get('storeId')))
}

const assigned = [] // [locationRef, storeId]
const copies = [] // [newRef, data]
const unused = []
for (const loc of locations) {
  if (loc.get('storeId')) continue
  const by = [...(users.get(loc.id) ?? [])].sort()
  if (by.length === 0) {
    if (DEFAULT_STORE) assigned.push([loc.ref, DEFAULT_STORE])
    else unused.push(loc.ref.path)
    continue
  }
  const owner = DEFAULT_STORE && by.includes(DEFAULT_STORE) ? DEFAULT_STORE : by[0]
  assigned.push([loc.ref, owner])
  for (const storeId of by.filter(s => s !== owner)) {
    const copyId = `${loc.id}_${storeId}`
    if (!locations.some(l => l.id === copyId)) {
      copies.push([db.collection('locations').doc(copyId), { ...loc.data(), storeId }])
    }
  }
}

// Shipments and promotions pointing at another store's location that has a copy for their
// own store (made now, or by an interrupted earlier run) move to the copy.
const storeOf = new Map(locations.map(l => [l.id, l.get('storeId')]))
assigned.forEach(([ref, storeId]) => storeOf.set(ref.id, storeId))
const copyIds = new Set([...locations.map(l => l.id), ...copies.map(([ref]) => ref.id)])
const renamed = (storeId, id) =>
  storeOf.get(id) && storeOf.get(id) !== storeId && copyIds.has(`${id}_${storeId}`)
    ? `${id}_${storeId}`
    : id
const rewrites = []
for (const s of shipments) {
  const ids = s.get('locationIds') ?? []
  const next = ids.map(id => renamed(s.get('storeId'), id))
  if (next.some((id, i) => id !== ids[i])) rewrites.push([s.ref, { locationIds: next }])
}
for (const p of promotions) {
  const conditions = p.get('conditions') ?? []
  let changed = false
  const next = conditions.map(c => {
    if (c.type !== 'LOCATION') return c
    const ids = parseIds(c.value)
    const moved = ids.map(id => renamed(p.get('storeId'), id))
    if (moved.every((id, i) => id === ids[i])) return c
    changed = true
    return { ...c, value: JSON.stringify(moved) }
  })
  if (changed) rewrites.push([p.ref, { conditions: next }])
}

console.log(`Locations given a store: ${assigned.length}`)
assigned.forEach(([ref, storeId]) => console.log(`  ${ref.path} → ${storeId}`))
console.log(`Locations copied for another store: ${copies.length}`)
copies.forEach(([ref, data]) => console.log(`  ${ref.path} (${data.name}) → ${data.storeId}`))
console.log(`Shipments and promotions rewritten to their copy: ${rewrites.length}`)
rewrites.forEach(([ref]) => console.log(`  ${ref.path}`))
console.log(`Unused, left without a store (add --default-store <id>): ${unused.length}`)
unused.forEach(p => console.log(`  ${p}`))

if (!APPLY) {
  console.log('\nDry run: nothing written. Add --apply to write.')
  process.exit(0)
}

const now = new Date().toISOString()
// Copies first: a rewritten shipment never points at a location that doesn't exist yet.
const writes = [
  ...copies.map(([ref, data]) => [ref, { ...data, updatedAt: now }, 'set']),
  ...assigned.map(([ref, storeId]) => [ref, { storeId, updatedAt: now }, 'update']),
  ...rewrites.map(([ref, data]) => [ref, { ...data, updatedAt: now }, 'update']),
]
for (let i = 0; i < writes.length; i += BATCH) {
  const batch = db.batch()
  for (const [ref, data, kind] of writes.slice(i, i + BATCH)) {
    if (kind === 'set') batch.set(ref, data)
    else batch.update(ref, data)
  }
  await batch.commit()
  console.log(`  wrote ${Math.min(i + BATCH, writes.length)}/${writes.length}`)
}
console.log('\nDone.')
process.exit(0)
