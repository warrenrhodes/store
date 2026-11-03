// Admin forms (server actions) posted like a browser without JavaScript would: platform
// console, cash payments, store settings (several GTM containers and Meta Pixels), team.
// Run by run.cjs after the admin checks.
const assert = require('node:assert/strict')
const path = require('node:path')

module.exports = async function formChecks({ db, admin, ADMIN, AUTH_HOST, apiKey, ADMIN_APP }) {
  const manifest = require(
    path.join(ADMIN_APP, process.env.E2E_DIST_DIR || '.next-e2e', 'server/server-reference-manifest.json'),
  )
  const actionId = name =>
    Object.entries(manifest.node).find(([, v]) =>
      JSON.stringify(v).includes(`"exportedName":"${name}"`),
    )[0]

  const signIn = async email => {
    const r = await fetch(
      `http://${AUTH_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'Test1234!', returnSecureToken: true }),
      },
    )
    const { idToken } = await r.json()
    const login = await fetch(`${ADMIN}/api/login`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
    return login.headers
      .getSetCookie()
      .map(c => c.split(';')[0])
      .join('; ')
  }
  /** Posts a form like a browser without JavaScript; returns the redirect target. */
  const submit = async (cookie, page, action, fields) => {
    const body = new FormData()
    body.append(`$ACTION_ID_${actionId(action)}`, '')
    for (const [k, v] of Object.entries(fields)) body.append(k, v)
    const res = await fetch(ADMIN + page, {
      method: 'POST',
      headers: { cookie },
      body,
      redirect: 'manual',
    })
    const location = res.headers.get('location') ?? ''
    return {
      status: res.status,
      location: decodeURIComponent(location.replace(/\+/g, ' ')),
      setCookie: res.headers.getSetCookie(),
    }
  }
  const get = async (cookie, path) => (await fetch(ADMIN + path, { headers: { cookie } })).text()
  /** Calls a server action with plain arguments, as the admin's client components do. */
  const call = async (cookie, page, action, args) =>
    (
      await fetch(ADMIN + page, {
        method: 'POST',
        headers: {
          cookie,
          'Next-Action': actionId(action),
          'Content-Type': 'text/plain;charset=UTF-8',
          Accept: 'text/x-component',
        },
        body: JSON.stringify(args),
      })
    ).text()
  let step = 0
  const ok = m => console.log(`✔ ${++step}. ${m}`)

  const platform = await signIn('platform@test.cm')
  const ownerA = await signIn('admin@test.cm')
  const staffA = await signIn('staff@test.cm')
  const ownerB = await signIn('vendorb@test.cm')

  // Platform: create a store for an existing account, pending.
  let r = await submit(platform, '/platform', 'createStore', {
    name: 'Boutique C',
    slug: 'boutique-c',
    ownerEmail: 'staff@test.cm',
  })
  assert.match(r.location, /saved=Boutique C created/, JSON.stringify(r))
  const slugC = (await db.doc('storeSlugs/boutique-c').get()).data()
  const storeC = (await db.doc(`stores/${slugC.storeId}`).get()).data()
  assert.equal(storeC.status, 'pending')
  assert.equal(storeC.ownerUid, 'staff-a')
  assert.equal((await db.doc(`memberships/${slugC.storeId}_staff-a`).get()).get('role'), 'owner')
  r = await submit(platform, '/platform', 'createStore', {
    name: 'Dup',
    slug: 'boutique-c',
    ownerEmail: 'staff@test.cm',
  })
  assert.match(r.location, /already taken/)
  r = await submit(platform, '/platform', 'createStore', {
    name: 'Xavier',
    slug: 'boutique-x',
    ownerEmail: 'nobody@test.cm',
  })
  assert.match(r.location, /must sign up first/)
  r = await submit(ownerA, '/platform', 'createStore', {
    name: 'Hack',
    slug: 'hack-store',
    ownerEmail: 'admin@test.cm',
  })
  assert.ok(
    !(await db.doc('storeSlugs/hack-store').get()).exists,
    'a store owner cannot create stores',
  )
  ok(
    'platform: store created pending with its owner; duplicate slug, unknown owner and non-admin refused',
  )

  // Cash payment: activates, paidUntil 2 months ahead, logged.
  r = await submit(platform, '/platform', 'recordCashPayment', {
    storeId: slugC.storeId,
    amount: '5000',
    months: '2',
    note: 'cash Nov',
  })
  assert.match(r.location, /Payment recorded/)
  const paid = (await db.doc(`stores/${slugC.storeId}`).get()).data()
  assert.equal(paid.status, 'active')
  const days = (new Date(paid.paidUntil) - Date.now()) / 864e5
  assert.ok(days > 58 && days < 63, `paidUntil in ${days} days`)
  const payments = await db.collection('storePayments').where('storeId', '==', slugC.storeId).get()
  assert.equal(payments.size, 1)
  assert.equal(payments.docs[0].get('amount'), 5000)
  assert.equal(payments.docs[0].get('recordedBy'), 'platform@test.cm')
  r = await submit(platform, '/platform', 'recordCashPayment', {
    storeId: slugC.storeId,
    amount: '-3',
    months: '1',
  })
  assert.match(r.location, /Amount/)
  ok('cash payment: store active, paid ~2 months ahead, payment logged; bad amount refused')

  r = await submit(platform, '/platform', 'updateStoreFlags', {
    storeId: slugC.storeId,
    status: 'suspended',
  })
  r = await submit(platform, '/platform', 'updateStoreFlags', {
    storeId: slugC.storeId,
    plan: 'pro',
  })
  r = await submit(platform, '/platform', 'updateStoreFlags', {
    storeId: slugC.storeId,
    marketplaceListed: 'false',
  })
  const flags = (await db.doc(`stores/${slugC.storeId}`).get()).data()
  assert.deepEqual([flags.status, flags.plan, flags.marketplaceListed], ['suspended', 'pro', false])
  ok('platform flags: suspend, plan pro, hidden from marketplace')

  // Settings: several GTM containers and Meta Pixels, slug change, secrets kept server side.
  const settings = {
    name: 'N.Gift',
    slug: 'ngift',
    whatsapp: '+237 696 68 90 73',
    contactEmail: 'Contact@NGift.cm',
    notificationEmails: 'a@ngift.cm\nb@ngift.cm',
    notificationPhones: '+237696689073',
    gtmIds: 'gtm-aaaa111\nGTM-BBBB222',
    metaPixels: '111111111 TOKEN-ONE\n222222222',
    flockWebhookUrl: 'https://api.flock.com/hooks/sendMessage/x',
  }
  r = await submit(ownerA, '/settings', 'saveStoreSettings', settings)
  assert.match(r.location, /saved=1/, JSON.stringify(r))
  let a = (await db.doc('stores/admin-uid').get()).data()
  assert.equal(a.slug, 'ngift')
  assert.deepEqual(a.settings.gtmIds, ['GTM-AAAA111', 'GTM-BBBB222'])
  assert.deepEqual(a.settings.metaPixelIds, ['111111111', '222222222'])
  assert.equal(a.settings.whatsapp, '237696689073')
  assert.equal(a.settings.contactEmail, 'contact@ngift.cm')
  assert.ok((await db.doc('storeSlugs/ngift').get()).exists)
  assert.ok(!(await db.doc('storeSlugs/nature-gift').get()).exists)
  let secrets = (await db.doc('storeSecrets/admin-uid').get()).data()
  assert.deepEqual(secrets.metaCapiTokens, { 111111111: 'TOKEN-ONE' })
  assert.equal(secrets.flockWebhookUrl, settings.flockWebhookUrl)
  const page = await get(ownerA, '/settings')
  assert.ok(
    !page.includes('TOKEN-ONE') && !page.includes('hooks/sendMessage'),
    'secrets never sent to the browser',
  )
  assert.ok(page.includes('GTM-BBBB222') && page.includes('222222222'))
  ok('settings: 2 GTM + 2 Pixels saved, slug moved, secrets stored and not shown back')

  r = await submit(ownerA, '/settings', 'saveStoreSettings', {
    ...settings,
    metaPixels: '111111111\n222222222 TOKEN-TWO',
    flockWebhookUrl: '',
  })
  secrets = (await db.doc('storeSecrets/admin-uid').get()).data()
  assert.deepEqual(secrets.metaCapiTokens, { 111111111: 'TOKEN-ONE', 222222222: 'TOKEN-TWO' })
  assert.equal(secrets.flockWebhookUrl, settings.flockWebhookUrl)
  r = await submit(ownerA, '/settings', 'saveStoreSettings', {
    ...settings,
    metaPixels: '222222222',
    removeFlock: 'on',
  })
  secrets = (await db.doc('storeSecrets/admin-uid').get()).data()
  assert.deepEqual(secrets.metaCapiTokens, { 222222222: 'TOKEN-TWO' })
  assert.equal(secrets.flockWebhookUrl, null)
  ok('settings: a Pixel without token keeps its token, a removed Pixel loses it, Flock removed')

  const before = (await db.doc('stores/admin-uid').get()).data()
  r = await submit(ownerA, '/settings', 'saveStoreSettings', {
    ...settings,
    gtmIds: 'GTM-OK1234\nnot-a-gtm',
  })
  assert.match(r.location, /Invalid: not-a-gtm/)
  r = await submit(ownerA, '/settings', 'saveStoreSettings', { ...settings, slug: 'boutique-c' })
  assert.match(r.location, /already taken/)
  r = await submit(staffA, '/settings', 'saveStoreSettings', {
    ...settings,
    name: 'Staff was here',
  })
  assert.deepEqual((await db.doc('stores/admin-uid').get()).data(), before)
  ok('settings: invalid GTM and taken address refused, staff cannot save, nothing changed')

  // Team: invite an existing account (joins now) and a new email (joins at sign-in).
  r = await submit(ownerA, '/team', 'inviteMember', { email: 'vendorb@test.cm' })
  // No NotificationAPI in the tests: no email, so the owner is given the link to pass on.
  const notice = location => new URL(location, ADMIN).searchParams.get('saved')
  assert.match(notice(r.location), /joined the team\. No email could be sent: .* http:\/\/\S+\/sign-in$/)
  assert.equal((await db.doc('memberships/admin-uid_vendor-b').get()).get('role'), 'staff')
  r = await submit(ownerA, '/team', 'inviteMember', { email: 'New@Test.cm' })
  assert.match(notice(r.location), /when they sign up with this email\. .* http:\/\/\S+\/sign-up$/)
  assert.ok((await db.doc('invites/admin-uid_new@test.cm').get()).exists)
  await admin.auth().createUser({
    uid: 'new-user',
    email: 'new@test.cm',
    password: 'Test1234!',
    emailVerified: true,
  })
  const newUser = await signIn('new@test.cm')
  assert.ok((await get(newUser, '/products')).includes('Café Ginseng'), 'the invited user sees A')
  assert.equal((await db.doc('memberships/admin-uid_new-user').get()).get('role'), 'staff')
  assert.ok(!(await db.doc('invites/admin-uid_new@test.cm').get()).exists)
  ok('team: existing account joins as staff; invited email joins on first sign-in; without email service the link is shown')

  // B now belongs to two stores: the switcher picks A, a forged id is ignored.
  r = await submit(ownerB, '/', 'switchStore', { storeId: 'admin-uid' })
  const cookieB = `${ownerB}; ${r.setCookie.map(c => c.split(';')[0]).join('; ')}`
  assert.ok((await get(cookieB, '/products')).includes('Café Ginseng'))
  r = await submit(ownerB, '/', 'switchStore', { storeId: slugC.storeId })
  assert.equal(r.setCookie.length, 0, 'no cookie for a store B is not a member of')
  r = await submit(ownerA, '/team', 'removeMember', { uid: 'admin-uid' })
  assert.match(r.location, /owner cannot be removed/)
  r = await submit(ownerA, '/team', 'removeMember', { uid: 'vendor-b' })
  assert.ok(!(await db.doc('memberships/admin-uid_vendor-b').get()).exists)
  assert.ok(
    !(await get(cookieB, '/products')).includes('Café Ginseng'),
    'removed member loses access at once',
  )
  ok('switcher: member store opens, foreign store refused; owner kept; removed member loses access')

  // Locations per store: B's can't be changed or deleted by A; names are unique per store.
  const bona = (await db.doc('locations/bonamoussadi').get()).data()
  await call(ownerA, '/locations', 'updateLocation', [
    'bonamoussadi',
    { name: 'Hacked', city: 'Douala', isActive: false },
  ])
  await call(ownerA, '/locations', 'deleteLocation', ['bonamoussadi'])
  assert.deepEqual((await db.doc('locations/bonamoussadi').get()).data(), bona)
  const ofA = async () =>
    (await db.collection('locations').where('storeId', '==', 'admin-uid').get()).docs.map(d =>
      d.get('name'),
    )
  const countA = (await ofA()).length
  await call(ownerA, '/locations', 'createLocation', [
    { name: 'Bonamoussadi', city: 'Douala', isActive: true },
  ])
  await call(ownerA, '/locations', 'createLocation', [
    { name: 'mendong marche', city: 'yaounde', isActive: true },
  ])
  assert.equal((await ofA()).length, countA + 1)
  assert.ok((await ofA()).includes('Bonamoussadi'), "A may reuse a name B has")
  ok("locations: A can't edit or delete B's; same name as B's allowed, duplicate in A refused")

  console.log(`All ${step} form checks passed\n`)
}
