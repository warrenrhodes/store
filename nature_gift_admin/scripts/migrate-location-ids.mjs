// Gives every shipment location a stable id and points LOCATION promotion conditions at
// those ids instead of names. Safe to run several times.
//
//   node scripts/migrate-location-ids.mjs .env             # dry run: shows what would change
//   node scripts/migrate-location-ids.mjs .env --apply     # writes the changes
//
// Before: shipments.locations = ['Yaounde Medong']       promotion LOCATION value = '["Yaounde Medong"]'
// After:  shipments.locations = [{ id, name }]           promotion LOCATION value = '["<id>"]'
import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'
import admin from 'firebase-admin'

const [envFile, flag] = process.argv.slice(2)
if (!envFile) {
  console.error('Usage: node scripts/migrate-location-ids.mjs <env file> [--apply]')
  process.exit(1)
}
const apply = flag === '--apply'

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

// 1. Shipments: plain names -> { id, name }. Remember name -> new ids for the promotions.
const idsByName = new Map()
for (const doc of (await db.collection('shipments').get()).docs) {
  const locations = doc.get('locations') ?? []
  if (!locations.some(l => typeof l === 'string')) continue
  const migrated = locations.map(l => {
    if (typeof l !== 'string') return l
    const id = randomUUID()
    idsByName.set(l, [...(idsByName.get(l) ?? []), id])
    return { id, name: l }
  })
  console.log(`shipment ${doc.id}:`, migrated.map(l => `${l.name} -> ${l.id}`).join(', '))
  batch.update(doc.ref, { locations: migrated })
  writes++
}

// 2. Promotions: LOCATION condition names -> ids (values already holding ids are kept).
for (const doc of (await db.collection('promotions').get()).docs) {
  const conditions = doc.get('conditions') ?? []
  let changed = false
  const migrated = conditions.map(c => {
    if (c.type !== 'LOCATION') return c
    const values = parseList(c.value)
    const ids = values.flatMap(v => idsByName.get(v) ?? [v])
    if (ids.join() === values.join()) return c
    changed = true
    return { ...c, value: JSON.stringify(ids) }
  })
  if (!changed) continue
  console.log(`promotion ${doc.id} (${doc.get('code')}): LOCATION conditions moved to ids`)
  batch.update(doc.ref, { conditions: migrated })
  writes++
}

if (writes === 0) console.log('Nothing to migrate.')
else if (apply) {
  await batch.commit()
  console.log(`\n${writes} document(s) updated.`)
} else console.log(`\n${writes} document(s) would change. Re-run with --apply to write.`)
process.exit(0)
