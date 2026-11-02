// End-to-end checks of the store API, run by run.sh inside `firebase emulators:exec`:
// seeds the emulators, starts the store on E2E_STORE_PORT (3101) against them, runs the checks.
const assert = require('node:assert/strict')
const { spawn } = require('node:child_process')
const crypto = require('node:crypto')
const path = require('node:path')
const seed = require('./seed.cjs')

if (!process.env.FIRESTORE_EMULATOR_HOST || !process.env.FIREBASE_AUTH_EMULATOR_HOST)
  throw new Error('Run through scripts/e2e/run.sh: the emulators must be up, never a real project.')

const APP = path.resolve(__dirname, '../../nature_gift_store')
const admin = require(require.resolve('firebase-admin', { paths: [APP] }))
admin.initializeApp({ projectId: 'demo-nature-gift' })
const db = admin.firestore()
const PORT = process.env.E2E_STORE_PORT || '3101'
const STORE = `http://localhost:${PORT}`

// Everything that could reach a real service is overridden (an app .env may hold real values).
const { privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' },
})
const storeEnv = {
  ...process.env,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'demo-nature-gift',
  NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
  NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST,
  NEXT_PUBLIC_FIREBASE_API_KEY: 'e2e-fake-api-key',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'demo-nature-gift.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_APP_ID: 'e2e',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: 'e2e',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'demo-nature-gift.appspot.com',
  FIREBASE_CLIENT_EMAIL: 'e2e@demo-nature-gift.iam.gserviceaccount.com',
  FIREBASE_PRIVATE_KEY: privateKey,
  AUTH_COOKIE_SIGNATURE_KEY_CURRENT: crypto.randomBytes(32).toString('hex'),
  AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS: crypto.randomBytes(32).toString('hex'),
  NEXT_PUBLIC_ECOMMERCE_STORE_URL: STORE,
  NEXT_PUBLIC_ADMIN_DASHBOARD_URL: 'http://localhost:3102',
  FLOCK_WEBHOOK_URL: '',
  NEXT_PUBLIC_ADMIN_EMAIL: '',
  NEXT_PUBLIC_ADMIN_PHONE_NUMBER: '',
  NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_ID: '',
  NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_SECRET: '',
  META_PIXEL_ID: '',
  META_CAPI_ACCESS_TOKEN: '',
  META_TEST_EVENT_CODE: '',
  NEXT_PUBLIC_FACEBOOK_PIXEL_ID: '',
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: '',
  DATABASE_URL: '',
  NEXT_TELEMETRY_DISABLED: '1',
}

async function startStore() {
  // E2E_STANDALONE=1: the production server from `npm run build`, instead of `next dev`.
  // --webpack: Turbopack refuses node_modules symlinked from outside the folder (worktrees).
  const [cmd, args] = process.env.E2E_STANDALONE
    ? ['node', ['.next/standalone/server.js']]
    : ['npx', ['next', 'dev', '--webpack', '-p', PORT]]
  const server = spawn(cmd, args, {
    cwd: APP,
    env: { ...storeEnv, PORT },
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
  })
  let log = ''
  server.stdout.on('data', d => (log += d))
  server.stderr.on('data', d => (log += d))
  for (let i = 0; i < 180; i++) {
    if (server.exitCode !== null) throw new Error(`store exited:\n${log}`)
    try {
      await fetch(`${STORE}/robots.txt`)
      return { stop: () => process.kill(-server.pid), log: () => log }
    } catch {
      await new Promise(r => setTimeout(r, 1000))
    }
  }
  process.kill(-server.pid)
  throw new Error(`store not up on ${STORE} after 180 s:\n${log}`)
}

