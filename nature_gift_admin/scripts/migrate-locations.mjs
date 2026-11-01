// Moves delivery areas out of shipments into the `locations` collection. Safe to run twice.
//
//   node scripts/migrate-locations.mjs .env                         # dry run: shows what would change
//   node scripts/migrate-locations.mjs .env --apply                 # writes the changes
//   node scripts/migrate-locations.mjs .env --apply --city=Yaoundé  # city for the new locations
//
// Before: shipments/{id}.locations = ['Mendong', ...]  (or [{ id, name }])
//         promotion LOCATION value  = '["Mendong"]'     (names, or the ids above)
// After:  locations/{id} = { name, city, isActive }
//         shipments/{id}.locationIds = [id, ...]        promotion LOCATION value = '["<id>"]'
//
// Without --city the city is left empty: fill it in the admin (Locations page).
import { readFileSync } from 'node:fs'
import admin from 'firebase-admin'

const [envFile, ...flags] = process.argv.slice(2)
if (!envFile) {
  console.error('Usage: node scripts/migrate-locations.mjs <env file> [--apply] [--city=<name>]')
  process.exit(1)
}
const apply = flags.includes('--apply')
const city = flags.find(f => f.startsWith('--city='))?.slice('--city='.length) ?? ''

const env = {}
for (const m of readFileSync(envFile, 'utf8').matchAll(/^([A-Z_]+)=(?:"([\s\S]*?)"|(.*))$/gm)) {
  env[m[1]] = m[2] ?? m[3]
}
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
})
const db = admin.firestore()

const parseList = value => {
  let parsed = value
  try {
    parsed = JSON.parse(value)
  } catch {}
  return (Array.isArray(parsed) ? parsed : [parsed]).filter(v => v !== '' && v != null).map(String)
}

console.log(`Project: ${env.NEXT_PUBLIC_FIREBASE_PROJECT_ID} — ${apply ? 'APPLY' : 'dry run'}\n`)
// ponytail: one batch (500 writes max) — plenty for a few dozen shipments and promotions.
const batch = db.batch()
let writes = 0
const now = new Date().toISOString()

// 1. Shipments: create one location per distinct name, keep any id already given to it.
const locationIdByName = new Map() // lower-case name -> location id
const newId = new Map() // old reference (name or previous id) -> location id
for (const doc of (await db.collection('shipments').get()).docs) {
  const legacy = doc.get('locations')
  if (!Array.isArray(legacy)) continue
  const locationIds = []
  for (const entry of legacy) {
    const name = (typeof entry === 'string' ? entry : entry.name).trim()
    let id = locationIdByName.get(name.toLowerCase())
    if (!id) {
      id = typeof entry === 'string' ? db.collection('locations').doc().id : entry.id
      locationIdByName.set(name.toLowerCase(), id)
      batch.set(db.collection('locations').doc(id), {
        name,
        city,
        isActive: true,
        creatorId: doc.get('creatorId') ?? '',
        createdAt: now,
        updatedAt: now,
      })
      writes++
      console.log(`location ${id}: ${name}${city ? ` (${city})` : ''}`)
    }
    newId.set(name, id)
    if (typeof entry !== 'string') newId.set(entry.id, id)
    if (!locationIds.includes(id)) locationIds.push(id)
  }
  console.log(`shipment ${doc.id}: ${legacy.length} location(s) -> locationIds`)
  batch.update(doc.ref, { locationIds, locations: admin.firestore.FieldValue.delete() })
  writes++
}

// 2. Promotions: LOCATION conditions -> location ids (ids already current are kept).
for (const doc of (await db.collection('promotions').get()).docs) {
  const conditions = doc.get('conditions') ?? []
  let changed = false
  const migrated = conditions.map(c => {
    if (c.type !== 'LOCATION') return c
    const values = parseList(c.value)
    const ids = [...new Set(values.map(v => newId.get(v) ?? v))]
    if (ids.join() === values.join()) return c
    changed = true
    return { ...c, value: JSON.stringify(ids) }
  })
  if (!changed) continue
  console.log(`promotion ${doc.id} (${doc.get('code')}): LOCATION conditions -> location ids`)
  batch.update(doc.ref, { conditions: migrated })
  writes++
}

if (writes === 0) console.log('Nothing to migrate.')
else if (apply) {
  await batch.commit()
  console.log(`\n${writes} document(s) written.`)
} else console.log(`\n${writes} document(s) would be written. Re-run with --apply to write.`)
process.exit(0)
