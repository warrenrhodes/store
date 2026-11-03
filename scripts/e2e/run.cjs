// End-to-end checks against the Firebase emulators, run by run.sh inside
// `firebase emulators:exec` (never a real project). Steps:
//   1. builds both apps (skip with E2E_SKIP_BUILD=1) with the safe environment of env.cjs;
//   2. seeds a pre-migration database (seed.cjs) and runs both migrations (stores, then
//      locations per store): dry run, apply, and apply again, which must change nothing;
//   3. starts the built servers (store :3101, admin :3102) and runs the marketplace checks,
//      the admin store-isolation and form checks, then the per-store storefront checks
//      (site-checks.cjs, phase 2), the theme checks (theme-checks.cjs, phase 3) and the
//      marketplace checks (market-checks.cjs, phase 4) and the commerce checks
//      (commerce-checks.cjs, phase 5).
//      E2E_KEEP_OPEN=1 leaves everything running.
// The production builds are used, not `next dev`, and go to .next-e2e (not .next), so the
// checks can run in a checkout where your own dev servers are running.
const assert = require('node:assert/strict')
const { execFileSync, spawn } = require('node:child_process')
const fs = require('node:fs')
const http = require('node:http')
const path = require('node:path')
const { env, STORE_PORT, ADMIN_PORT, META_PORT } = require('./env.cjs')
const seed = require('./seed.cjs')
const storeChecks = require('./store-checks.cjs')
const adminChecks = require('./admin-checks.cjs')
const formChecks = require('./form-checks.cjs')
const siteChecks = require('./site-checks.cjs')
const themeChecks = require('./theme-checks.cjs')
const marketChecks = require('./market-checks.cjs')
const commerceChecks = require('./commerce-checks.cjs')

if (!process.env.FIRESTORE_EMULATOR_HOST || !process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  throw new Error('Run through scripts/e2e/run.sh: the emulators must be up, never a real project.')
}

const ROOT = path.resolve(__dirname, '../..')
const STORE_APP = path.join(ROOT, 'nature_gift_store')
const ADMIN_APP = path.join(ROOT, 'nature_gift_admin')
const admin = require(require.resolve('firebase-admin', { paths: [STORE_APP] }))
admin.initializeApp({ projectId: 'demo-nature-gift' })
const db = admin.firestore()

function build(app) {
  console.log(`Building ${path.basename(app)}…`)
  for (let attempt = 1; ; attempt++) {
    try {
      execFileSync('npm', ['run', 'build'], {
        cwd: app,
        env,
        stdio: ['ignore', 'ignore', 'pipe'],
        encoding: 'utf8',
      })
      break
    } catch (e) {
      // Google Fonts sometimes answers with URLs next/font can't read: try again.
      if (attempt < 3 && String(e.stderr).includes('next/font')) {
        console.log(`  next/font failed (Google Fonts), build attempt ${attempt + 1}…`)
        continue
      }
      process.stderr.write(String(e.stderr))
      throw e
    }
  }
  // What App Hosting does after the build: static files next to the standalone server.
  const out = path.join(app, env.E2E_DIST_DIR, 'standalone')
  fs.cpSync(path.join(app, env.E2E_DIST_DIR, 'static'), path.join(out, env.E2E_DIST_DIR, 'static'), {
    recursive: true,
  })
  if (fs.existsSync(path.join(app, 'public'))) {
    fs.cpSync(path.join(app, 'public'), path.join(out, 'public'), { recursive: true })
  }
}