const post = async (path, body) => {
  const res = await fetch(STORE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return { status: res.status, body: await res.json().catch(() => ({})) }
}
const cafe = (quantity = 1) => [{ product: { path: 'products/cafe' }, quantity }]
const mendong = {
  deliveryMethod: 'DELIVERY',
  locationId: 'mendong',
  location: 'Mendong – Marché',
  address: '',
  deliveryDate: new Date().toISOString(),
  deliveryTime: '10:00',
}
const akwa = { ...mendong, locationId: 'akwa', location: 'Akwa' }
const unlisted = { ...mendong, locationId: '', location: '', address: 'Bafoussam centre' }
const user = (phone, fullName = 'Awa Test') => ({ id: '', email: '', fullName, phone })
const order = (deliveryInfo, phone, extra = {}) => ({
  order: { deliveryInfo, userData: user(phone) },
  ...extra,
})
const stock = async () => (await db.doc('products/cafe').get()).get('inventory.stockQuantity')
const uses = async () => (await db.doc('promotions/p-pub').get()).get('usageCount')
let step = 0
const ok = msg => console.log(`✔ ${++step}. ${msg}`)

async function checks() {
  // Preview: city free shipping + code discount, code status reported
  const preview = await post('/api/promotions/calculate', {
    cart: [{ product: { path: 'products/cafe', categories: ['Café'] }, quantity: 1, price: 12000 }],
    shipping: { deliveryMethod: 'DELIVERY', locationId: 'mendong', city: 'Yaoundé', cost: 1500 },
    codes: ['pub-cafe', 'NOPE'],
  })
  assert.equal(preview.status, 200)
  assert.equal(preview.body.total, 10800)
  assert.deepEqual(preview.body.codeStatuses, { 'PUB-CAFE': 'applied', NOPE: 'invalid' })
  ok('preview: free shipping in Yaoundé + PUB-CAFE -10% = 10 800, unknown code flagged')

  // Abandoned checkout capture
  const checkoutId = 'chk-' + Date.now()
  const captured = await post('/api/checkouts', {
    id: checkoutId,
    fullName: 'Awa Test',
    phone: '677000001',
    items: [{ path: 'products/cafe', quantity: 1 }],
  })
  assert.equal(captured.status, 200)
  const chk = (await db.doc(`checkouts/${checkoutId}`).get()).data()
  assert.equal(chk.total, 12000)
  assert.deepEqual(chk.partnersPaths, ['users/admin-uid'])
  assert.equal(chk.orderPath, null)
  ok('abandoned checkout saved with server-side price and partner')
  assert.equal(
    (await post('/api/checkouts', { id: 'x', fullName: 'A', phone: '1', items: [] })).status,
    400,
  )
  ok('invalid checkout rejected')

  // Order 1: code applied, stock and usage taken, checkout converted
  const o1 = await post(
    '/api/orders',
    order(mendong, '677000001', { cartItems: cafe(1), promoCodes: ['pub-cafe'], checkoutId }),
  )
  assert.equal(o1.status, 201, JSON.stringify(o1.body))
  assert.equal(o1.body.orderPrices.total, 10800)
  assert.ok(o1.body.trackingToken?.length === 32)
  assert.equal(o1.body.stockReserved, true)
  assert.equal(o1.body.history[0].type, 'created')
  assert.equal(await stock(), 4)
  assert.equal(await uses(), 1)
  assert.equal((await db.doc(`checkouts/${checkoutId}`).get()).get('orderPath'), o1.body.path)
  ok('order 1: 10 800, stock 5→4, PUB-CAFE used once, checkout marked converted')

  // Same customer again: per-customer limit (1) blocks the code, the rest applies
  const o2 = await post(
    '/api/orders',
    order(mendong, '677000001', { cartItems: cafe(1), promoCodes: ['PUB-CAFE'] }),
  )
  assert.equal(o2.status, 201)
  assert.equal(o2.body.orderPrices.total, 12000)
  assert.equal(await uses(), 1)
  ok('same phone: per-customer limit refuses the code (12 000), usage unchanged')

  // Two other customers: the second exhausts the total limit (2)
  const o3 = await post(
    '/api/orders',
    order(mendong, '699000002', { cartItems: cafe(1), promoCodes: ['PUB-CAFE'] }),
  )
  assert.equal(o3.body.orderPrices.total, 10800)
  assert.equal(await uses(), 2)
  const o4 = await post(
    '/api/orders',
    order(mendong, '655000003', { cartItems: cafe(1), promoCodes: ['PUB-CAFE'] }),
  )
  assert.equal(o4.body.orderPrices.total, 12000)
  assert.equal(await uses(), 2)
  ok('total limit: 2nd customer gets it (usage 2), 3rd does not')
  assert.equal(await stock(), 1)

  // Out of stock: transaction refuses, nothing written
  const before = (await db.collection('orders').get()).size
  const o5 = await post('/api/orders', order(mendong, '670000004', { cartItems: cafe(3) }))
  assert.equal(o5.status, 409)
  assert.equal(o5.body.error, 'OUT_OF_STOCK')
  assert.equal(await stock(), 1)
  assert.equal((await db.collection('orders').get()).size, before)
  ok('out of stock: 409, stock and orders untouched')

  // Untracked product, Douala, unlisted area, minimum amount
  const o6 = await post(
    '/api/orders',
    order(akwa, '670000005', { cartItems: [{ product: { path: 'products/the' }, quantity: 7 }] }),
  )
  assert.equal(o6.status, 201)
  assert.equal(o6.body.orderPrices.shipping, 2500)
  assert.equal(o6.body.orderPrices.total, 35000 + 2500 - 2000)
  ok('untracked product, Douala zone 2 500 (no Yaoundé offer), -2 000 from 30 000')
  const o7 = await post(
    '/api/orders',
    order(unlisted, '670000006', {
      cartItems: [{ product: { path: 'products/the' }, quantity: 1 }],
    }),
  )
  assert.equal(o7.body.orderPrices.shipping, 0)
  assert.equal(o7.body.deliveryInfo.city, null)
  assert.equal((o7.body.promotions ?? []).length, 0)
  ok('unlisted area: shipping to confirm, no promotion applied')

  // Tracking page
  const id1 = o1.body.path.split('/').pop()
  const page = await fetch(`${STORE}/order/${id1}?t=${o1.body.trackingToken}`)
  assert.equal(page.status, 200)
  assert.ok((await page.text()).includes(id1.slice(0, 8).toUpperCase()))
  assert.equal((await fetch(`${STORE}/order/${id1}?t=${'0'.repeat(32)}`)).status, 404)
  ok('tracking page opens with the token, 404 with a wrong one')

  // Verified review only once delivered, once per product, pending moderation
  const review = {
    orderId: id1,
    token: o1.body.trackingToken,
    productPath: 'products/cafe',
    rating: 5,
    comment: 'Très bon café !',
  }
  assert.equal((await post('/api/reviews', review)).status, 409)
  await db.doc(o1.body.path).update({ status: 'COMPLETED' })
  assert.equal((await post('/api/reviews', review)).status, 201)
  assert.equal((await post('/api/reviews', review)).status, 200)
  const saved = (await db.doc(`reviews/${id1}_cafe`).get()).data()
  assert.equal(saved.status, 'PENDING')
  assert.equal(saved.verify, true)
  assert.equal(saved.creatorId, 'admin-uid')
  assert.equal(saved.userName, 'Awa T.')
  assert.equal((await post('/api/reviews', { ...review, token: 'x'.repeat(32) })).status, 404)
  ok('review: refused before delivery, saved once as pending + verified, wrong token 404')

  console.log(`\nAll ${step} store checks passed`)
}

;(async () => {
  await seed(admin)
  const store = await startStore()
  try {
    await checks()
  } catch (e) {
    console.error(store.log().split('\n').slice(-40).join('\n'))
    throw e
  } finally {
    store.stop()
  }
  process.exit(0)
})().catch(e => {
  console.error('✘', e.message)
  process.exit(1)
})
