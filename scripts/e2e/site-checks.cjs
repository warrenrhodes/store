// Per-store storefront checks (phase 2), run by run.cjs last, after the form checks: store A
// ('admin-uid') is at /boutique/ngift, B ('vendor-b') at /boutique/boutique-bertrand, C
// ('boutique-c') is suspended. Path routing, isolation of products, promotions and zones,
// carts per store (in a real browser when one is found), SEO, trackers and revalidation.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const A = '/boutique/ngift'
const B = '/boutique/boutique-bertrand'

/** Playwright (installed with the store's dev tools) and a Chromium it can drive, or null. */
function browserTools() {
  let chromium
  try {
    ;({ chromium } = require(
      require.resolve('playwright', { paths: [path.resolve(__dirname, '../../nature_gift_store')] }),
    ))
  } catch {
    return null
  }
  const candidates = [process.env.E2E_CHROMIUM, chromium.executablePath()]
  for (const cache of [
    path.join(os.homedir(), 'Library/Caches/ms-playwright'),
    path.join(os.homedir(), '.cache/ms-playwright'),
  ]) {
    if (!fs.existsSync(cache)) continue
    for (const dir of fs.readdirSync(cache).filter(d => d.startsWith('chromium'))) {
      for (const sub of fs.readdirSync(path.join(cache, dir))) {
        for (const bin of ['chrome-headless-shell', 'headless_shell']) {
          candidates.push(path.join(cache, dir, sub, bin))
        }
      }
    }
  }
  const executablePath = candidates.find(c => c && fs.existsSync(c))
  return executablePath ? { chromium, executablePath } : null
}

