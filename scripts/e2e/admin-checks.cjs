// Admin store-isolation checks (phase 1), run by run.cjs after the migration and the
// storefront checks. Signs in for real against the Auth emulator and reads the pages and APIs.
const assert = require('node:assert/strict')

module.exports = async function adminChecks({ db, ADMIN, AUTH_HOST, apiKey }) {
  let step = 0
  const ok = msg => console.log(`✔ ${++step}. ${msg}`)

  /** Session cookies for this account, as the admin's sign-in page gets them. */
  const signIn = async email => {
    const res = await fetch(
      `http://${AUTH_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'Test1234!', returnSecureToken: true }),
      },
    )
    const { idToken } = await res.json()
    assert.ok(idToken, `sign-in failed for ${email}`)
    const login = await fetch(`${ADMIN}/api/login`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
    assert.equal(login.status, 200, `/api/login for ${email}`)
    return login.headers
      .getSetCookie()
      .map(c => c.split(';')[0])
      .join('; ')
  }
  const as = cookie => ({
    page: async path => {
      const res = await fetch(ADMIN + path, { headers: { cookie }, redirect: 'manual' })
      return { status: res.status, location: res.headers.get('location'), html: await res.text() }
    },
    api: async (method, path, body) =>
      (
        await fetch(ADMIN + path, {
          method,
          headers: { cookie, 'Content-Type': 'application/json' },
          body: body && JSON.stringify(body),
        })
      ).status,
  })

  const cookies = {
    ownerA: await signIn('admin@test.cm'),
    platform: await signIn('platform@test.cm'),
  }
  const ownerA = as(cookies.ownerA)
  const ownerB = as(await signIn('vendorb@test.cm'))
  const staffA = as(await signIn('staff@test.cm'))
  const platform = as(cookies.platform)

  const pageHas = async (who, path, present, absent) => {
    const { status, html } = await who.page(path)
    assert.equal(status, 200, `${path}: HTTP ${status}`)
    for (const text of present) assert.ok(html.includes(text), `${path} should show "${text}"`)
    for (const text of absent) assert.ok(!html.includes(text), `${path} must not show "${text}"`)
  }

  // A's lists show A's data and nothing of B (the CSV exports are built from the same data).
  await pageHas(ownerA, '/products', ['Café Ginseng'], ['Miel de B'])
  await pageHas(ownerA, '/orders', ['Awa Test', 'Mixte Client'], ['Bertrand Bee'])
  await pageHas(ownerA, '/customers', ['677000001'], ['690000009'])
  await pageHas(ownerA, '/checkouts', [], ['Bella Panier'])
  await pageHas(ownerA, '/reviews', ['Très bon café'], ['Miel B excellent'])
  await pageHas(ownerA, '/promotions', ['PUB-CAFE'], ['B-PROMO'])
  await pageHas(ownerA, '/shipments', [], ['z-b'])
  await pageHas(ownerA, '/categories', ['Café'], ['cat-b'])
  // The dashboard may show Miel de B: the mixed order order-ab belongs to A (its first vendor).
  await pageHas(ownerA, '/', ['Café Ginseng'], ['Bertrand Bee'])
  ok("A's lists, customers, checkouts and dashboard: A's data only")

  // B's documents opened by URL as A: not found (404) or an empty page, never B's data.
  const pageHides = async (who, path, absent) => {
    const { status, html } = await who.page(path)
    assert.ok(status === 200 || status === 404, `${path}: HTTP ${status}`)
    for (const text of absent) assert.ok(!html.includes(text), `${path} must not show "${text}"`)
    return status
  }
  const statuses = [
    await pageHides(ownerA, '/products/b-miel', ['Miel de B']),
    await pageHides(ownerA, '/orders/order-b', ['Bertrand Bee', '690000009']),
    await pageHides(ownerA, '/promotions/p-b', ['B-PROMO']),
    await pageHides(ownerA, '/shipments/z-b', ['shipments/z-b', 'Bonamoussadi']),
  ]
  ok(
    `B's product, order, promotion and zone opened by URL as A: nothing shown (HTTP ${statuses.join(', ')})`,
  )

  // B's documents changed or deleted through the API as A: refused, untouched.
  assert.equal(await ownerA.api('GET', '/api/products/b-miel'), 404)
  assert.equal(await ownerA.api('PUT', '/api/orders/order-b', { status: 'CANCELED' }), 404)
  for (const path of [
    '/api/products/b-miel',
    '/api/promotions/p-b',
    '/api/shipments/z-b',
    '/api/categories/cat-b',
    '/api/reviews/order-b_b-miel',
  ]) {
    assert.equal(await ownerA.api('DELETE', path), 404, `DELETE ${path}`)
  }
  assert.equal((await db.doc('orders/order-b').get()).get('status'), 'COMPLETED')
  for (const path of ['products/b-miel', 'promotions/p-b', 'shipments/z-b', 'categories/cat-b']) {
    assert.ok((await db.doc(path).get()).exists, `${path} still exists`)
  }
  ok("B's documents through the API as A: 404, nothing changed or deleted")

  // Locations per store: A lists only its own, and can't put B's in a zone.
  // ('Mendong' is also the new-location placeholder: look for Etoudi.)
  await pageHas(ownerA, '/locations', ['Etoudi', 'Akwa', 'Ekounou'], ['Bonamoussadi'])
  await pageHas(ownerB, '/locations', ['Bonamoussadi', 'Akwa'], ['Etoudi', 'Ekounou'])
  await pageHas(ownerA, '/shipments/z-yde', ['Etoudi'], ['Bonamoussadi'])
  const zone = { method: 'DELIVERY', isActive: true, cost: 1000 }
  assert.equal(
    await ownerA.api('POST', '/api/shipments', { ...zone, locationIds: ['bonamoussadi'] }),
    403,
  )
  assert.equal(
    await ownerA.api('PUT', '/api/shipments/z-yde', { ...zone, locationIds: ['mendong', 'akwa_vendor-b'] }),
    403,
  )
  assert.deepEqual((await db.doc('shipments/z-yde').get()).get('locationIds'), ['mendong', 'etoudi'])
  ok("locations: each store lists its own; a zone with another store's location is refused")

  // A forged store cookie doesn't open B's store.
  const forged = as(`${await signIn('admin@test.cm')}; current-store=vendor-b`)
  await pageHas(forged, '/products', ['Café Ginseng'], ['Miel de B'])
  ok('a forged current-store cookie for B still shows A')

  // B sees its own data, not A's.
  await pageHas(ownerB, '/products', ['Miel de B'], ['Café Ginseng'])
  await pageHas(ownerB, '/orders', ['Bertrand Bee'], ['Awa Test', 'Mixte Client'])
  ok("B's admin: B's data only")

  // Roles: staff manage the catalogue but not settings or team.
  await pageHas(staffA, '/products', ['Café Ginseng'], [])
  await pageHas(staffA, '/settings', ['Only the store owner'], ['name="slug"'])
  await pageHas(staffA, '/team', ['Only the store owner'], [])
  await pageHas(ownerA, '/settings', ['name="slug"', 'value="nature-gift"'], [])
  ok('staff: catalogue yes, settings and team no; owner: settings')

  // Platform console: platform admin only, in its own area (sidebar, header) apart from the
  // store dashboards; a store's dashboard links to it only for the platform admin.
  await pageHas(ownerA, '/platform', ['Reserved to the platform administrator'], ['Boutique Bertrand'])
  await pageHas(ownerA, '/products', ['Café Ginseng'], ['href="/platform"', 'Platform console'])
  await pageHas(
    platform,
    '/platform',
    ['N.Gift', 'Boutique Bertrand', 'Record cash payment', 'Super admin', 'Marketplace products'],
    ['Abandoned checkouts', 'Store settings'],
  )
  await pageHas(platform, '/products', ['No store selected', 'href="/platform"'], ['Café Ginseng', 'Miel de B'])
  const home = await platform.page('/')
  assert.equal(home.status, 307)
  assert.match(home.location, /\/platform$/)
  ok('platform console: refused to a store owner, its own area for the platform admin (no store menu), who lands there without a store')

  // The list pages read in words: what a promotion gives, a blog's type, statuses.
  await pageHas(ownerA, '/promotions', ['New promotion', 'Automatic', 'PUB-CAFE', '-10%', 'Active'], [])
  await pageHas(ownerA, '/blogs', ['New article', 'Sales page', '/blogs/test-pub', 'Published'], [])
  await pageHas(ownerA, '/products', ['New product', 'Café Ginseng', 'Published'], [])
  ok('list pages: promotions show their discount and how they apply, blogs their type, statuses in words')

  // Media upload: store members only; images and videos only, under their size limit. Refused
  // before anything is sent to Cloudinary (absent here).
  const upload = async (cookie, files) => {
    const body = new FormData()
    for (const [name, type, size] of files) body.append('files', new Blob([new Uint8Array(size)], { type }), name)
    const res = await fetch(`${ADMIN}/api/media/upload`, { method: 'POST', headers: cookie ? { cookie } : {}, body })
    return { status: res.status, error: (await res.json().catch(() => ({}))).error }
  }
  const photo = ['photo.jpg', 'image/jpeg', 10]
  assert.equal((await upload(null, [photo])).status, 403)
  assert.equal((await upload(cookies.platform, [photo])).status, 403, 'no store')
  let refused = await upload(cookies.ownerA, [['notes.pdf', 'application/pdf', 10]])
  assert.deepEqual([refused.status, refused.error], [400, 'notes.pdf: images and videos only.'])
  refused = await upload(cookies.ownerA, [photo, ['big.png', 'image/png', 10 * 1024 * 1024 + 1]])
  assert.deepEqual([refused.status, refused.error], [400, 'big.png: over 10 MB.'])
  assert.equal((await upload(cookies.ownerA, [])).status, 400)
  ok('media upload: refused signed out and without a store; only images (10 MB) and videos (100 MB), with the reason')

  console.log(`All ${step} admin checks passed\n`)
}
