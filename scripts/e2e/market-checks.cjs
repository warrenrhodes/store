// Phase 4 checks: the marketplace (docs/MULTI_TENANT_PLAN.md, 3.4 and phase 4). Run by run.cjs
// last. A cart mixing store A (ngift) and store B (boutique-bertrand) on the marketplace: one
// order per store in one transaction, each with its own shipping and promotions, a group
// tracking link; vendor pages and badges; the platform's product moderation.
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')

const sha256 = v => createHash('sha256').update(v).digest('hex')
const adminSession = require('./admin-session.cjs')
const { browserTools } = require('./site-checks.cjs')

const A = '/boutique/ngift'
const B = '/boutique/boutique-bertrand'

module.exports = async function marketChecks({
  db,
  STORE,
  ADMIN,
  AUTH_HOST,
  apiKey,
  ADMIN_APP,
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
  // A's own Akwa (B has its copy, akwa_vendor-b, since the locations migration).
  const akwa = {
    deliveryMethod: 'DELIVERY',
    locationId: 'akwa',
    location: 'Akwa',
    address: '',
    deliveryDate: new Date().toISOString(),
    deliveryTime: '10:00',
  }
  const cart = items => items.map(([path, quantity]) => ({ product: { path }, quantity }))
  const order = (items, phone, extra = {}) =>
    post('/api/orders', {
      site: '_market',
      cartItems: cart(items),
      order: { deliveryInfo: akwa, userData: { id: '', email: '', fullName: 'Client Marché', phone } },
      ...extra,
    })
  const stock = async path => (await db.doc(path).get()).get('inventory.stockQuantity')
  const ordersCount = async () => (await db.collection('orders').get()).size

  // Preview: one summary per store, each with its shipping and its own promotions.
  const items = [
    ['products/the', 1],
    ['products/b-miel', 1],
  ]
  const preview = await post('/api/promotions/calculate', {
    site: '_market',
    cart: cart(items),
    shipping: { deliveryMethod: 'DELIVERY', locationId: 'akwa' },
    codes: ['B-PROMO', 'NOPE'],
  })
  assert.equal(preview.status, 200, JSON.stringify(preview.body))
  const [pa, pb] = preview.body.groups
  assert.deepEqual([pa.storeId, pa.shipping, pa.total], ['admin-uid', 2500, 7500])
  // B: its Akwa copy (3 000), free shipping there (B-AKWA), B-PROMO -5 % on its honey.
  assert.deepEqual([pb.storeId, pb.shipping, pb.discount, pb.total], ['vendor-b', 3000, 3400, 7600])
  assert.equal(preview.body.total, 15100)
  assert.deepEqual(preview.body.codeStatuses, { 'B-PROMO': 'applied', NOPE: 'invalid' })
  ok('preview of an A+B cart: per store (A 7 500 with Douala 2 500; B 7 600 with its own Akwa, free shipping and B-PROMO), total 15 100')

  // Abandoned checkout: one document per store.
  const checkoutId = `chk-market-${Date.now()}`
  const captured = await post('/api/checkouts', {
    site: '_market',
    id: checkoutId,
    fullName: 'Client Marché',
    phone: '677000777',
    items: items.map(([path, quantity]) => ({ path, quantity })),
  })
  assert.equal(captured.status, 200)
  const chkA = (await db.doc(`checkouts/${checkoutId}_admin-uid`).get()).data()
  const chkB = (await db.doc(`checkouts/${checkoutId}_vendor-b`).get()).data()
  assert.deepEqual(chkA.items.map(i => i.productPath), ['products/the'])
  assert.deepEqual([chkB.storeId, chkB.total], ['vendor-b', 8000])
  ok('abandoned checkout of an A+B cart: one document per store, each in its store')

  // Out of stock in B: no order at all, A's stock untouched.
  const before = await ordersCount()
  const cafeStock = await stock('products/cafe')
  const short = await order(
    [
      ['products/cafe', 1],
      ['products/b-miel', 99],
    ],
    '677000778',
  )
  assert.equal(short.status, 409)
  assert.equal(short.body.error, 'OUT_OF_STOCK')
  assert.equal(await ordersCount(), before)
  assert.equal(await stock('products/cafe'), cafeStock)
  ok("B out of stock: 409, no order created, A's stock untouched")

  // The order: two orders, same group and tracking token, each priced like the preview.
  const mielStock = await stock('products/b-miel')
  const placed = await order(items, '677000777', { promoCodes: ['B-PROMO'], checkoutId })
  assert.equal(placed.status, 201, JSON.stringify(placed.body))
  const { orders, checkoutGroupId, trackingToken } = placed.body
  assert.equal(orders.length, 2)
  const [oA, oB] = orders
  assert.ok(checkoutGroupId && orders.every(o => o.checkoutGroupId === checkoutGroupId))
  assert.ok(orders.every(o => o.trackingToken === trackingToken))
  assert.deepEqual([oA.storeId, oA.deliveryInfo.locationId, oA.orderPrices.total], ['admin-uid', 'akwa', 7500])
  assert.deepEqual(oA.items.map(i => i.product.path), ['products/the'])
  assert.deepEqual(
    [oB.storeId, oB.deliveryInfo.locationId, oB.orderPrices.shipping, oB.orderPrices.total],
    ['vendor-b', 'akwa_vendor-b', 3000, 7600],
  )
  assert.deepEqual(oB.promotions.map(p => p.code).sort(), ['B-AKWA', 'B-PROMO'])
  assert.ok(!oA.promotions.length, "B's code stays in B's order")
  assert.equal(await stock('products/b-miel'), mielStock - 1)
  const idA = oA.path.split('/').pop()
  const idB = oB.path.split('/').pop()
  assert.equal((await db.doc(`checkouts/${checkoutId}_admin-uid`).get()).get('orderPath'), oA.path)
  assert.equal((await db.doc(`checkouts/${checkoutId}_vendor-b`).get()).get('orderPath'), oB.path)
  ok('order of an A+B cart: 2 orders, same checkoutGroupId and token, own shipping and promotions; each checkout converted by its order')

  // Group tracking: both orders; wrong token or a store's page: 404.
  const group = await page(`/order/group/${checkoutGroupId}?t=${trackingToken}`)
  assert.equal(group.status, 200)
  for (const text of ['Thé vert', 'Miel de B', 'Boutique Bertrand', `/order/${idA}?t=${trackingToken}`, `/order/${idB}?t=`]) {
    assert.ok(group.html.includes(text), `group tracking should show ${text}`)
  }
  assert.equal((await page(`/order/group/${checkoutGroupId}?t=${'0'.repeat(32)}`)).status, 404)
  assert.equal((await page(`${A}/order/group/${checkoutGroupId}?t=${trackingToken}`)).status, 404)
  assert.equal((await page(`/order/${idB}?t=${trackingToken}`)).status, 200)
  assert.equal((await page(`${A}/order/${idB}?t=${trackingToken}`)).status, 404)
  ok('group tracking link shows both orders (each with its own link); wrong token or a store page: 404')

  // Each store's admin sees its own order only.
  const admin = adminSession({ ADMIN, AUTH_HOST, apiKey, ADMIN_APP })
  const ownerA = await admin.signIn('admin@test.cm')
  const ownerB = await admin.signIn('vendorb@test.cm')
  const platform = await admin.signIn('platform@test.cm')
  const aOwn = await admin.get(ownerA, `/orders/${idA}`)
  assert.ok(aOwn.status === 200 && aOwn.html.includes('Thé vert') && !aOwn.html.includes('Miel de B'))
  assert.ok(!(await admin.get(ownerA, `/orders/${idB}`)).html.includes('Miel de B'))
  assert.ok((await admin.get(ownerB, `/orders/${idB}`)).html.includes('Miel de B'))
  assert.ok(!(await admin.get(ownerB, `/orders/${idA}`)).html.includes('Thé vert'))
  ok("A's admin sees its order and not B's; B's admin the other way round")

  // Marketplace pages: vendor page, badges, the right product when two stores share a slug.
  const vendorB = await page('/vendeur/boutique-bertrand')
  assert.equal(vendorB.status, 200)
  assert.ok(vendorB.html.includes('Miel de B') && !vendorB.html.includes('Thé vert'))
  assert.ok(vendorB.html.includes(`href="${B}"`), 'link to the store')
  assert.equal((await page('/vendeur/nope-nope')).status, 404)
  assert.equal((await page(`${A}/vendeur/boutique-bertrand`)).status, 404)
  const shop = (await page('/shop')).html
  assert.ok(shop.includes('href="/vendeur/boutique-bertrand"') && shop.includes('href="/vendeur/ngift"'))
  assert.ok(shop.includes('/shop/miel-de-b?vendeur=boutique-bertrand'))
  assert.ok((await page('/shop/cafe-ginseng?vendeur=boutique-bertrand')).html.includes('Café de B'))
  assert.ok((await page('/shop/cafe-ginseng?vendeur=ngift')).html.includes('Café Ginseng Bio'))
  assert.ok((await page('/')).html.includes('href="/vendeur/boutique-bertrand"'), 'stores on the home page')
  ok('vendor page (marketplace only), store badges, ?vendeur= picks the right product of a shared slug')

  // Moderation: the platform hides B's honey from the marketplace; B's own store keeps it and
  // B can't list it again; a store owner can't moderate.
  let r = await admin.submit(ownerB, '/platform/products?store=vendor-b', 'setProductListed', {
    productId: 'b-miel',
    listed: 'false',
  })
  assert.equal((await db.doc('products/b-miel').get()).get('marketplaceListed'), true, 'owner refused')
  const list = await admin.get(platform, '/platform/products?store=vendor-b')
  assert.ok(list.html.includes('Miel de B') && list.html.includes('On the marketplace'))
  r = await admin.submit(platform, '/platform/products?store=vendor-b', 'setProductListed', {
    productId: 'b-miel',
    listed: 'false',
  })
  assert.match(r, /saved=1/, r)
  assert.equal((await db.doc('products/b-miel').get()).get('marketplaceListed'), false)
  assert.ok(!(await page('/vendeur/boutique-bertrand')).html.includes('Miel de B'))
  assert.ok((await page(`${B}/shop/miel-de-b`)).html.includes('Miel de B'), "still in B's store")
  const hidden = await order([['products/b-miel', 1]], '677000779')
  assert.equal(hidden.status, 400)
  const api = (cookie, method, p, body) =>
    fetch(ADMIN + p, {
      method,
      headers: { cookie, 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body),
    })
  const edited = await (await api(ownerB, 'GET', '/api/products/b-miel')).json()
  const { storeId, creatorId, createdAt, updatedAt, path: _, ...data } = edited.data
  const res = await api(ownerB, 'PUT', '/api/products/b-miel', { ...data, marketplaceListed: true })
  assert.equal(res.status, 200, await res.text())
  assert.equal((await db.doc('products/b-miel').get()).get('marketplaceListed'), false, 'B cannot relist')
  await admin.submit(platform, '/platform/products?store=vendor-b', 'setProductListed', {
    productId: 'b-miel',
    listed: 'true',
  })
  assert.ok((await page('/vendeur/boutique-bertrand')).html.includes('Miel de B'))
  ok("moderation: the platform hides and relists B's product (marketplace only, ordering refused while hidden); B and store owners can't change it")

  // Conversions API, customer data for Meta's match quality: InitiateCheckout as soon as the
  // name and phone are typed (an ad click's fbclid becomes fbc), Purchase with email and city.
  const from = metaCalls.length
  const sessionId = `chk-capi-${Date.now()}`
  const capture = await fetch(`${STORE}/api/checkouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', referer: `${STORE}${A}/checkout?fbclid=AdClick42` },
    body: JSON.stringify({
      site: 'ngift',
      id: sessionId,
      fullName: 'Awa Mbarga',
      phone: '677000123',
      items: [{ path: 'products/the', quantity: 2 }],
    }),
  })
  assert.equal(capture.status, 200)
  const placedA = await post('/api/orders', {
    site: 'ngift',
    cartItems: cart([['products/the', 1]]),
    order: {
      deliveryInfo: { ...akwa, locationId: 'mendong', location: 'Mendong' },
      userData: { id: '', email: ' Awa@Example.CM ', fullName: 'Awa Mbarga', phone: '677000123' },
    },
  })
  assert.equal(placedA.status, 201, JSON.stringify(placedA.body))
  await new Promise(r => setTimeout(r, 300))
  const capi = metaCalls.slice(from).map(c => c.body.data[0])
  const initiate = capi.filter(e => e.event_name === 'InitiateCheckout')
  const purchase = capi.filter(e => e.event_name === 'Purchase')
  assert.equal(initiate.length, 2, 'both of A\'s Pixels')
  const phoneHash = sha256('237677000123')
  for (const e of initiate) {
    assert.equal(e.event_id, sessionId, 'same id as the browser InitiateCheckout')
    assert.deepEqual(e.user_data.ph, [phoneHash])
    assert.deepEqual(e.user_data.external_id, [phoneHash])
    assert.deepEqual([e.user_data.fn, e.user_data.ln], [[sha256('awa')], [sha256('mbarga')]])
    assert.match(e.user_data.fbc, /^fb\.1\.\d+\.AdClick42$/)
    assert.deepEqual([e.custom_data.value, e.custom_data.currency], [15.24, 'EUR'], '10 000 XAF in euros')
  }
  // A second capture of the same session (the customer keeps typing) sends nothing more.
  await post('/api/checkouts', {
    site: 'ngift',
    id: sessionId,
    fullName: 'Awa Mbarga N.',
    phone: '677000123',
    items: [{ path: 'products/the', quantity: 2 }],
  })
  await new Promise(r => setTimeout(r, 300))
  assert.equal(metaCalls.slice(from).filter(c => c.body.data[0].event_name === 'InitiateCheckout').length, 2)
  assert.equal(purchase.length, 2)
  for (const e of purchase) {
    assert.deepEqual(e.user_data.em, [sha256('awa@example.cm')])
    assert.deepEqual(e.user_data.ct, [sha256('yaounde')], 'Yaoundé without its accent')
    assert.deepEqual(e.user_data.external_id, [phoneHash])
    assert.deepEqual(e.user_data.country, [sha256('cm')])
  }
  ok('Conversions API: InitiateCheckout once per session with phone, name, external_id and fbc from fbclid; Purchase with email and accent-free city')

  // Meta Pixel in the browser, on A (2 Pixels): add to cart, page change and checkout reach
  // the Pixel. fbevents.js is not loaded (offline): the base code keeps every call in fbq.queue.
  const tools = browserTools()
  if (!tools) {
    console.log('- Meta Pixel events: skipped (no Playwright Chromium found)')
  } else {
    const browser = await tools.chromium.launch({ executablePath: tools.executablePath })
    try {
      const tab = await browser.newPage()
      await tab.route('**/fbevents.js', route => route.fulfill({ body: '', contentType: 'text/javascript' }))
      await tab.goto(`${STORE}${A}/shop/cafe-ginseng?autoAddToCart=1`)
      await tab.waitForURL(`**${A}/checkout`)
      await tab.getByText('Café Ginseng').first().waitFor()
      const calls = await tab.evaluate(() => window.fbq.queue.map(args => [...args]))
      const events = calls.filter(c => c[0] !== 'init').map(c => c[1])
      assert.deepEqual(
        calls.filter(c => c[0] === 'init').map(c => c[1]),
        ['111111111', '222222222'],
      )
      const added = calls.find(c => c[1] === 'AddToCart')
      assert.ok(added, `AddToCart in ${JSON.stringify(events)}`)
      assert.deepEqual([added[2].content_ids, added[2].currency], [['cafe'], 'EUR'])
      const initiated = calls.find(c => c[1] === 'InitiateCheckout')
      assert.ok(initiated, `InitiateCheckout in ${JSON.stringify(events)}`)
      assert.equal(
        initiated[3]?.eventID,
        await tab.evaluate(() => sessionStorage.getItem('checkout-id')),
        "same id as the server's InitiateCheckout",
      )
      assert.ok(events.filter(e => e === 'PageView').length >= 2, 'a PageView per page')
      ok(`Meta Pixel in the browser: ${[...new Set(events)].join(', ')} to both of A's Pixels`)
    } finally {
      await browser.close()
    }
  }

  console.log(`All ${step} marketplace checks passed\n`)
}
