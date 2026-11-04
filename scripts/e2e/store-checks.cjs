// Storefront API checks (the 11 from shopify-parity), run by run.cjs after the migration.
const assert = require('node:assert/strict')

module.exports = async function storeChecks({ db, STORE }) {
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
  assert.equal(chk.partnersPaths, undefined, 'not written since phase 5')
  assert.equal(chk.storeId, 'admin-uid')
  assert.equal(chk.orderPath, null)
  ok('abandoned checkout saved with server-side price, partner and store')
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
  assert.equal(o1.body.storeId, 'admin-uid')
  // Phase 5: stores own their documents; the creator-based fields are no longer written.
  const saved1 = (await db.doc(o1.body.path).get()).data()
  assert.equal(saved1.partnersPaths, undefined)
  assert.equal(saved1.items[0].product.creatorId, undefined)
  assert.equal(await stock(), 4)
  assert.equal(await uses(), 1)
  assert.equal((await db.doc(`checkouts/${checkoutId}`).get()).get('orderPath'), o1.body.path)
  ok('order 1: 10 800, stock 5→4, PUB-CAFE used once, checkout marked converted, store A')

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

  // First-order promotion: a phone with past orders in the store doesn't get it.
  const the = { cartItems: [{ product: { path: 'products/the' }, quantity: 1 }], promoCodes: ['BIENVENUE'] }
  const returning = await post('/api/orders', order(unlisted, '677000001', the))
  assert.equal(returning.body.orderPrices.total, 5000)
  const newcomer = await post('/api/orders', order(unlisted, '670000099', the))
  assert.equal(newcomer.body.orderPrices.total, 4000)
  const again = await post('/api/orders', order(unlisted, '670000099', the))
  assert.equal(again.body.orderPrices.total, 5000)
  ok('first order: -1 000 for a new phone only, not on its second order nor for a returning one')

  // Ad page thank-you page: filled with the order, cleaned; only with the token, only its store's.
  const placed = newcomer.body
  const placedId = placed.path.split('/').pop()
  const success = async (prefix, query) =>
    (await fetch(`${STORE}${prefix}/order/success?${new URLSearchParams(query)}`)).text()
  const query = { order: placedId, t: placed.trackingToken, ad: 'pub' }
  for (const prefix of ['', '/boutique/nature-gift']) {
    const thanks = await success(prefix, query)
    assert.ok(thanks.includes('Merci Awa !'), prefix)
    assert.ok(thanks.includes('Thé vert × 1 : 4'), 'product, quantity, total (welcome discount)')
    assert.ok(thanks.includes(`commande ${placedId.slice(0, 8).toUpperCase()}`), 'order number')
    assert.ok(thanks.includes(`/order/${placedId}?t=${placed.trackingToken}`), 'tracking link')
    assert.ok(thanks.includes('{{nope}}') && thanks.includes('.ty{color:#222}'))
    for (const bad of ['window.hacked', 'onerror', 'javascript:alert', 'evil.test']) {
      assert.ok(!thanks.includes(bad), `${bad} removed`)
    }
  }
  const custom = 'Merci Awa !'
  assert.ok(!(await success('', { ...query, t: '0'.repeat(32) })).includes(custom), 'wrong token')
  assert.ok(!(await success('/boutique/boutique-bertrand', query)).includes(custom), "B's site")
  await db.doc('blogs/pub-b').set({ ...(await db.doc('blogs/pub').get()).data(), storeId: 'vendor-b', slug: 'pub-b' })
  assert.ok(!(await success('', { ...query, ad: 'pub-b' })).includes(custom), "B's ad page")
  // The ad page always hands its id to its order form (the confirmation decides), and never
  // sends the thank-you page itself to the browser.
  const adPage = await (await fetch(`${STORE}/blogs/test-pub`)).text()
  assert.match(adPage, /adId\\?":\\?"pub\\?"/, 'ad id passed to the order form')
  assert.ok(!adPage.includes('{{customerFirstName}}'), 'thank-you page not sent with the ad page')
  ok("ad thank-you page: merge tags filled and escaped, scripts/handlers/forms removed, styles kept; wrong token, other store's site or ad page: the platform's confirmation")

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
  assert.equal(saved.creatorId, undefined, 'not copied since phase 5')
  assert.equal(saved.storeId, 'admin-uid')
  assert.equal(saved.userName, 'Awa T.')
  assert.equal((await post('/api/reviews', { ...review, token: 'x'.repeat(32) })).status, 404)
  ok('review: refused before delivery, saved once as pending + verified, wrong token 404')

  console.log(`All ${step} storefront checks passed\n`)
}