module.exports = async function siteChecks({
  db,
  STORE,
  ADMIN,
  AUTH_HOST,
  apiKey,
  revalidateSecret,
  metaCalls,
}) {
  let step = 0
  const ok = msg => console.log(`✔ ${++step}. ${msg}`)
  const page = async p => {
    const res = await fetch(STORE + p, { redirect: 'manual' })
    return { status: res.status, html: await res.text() }
  }
  const post = async (p, body) => {
    const res = await fetch(STORE + p, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return { status: res.status, body: await res.json().catch(() => ({})) }
  }
  const revalidate = (tags, secret = revalidateSecret) =>
    fetch(`${STORE}/api/revalidate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags }),
    })
  const delivery = (locationId, location) => ({
    deliveryMethod: 'DELIVERY',
    locationId,
    location,
    address: '',
    deliveryDate: new Date().toISOString(),
    deliveryTime: '10:00',
  })
  const order = (site, paths, deliveryInfo, phone, extra = {}) =>
    post('/api/orders', {
      site,
      cartItems: paths.map(p => ({ product: { path: p }, quantity: 1 })),
      order: { deliveryInfo, userData: { id: '', email: '', fullName: 'Site Test', phone } },
      ...extra,
    })

  // Store A: two Pixels with their CAPI tokens (set like the Settings page would, then the
  // admin's revalidation call: the storefront caches store documents).
  await db.doc('stores/admin-uid').update({ 'settings.metaPixelIds': ['111111111', '222222222'] })
  await db
    .doc('storeSecrets/admin-uid')
    .set({ metaCapiTokens: { 111111111: 'TOKEN-ONE', 222222222: 'TOKEN-TWO' }, flockWebhookUrl: null })
  assert.equal((await revalidate(['stores'], 'wrong-secret')).status, 401)
  assert.equal((await revalidate(['not a tag'])).status, 400)
  assert.equal((await revalidate(['store:admin-uid', 'market', 'stores'])).status, 200)
  ok('/api/revalidate: wrong secret 401, bad tag 400, valid call 200')

  // Routing: unknown, pending and suspended stores are 404; the marketplace can't be reached
  // by its internal name.
  const now = new Date().toISOString()
  await db.doc('stores/store-d').set({
    name: 'Boutique D',
    slug: 'boutique-d',
    ownerUid: 'staff-a',
    status: 'pending',
    plan: 'free',
    marketplaceListed: true,
    settings: { currency: 'XAF', gtmIds: [], metaPixelIds: [], notificationEmails: [], notificationPhones: [] },
    createdAt: now,
    updatedAt: now,
  })
  await db.doc('storeSlugs/boutique-d').set({ storeId: 'store-d' })
  for (const p of ['/boutique/nope', '/boutique/boutique-d', '/boutique/boutique-c']) {
    assert.equal((await page(p)).status, 404, `${p} should be a 404`)
  }
  // Not store paths, and not public pages either: sent to sign-in (like /foo), never served.
  for (const p of ['/boutique/Bad_Slug', '/_market/shop']) {
    assert.notEqual((await page(p)).status, 200, `${p} must not be served`)
  }
  assert.equal((await page(`${A}/shop`)).status, 200)
  ok('unknown slug, pending store, suspended store, bad slug: 404; /_market never served; /boutique/ngift opens')

  // A's pages: A's products, promotions and zones only; every link stays under /boutique/ngift.
  const home = await page(A)
  assert.equal(home.status, 200)
  assert.ok(home.html.includes('Café Ginseng'))
  assert.ok(!home.html.includes('Miel de B') && !home.html.includes('Promo de B'))
  const links = [...home.html.matchAll(/<a\s[^>]*?href="(\/[^"]*)"/g)].map(m => m[1])
  assert.ok(links.length > 5, `links found: ${links.length}`)
  const outside = links.filter(l => !l.startsWith(A) && !l.startsWith('//'))
  assert.deepEqual(outside, [], 'links leaving the store')
  const shop = await page(`${A}/shop`)
  assert.ok(shop.html.includes('Café Ginseng') && !shop.html.includes('Miel de B'))
  assert.ok(!(await page(`${A}/shop/miel-de-b`)).html.includes('Miel de B'), "B's product on A")
  const checkoutA = await page(`${A}/checkout`)
  assert.ok(checkoutA.html.includes('Mendong') && !checkoutA.html.includes('Bonamoussadi'))
  const checkoutB = await page(`${B}/checkout`)
  assert.ok(checkoutB.html.includes('Bonamoussadi') && !checkoutB.html.includes('Mendong'))
  ok(`A's home, shop and checkout: A's products, promotions and zones only; ${links.length} links all under ${A}`)

  // Brand and trackers: A's name, both GTM containers and both Pixels; none on the marketplace.
  // (Next serializes the inline Pixel script: look for its parts.)
  for (const id of ['GTM-AAAA111', 'GTM-BBBB222', 'fbevents.js', '111111111', '222222222']) {
    assert.ok(home.html.includes(id), `${id} on A`)
  }
  assert.ok(home.html.includes('<title>N.Gift</title>'))
  const market = await page('/')
  assert.ok(!market.html.includes('GTM-AAAA111') && !market.html.includes('111111111'))
  const homeB = await page(B)
  assert.ok(homeB.html.includes('Boutique Bertrand') && !homeB.html.includes('GTM-AAAA111'))
  ok("A loads its 2 GTM containers and 2 Pixels, B and the marketplace don't; B shows its name")

  // Orders: one store per order, checked on the server.
  const metaBefore = metaCalls.length
  const oA = await order(A.split('/')[2], ['products/the'], delivery('mendong', 'Mendong'), '671000001', {
    promoCodes: ['B-PROMO'],
  })
  assert.equal(oA.status, 201, JSON.stringify(oA.body))
  assert.equal(oA.body.storeId, 'admin-uid')
  assert.equal(oA.body.orderPrices.shipping, 1500)
  assert.ok(!oA.body.promotions.some(p => p.code === 'B-PROMO'))
  const preview = await post('/api/promotions/calculate', {
    site: 'ngift',
    cart: [{ product: { path: 'products/the', categories: ['Café'] }, quantity: 1, price: 5000 }],
    shipping: { deliveryMethod: 'DELIVERY', locationId: 'mendong', city: 'Yaoundé', cost: 1500 },
    codes: ['B-PROMO', 'PUB-CAFE'],
  })
  assert.equal(preview.body.codeStatuses['B-PROMO'], 'invalid')
  ok("order on A: storeId A, A's zone (1 500), B's code ignored; B's code previewed on A: invalid")

  // CAPI: the purchase reaches both Pixels, with their own token and the same event_id.
  await new Promise(r => setTimeout(r, 300))
  const calls = metaCalls.slice(metaBefore)
  assert.deepEqual(calls.map(c => c.url.split('?')[0]).sort(), [
    '/v21.0/111111111/events',
    '/v21.0/222222222/events',
  ])
  const orderId = oA.body.path.split('/').pop()
  assert.ok(calls.every(c => c.body.data[0].event_id === orderId))
  assert.ok(calls.some(c => c.url.includes('access_token=TOKEN-ONE')))
  assert.ok(calls.some(c => c.url.includes('access_token=TOKEN-TWO')))
  ok('CAPI purchase sent to both Pixels, each with its token, same event_id (the order id)')

  // Forged site: B's product sent as A's (orders, preview, abandoned checkout) is refused.
  const before = (await db.collection('orders').get()).size
  const forged = await order('ngift', ['products/b-miel'], delivery('mendong', 'Mendong'), '671000002')
  assert.equal(forged.status, 400)
  assert.equal(forged.body.error, 'WRONG_STORE')
  const forgedMix = await order('ngift', ['products/the', 'products/b-miel'], delivery('mendong', 'M'), '671000002')
  assert.equal(forgedMix.status, 400)
  assert.equal(
    (
      await post('/api/promotions/calculate', {
        site: 'ngift',
        cart: [{ product: { path: 'products/b-miel' }, quantity: 1, price: 8000 }],
        codes: ['B-PROMO'],
      })
    ).status,
    400,
  )
  assert.equal(
    (
      await post('/api/checkouts', {
        site: 'ngift',
        id: `chk-forged-${Date.now()}`,
        fullName: 'Forged',
        phone: '677000099',
        items: [{ path: 'products/b-miel', quantity: 1 }],
      })
    ).status,
    400,
  )
  assert.equal((await order('nope', ['products/the'], delivery('mendong', 'M'), '671000003')).status, 404)
  const mixed = await order(undefined, ['products/the', 'products/b-miel'], delivery('mendong', 'M'), '671000004')
  assert.equal(mixed.status, 409)
  assert.equal(mixed.body.error, 'MIXED_STORES')
  assert.equal((await db.collection('orders').get()).size, before)
  ok("B's product sent with site=ngift: 400 (order, preview, checkout); unknown site 404; mixed marketplace cart 409; nothing written")

  // B after the locations migration: its zone and its promotion use its copy of Akwa.
  const oB = await order('boutique-bertrand', ['products/b-miel'], delivery('akwa_vendor-b', 'Akwa'), '671000005')
  assert.equal(oB.status, 201, JSON.stringify(oB.body))
  assert.equal(oB.body.storeId, 'vendor-b')
  assert.equal(oB.body.deliveryInfo.locationId, 'akwa_vendor-b')
  // Free shipping is a discount of the shipping cost.
  assert.ok(oB.body.promotions.some(p => p.code === 'B-AKWA'), "B's free shipping in Akwa")
  assert.equal(oB.body.orderPrices.total, 8000)
  const oB2 = await order('boutique-bertrand', ['products/b-miel'], delivery('bonamoussadi', 'Bonamoussadi'), '671000006')
  assert.equal(oB2.body.orderPrices.shipping, 3000)
  const oBa = await order('boutique-bertrand', ['products/b-miel'], delivery('akwa', 'Akwa'), '671000007')
  assert.equal(oBa.body.deliveryInfo.locationId, null, "A's Akwa is not B's")
  ok("order on B: B's copy of Akwa (free shipping promotion rewritten), Bonamoussadi 3 000; A's Akwa unknown to B")

  // Tracking: a store opens its own orders only.
  const idB = oB.body.path.split('/').pop()
  assert.equal((await page(`${B}/order/${idB}?t=${oB.body.trackingToken}`)).status, 200)
  assert.equal((await page(`${A}/order/${idB}?t=${oB.body.trackingToken}`)).status, 404)
  ok("tracking: B's order opens on B, 404 on A")

  // SEO: sitemaps per store, canonical URL in the product's store.
  const sitemapA = (await page(`${A}/sitemap.xml`)).html
  assert.ok(sitemapA.includes(`${STORE}${A}/shop/cafe-ginseng`))
  assert.ok(!sitemapA.includes('miel-de-b') && !sitemapA.includes(B))
  const sitemapMarket = (await page('/sitemap.xml')).html
  assert.ok(sitemapMarket.includes(`${STORE}${A}/shop/cafe-ginseng`))
  assert.ok(sitemapMarket.includes(`${STORE}${B}/shop/miel-de-b`))
  assert.match((await page('/robots.txt')).html, new RegExp(`Sitemap: ${STORE}/sitemap.xml`))
  const marketProduct = (await page('/shop/cafe-ginseng')).html
  assert.ok(
    marketProduct.includes(`<link rel="canonical" href="${STORE}${A}/shop/cafe-ginseng"`),
    'canonical of a marketplace product: its store page',
  )
  ok("sitemap of A: A only; marketplace sitemap and canonical: products at their store's URL")

  // Carts per store, in a real browser.
  const tools = browserTools()
  if (!tools) {
    console.log('- carts per store in a browser: skipped (no Playwright Chromium found)')
  } else {
    const browser = await tools.chromium.launch({ executablePath: tools.executablePath })
    try {
      const tab = await browser.newPage()
      const carts = () =>
        tab.evaluate(() =>
          Object.fromEntries(
            ['cart-storage', 'cart-storage:ngift', 'cart-storage:boutique-bertrand'].map(k => [
              k,
              (JSON.parse(localStorage.getItem(k) ?? 'null')?.state?.cartItems ?? []).map(
                i => i.product.path,
              ),
            ]),
          ),
        )
      await tab.goto(`${STORE}${A}/shop/cafe-ginseng?autoAddToCart=1`)
      await tab.waitForURL(`**${A}/checkout`)
      await tab.goto(`${STORE}${B}/shop/miel-de-b?autoAddToCart=1`)
      await tab.waitForURL(`**${B}/checkout`)
      assert.deepEqual(await carts(), {
        'cart-storage': [],
        'cart-storage:ngift': ['products/cafe'],
        'cart-storage:boutique-bertrand': ['products/b-miel'],
      })
      await tab.goto(`${STORE}${B}/cart`)
      await tab.getByText('Miel de B').first().waitFor()
      assert.equal(await tab.getByText('Café Ginseng').count(), 0)
      const hrefs = await tab.$$eval('a[href^="/"]', as => as.map(a => a.getAttribute('href')))
      assert.deepEqual(hrefs.filter(h => !h.startsWith(B)), [])
      ok(`browser: A's and B's carts are separate (cart-storage:<slug>), links on B's cart page stay under ${B}`)
    } finally {
      await browser.close()
    }
  }

  // Admin: same product slug and promotion code in two stores; unique within a store.
  const signIn = async email => {
    const r = await fetch(
      `http://${AUTH_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'Test1234!', returnSecureToken: true }),
      },
    )
    const login = await fetch(`${ADMIN}/api/login`, {
      headers: { Authorization: `Bearer ${(await r.json()).idToken}` },
    })
    return login.headers
      .getSetCookie()
      .map(c => c.split(';')[0])
      .join('; ')
  }
  const api = (cookie, method, p, body) =>
    fetch(ADMIN + p, {
      method,
      headers: { cookie, 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body),
    })
  const ownerA = await signIn('admin@test.cm')
  const ownerB = await signIn('vendorb@test.cm')
  const strip = ({ storeId, creatorId, createdAt, updatedAt, path: _, ...rest }) => rest
  const cafe = strip((await db.doc('products/cafe').get()).data())
  assert.equal((await api(ownerB, 'POST', '/api/products', { ...cafe, title: 'Café de B' })).status, 200)
  assert.equal((await api(ownerA, 'POST', '/api/products', { ...cafe, title: 'Café bis' })).status, 409)
  const pub = strip((await db.doc('promotions/p-pub').get()).data())
  assert.equal((await api(ownerB, 'POST', '/api/promotions', { ...pub, name: 'Pub de B' })).status, 200)
  assert.equal((await api(ownerA, 'POST', '/api/promotions', { ...pub, name: 'Pub bis' })).status, 409)
  assert.ok((await page(`${B}/shop/cafe-ginseng`)).html.includes('Café de B'))
  assert.ok((await page(`${A}/shop/cafe-ginseng`)).html.includes('Café Ginseng'))
  const productB = (
    await db.collection('products').where('storeId', '==', 'vendor-b').where('slug', '==', 'cafe-ginseng').get()
  ).docs[0]
  assert.equal(productB.get('marketplaceListed'), true, 'a new product is listed')
  ok('same product slug and promotion code in A and B (each shown in its store); a second one in A: 409')

  // Revalidation: an edit made in the admin shows at once (a direct database write doesn't,
  // the page is cached for 5 minutes).
  const title = async () => (await page(`${A}/shop/cafe-ginseng`)).html
  await db.doc('products/cafe').update({ title: 'Café Ginseng (direct)' })
  assert.ok(!(await title()).includes('Café Ginseng (direct)'), 'the page is served from the cache')
  const edited = await (await api(ownerA, 'GET', '/api/products/cafe')).json()
  const res = await api(ownerA, 'PUT', '/api/products/cafe', { ...strip(edited.data), title: 'Café Ginseng Bio' })
  assert.equal(res.status, 200, await res.text())
  assert.ok((await title()).includes('Café Ginseng Bio'), 'the admin edit shows at once')
  ok('product edited in the admin: the storefront shows it at once (a direct write waits for the cache)')

  console.log(`All ${step} per-store storefront checks passed\n`)
}

module.exports.browserTools = browserTools
