// End-to-end checks against the Firebase emulators, run by run.sh inside
// `firebase emulators:exec` (never a real project). Steps:
//   1. builds both apps (skip with E2E_SKIP_BUILD=1) with the safe environment of env.cjs;
//   2. seeds a pre-migration database (seed.cjs) and runs the migration: dry run, apply, and
//      apply again, which must change nothing;
//   3. starts the built servers (store :3101, admin :3102) and runs the storefront checks,
//      then the admin store-isolation and form checks. E2E_KEEP_OPEN=1 leaves everything running.
// The production builds are used, not `next dev`, and go to .next-e2e (not .next), so the
// checks can run in a checkout where your own dev servers are running.
const assert = require('node:assert/strict')
const { execFileSync, spawn } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const { env, STORE_PORT, ADMIN_PORT } = require('./env.cjs')
const seed = require('./seed.cjs')
const storeChecks = require('./store-checks.cjs')
const adminChecks = require('./admin-checks.cjs')
const formChecks = require('./form-checks.cjs')

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
  execFileSync('npm', ['run', 'build'], { cwd: app, env, stdio: ['ignore', 'ignore', 'inherit'] })
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

const migrate = (...args) =>
  execFileSync('node', [path.join(ROOT, 'scripts/migrate-multi-tenant.mjs'), ...args], {
    env: process.env,
    encoding: 'utf8',
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

;(async () => {
  if (!process.env.E2E_SKIP_BUILD) {
    build(STORE_APP)
    build(ADMIN_APP)
  }
  await seed(admin)
  await migrationChecks()
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