async function start(app, port) {
  const server = spawn('node', [path.join(env.E2E_DIST_DIR, 'standalone/server.js')], {
    cwd: app,
    env: { ...env, PORT: port, HOSTNAME: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
  })
  let log = ''
  server.stdout.on('data', d => (log += d))
  server.stderr.on('data', d => (log += d))
  const url = `http://localhost:${port}`
  for (let i = 0; i < 60; i++) {
    if (server.exitCode !== null) throw new Error(`${app} exited:\n${log}`)
    try {
      await fetch(`${url}/robots.txt`)
      return { url, stop: () => process.kill(-server.pid), log: () => log }
    } catch {
      await new Promise(r => setTimeout(r, 500))
    }
  }
  process.kill(-server.pid)
  throw new Error(`${app} not up on ${url}:\n${log}`)
}

const script = name => (...args) =>
  execFileSync('node', [path.join(ROOT, 'scripts', name), ...args], {
    env: process.env,
    encoding: 'utf8',
  })
const migrate = script('migrate-multi-tenant.mjs')
const migrateLocations = script('migrate-locations-per-store.mjs')

/** Conversions API calls the storefront makes (META_GRAPH_URL points here, never at Meta). */
const metaCalls = []
const graph = http.createServer((req, res) => {
  let body = ''
  req.on('data', d => (body += d))
  req.on('end', () => {
    metaCalls.push({ url: req.url, body: JSON.parse(body || '{}') })
    res.setHeader('Content-Type', 'application/json')
    res.end('{"events_received":1}')
  })
})

/** Every document of the collections the migration touches, to compare two runs. */
async function snapshot() {
  const names = [
    'products',
    'categories',
    'blogs',
    'shipments',
    'promotions',
    'reviews',
    'orders',
    'checkouts',
    'stores',
    'storeSlugs',
    'storeSecrets',
    'memberships',
  ]
  const all = {}
  for (const name of names) {
    for (const doc of (await db.collection(name).get()).docs) all[doc.ref.path] = doc.data()
  }
  return all
}

async function migrationChecks() {
  const dry = migrate()
  assert.match(dry, /DRY RUN/)
  assert.match(dry, /Stores to create: 2/)
  assert.match(dry, /several vendors \(kept in the first one's store\): 1\n {2}orders\/order-ab/)
  assert.equal((await db.collection('stores').get()).size, 0, 'the dry run wrote nothing')
  console.log(
    '✔ migration dry run: 2 stores to create, 1 multi-vendor order listed, nothing written',
  )

  migrate('--apply', '--map', 'admin-uid=nature-gift,N.Gift')
  const first = await snapshot()
  assert.equal(first['stores/admin-uid'].slug, 'nature-gift')
  assert.equal(first['stores/admin-uid'].status, 'active')
  assert.equal(first['stores/vendor-b'].slug, 'boutique-bertrand')
  assert.equal(first['storeSlugs/nature-gift'].storeId, 'admin-uid')
  assert.equal(first['memberships/vendor-b_vendor-b'].role, 'owner')
  assert.equal(first['products/b-miel'].storeId, 'vendor-b')
  assert.equal(first['products/cafe'].marketplaceListed, true)
  assert.equal(first['reviews/order-b_b-miel'].storeId, 'vendor-b')
  assert.equal(first['orders/order-ab'].storeId, 'admin-uid')
  assert.equal(first['checkouts/chk-b'].storeId, 'vendor-b')
  console.log('✔ migration applied: stores, slugs, owners, storeId on every document')

  const again = migrate('--apply')
  assert.match(again, /Stores to create: 0/)
  assert.match(again, /Documents to update: 0/)
  assert.deepEqual(await snapshot(), first)
  console.log('✔ migration run twice: the second run changes nothing\n')
}

async function locationMigrationChecks() {
  const docs = async name =>
    Object.fromEntries((await db.collection(name).get()).docs.map(d => [d.id, d.data()]))
  const before = await docs('locations')
  const dry = migrateLocations()
  assert.match(dry, /DRY RUN/)
  assert.match(dry, /copied for another store: 1\n {2}locations\/akwa_vendor-b \(Akwa\) → vendor-b/)
  assert.match(dry, /rewritten to their copy: 2\n {2}shipments\/z-b\n {2}promotions\/p-b-akwa/)
  assert.match(dry, /Unused, left without a store \(add --default-store <id>\): 1\n {2}locations\/unused-loc/)
  assert.deepEqual(await docs('locations'), before, 'the dry run wrote nothing')
  console.log('✔ locations dry run: Akwa (A and B) to copy for B, 2 references, 1 unused, nothing written')

  migrateLocations('--apply', '--default-store', 'admin-uid')
  const locations = await docs('locations')
  const storeOf = id => locations[id]?.storeId
  assert.deepEqual(
    ['mendong', 'etoudi', 'akwa', 'unused-loc', 'bonamoussadi', 'akwa_vendor-b'].map(storeOf),
    ['admin-uid', 'admin-uid', 'admin-uid', 'admin-uid', 'vendor-b', 'vendor-b'],
  )
  assert.equal(locations['akwa_vendor-b'].name, 'Akwa')
  assert.deepEqual((await db.doc('shipments/z-b').get()).get('locationIds'), [
    'bonamoussadi',
    'akwa_vendor-b',
  ])
  assert.deepEqual((await db.doc('shipments/z-dla').get()).get('locationIds'), ['akwa'])
  assert.equal(
    (await db.doc('promotions/p-b-akwa').get()).get('conditions')[0].value,
    '["akwa_vendor-b"]',
  )
  console.log("✔ locations applied: each store owns its own, B's zone and promotion use B's copy")

  const snap = async () => ({
    locations: await docs('locations'),
    shipments: await docs('shipments'),
    promotions: await docs('promotions'),
  })
  const first = await snap()
  const again = migrateLocations('--apply', '--default-store', 'admin-uid')
  assert.match(again, /given a store: 0/)
  assert.match(again, /copied for another store: 0/)
  assert.match(again, /rewritten to their copy: 0/)
  assert.deepEqual(await snap(), first)
  console.log('✔ locations migration run twice: the second run changes nothing\n')
}

;(async () => {
  if (!process.env.E2E_SKIP_BUILD) {
    build(STORE_APP)
    build(ADMIN_APP)
  }
  await seed(admin)
  await migrationChecks()
  await locationMigrationChecks()
  await new Promise(resolve => graph.listen(META_PORT, '127.0.0.1', resolve))
  // Staff member of A (the Team page would create the same document).
  await db.doc('memberships/admin-uid_staff-a').set({
    storeId: 'admin-uid',
    uid: 'staff-a',
    role: 'staff',
    email: 'staff@test.cm',
    createdAt: new Date().toISOString(),
  })

  const servers = await Promise.all([start(STORE_APP, STORE_PORT), start(ADMIN_APP, ADMIN_PORT)])
  try {
    await storeChecks({ db, STORE: servers[0].url })
    await adminChecks({
      db,
      ADMIN: servers[1].url,
      AUTH_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
      apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    })
    await formChecks({
      db,
      admin,
      ADMIN: servers[1].url,
      AUTH_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
      apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
      ADMIN_APP,
    })
    await siteChecks({
      db,
      STORE: servers[0].url,
      ADMIN: servers[1].url,
      AUTH_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
      apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
      revalidateSecret: env.REVALIDATE_SECRET,
      metaCalls,
    })
    await themeChecks({
      db,
      STORE: servers[0].url,
      ADMIN: servers[1].url,
      AUTH_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
      apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
      ADMIN_APP,
      STORE_APP,
      revalidateSecret: env.REVALIDATE_SECRET,
    })
    await marketChecks({
      db,
      STORE: servers[0].url,
      ADMIN: servers[1].url,
      AUTH_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
      apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
      ADMIN_APP,
      metaCalls,
    })
    await commerceChecks({
      db,
      STORE: servers[0].url,
      ADMIN: servers[1].url,
      AUTH_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
      apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
      ADMIN_APP,
    })
    if (process.env.E2E_KEEP_OPEN) {
      // For trying things by hand: accounts in seed.cjs, password Test1234!.
      console.log(`Kept open: store ${servers[0].url}, admin ${servers[1].url}. Ctrl-C to stop.`)
      await new Promise(() => {})
    }
  } catch (e) {
    for (const s of servers) console.error(s.log().split('\n').slice(-30).join('\n'))
    throw e
  } finally {
    servers.forEach(s => s.stop())
    graph.close()
    // ~1.5 GB with the standalone node_modules: left in place, it slows the `next dev`
    // (Turbopack watches from the repo root). E2E_SKIP_BUILD then needs a new build.
    for (const app of [STORE_APP, ADMIN_APP]) {
      fs.rmSync(path.join(app, env.E2E_DIST_DIR), { recursive: true, force: true })
    }
  }
  console.log('All e2e checks passed')
  process.exit(0)
})().catch(e => {
  console.error('✘', e.message)
  process.exit(1)
})
