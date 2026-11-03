// Phase 5 checks: self-service sign-up of a seller (account, then /onboarding), the platform's
// cash payment that opens the storefront, the getting-started list, and the legal pages of a
// store and of the marketplace. Run by run.cjs after the marketplace checks.
const assert = require('node:assert/strict')
const adminSession = require('./admin-session.cjs')

module.exports = async function commerceChecks({ db, STORE, ADMIN, AUTH_HOST, apiKey, ADMIN_APP }) {
  let step = 0
  const ok = msg => console.log(`✔ ${++step}. ${msg}`)
  const { signIn, submit, get } = adminSession({ ADMIN, AUTH_HOST, apiKey, ADMIN_APP })
  const page = async p => {
    const res = await fetch(STORE + p, { redirect: 'manual' })
    return { status: res.status, html: await res.text() }
  }

  // A seller signs up (the admin's sign-up form creates the Firebase account).
  const email = `vendeuse-${Date.now()}@test.cm`
  const signUp = await fetch(
    `http://${AUTH_HOST}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'Test1234!', returnSecureToken: true }),
    },
  )
  assert.equal(signUp.status, 200)
  const seller = await signIn(email)
  const home = await fetch(`${ADMIN}/`, { headers: { cookie: seller }, redirect: 'manual' })
  assert.equal(home.status, 307)
  assert.match(home.headers.get('location'), /\/onboarding$/)
  assert.match((await get(seller, '/onboarding')).html, /Create your store/)

  const form = { name: 'Chez Mireille', slug: 'chez-mireille', preset: 'bold', terms: 'on' }
  let r = await submit(seller, '/onboarding', 'createMyStore', { ...form, terms: '' })
  assert.match(r, /Accept the seller terms/)
  r = await submit(seller, '/onboarding', 'createMyStore', { ...form, slug: 'ngift' })
  assert.match(r, /already taken/)
  r = await submit(seller, '/onboarding', 'createMyStore', { ...form, preset: 'neon' })
  assert.match(r, /Pick a look/)
  r = await submit(seller, '/onboarding', 'createMyStore', form)
  assert.match(r, /\/\?welcome=1$/, r)
  const storeId = (await db.doc('storeSlugs/chez-mireille').get()).get('storeId')
  assert.ok(storeId)
  const store = (await db.doc(`stores/${storeId}`).get()).data()
  assert.equal(store.status, 'pending')
  assert.equal(store.theme.preset, 'bold')
  assert.ok(store.termsAcceptedAt)
  const sellerUid = store.ownerUid
  assert.equal((await db.doc(`memberships/${storeId}_${sellerUid}`).get()).get('role'), 'owner')
  r = await submit(seller, '/onboarding', 'createMyStore', { ...form, slug: 'chez-mireille-2' })
  assert.match(r, /already have a store/)
  assert.ok(!(await db.doc('storeSlugs/chez-mireille-2').get()).exists)
  ok('sign-up: a new account is sent to /onboarding; terms, taken address and look checked; store created pending with its theme; one store per account')

  // Its dashboard: the getting-started list; its storefront stays closed until it pays.
  const dashboard = (await get(seller, '/')).html
  assert.match(dashboard, /Get your store ready/)
  assert.match(dashboard, /1 of 5 done/)
  assert.equal((await page('/boutique/chez-mireille')).status, 404)
  ok('pending store: getting-started list on the dashboard (1 of 5 done: the look), storefront 404')

  // The platform records the cash payment: the storefront opens with the chosen look. The
  // owner's email is skipped (no NotificationAPI credentials in the tests), without error.
  const platform = await signIn('platform@test.cm')
  r = await submit(platform, '/platform', 'recordCashPayment', {
    storeId,
    amount: '5000',
    months: '1',
    note: 'onboarding test',
  })
  assert.match(r, /Payment recorded/, r)
  assert.equal((await db.doc(`stores/${storeId}`).get()).get('status'), 'active')
  const opened = await page('/boutique/chez-mireille')
  assert.equal(opened.status, 200)
  assert.ok(opened.html.includes('--font-theme:var(--font-poppins)'), 'the bold preset')
  assert.ok(opened.html.includes('Chez Mireille'))
  assert.match((await get(seller, '/')).html, /2 of 5 done/)
  ok('cash payment recorded by the platform: store active, storefront open with its preset; list at 2 of 5')

  // Legal pages: the store's from its settings, the marketplace's with the seller terms.
  r = await submit(seller, '/settings', 'saveStoreSettings', {
    name: 'Chez Mireille',
    slug: 'chez-mireille',
    whatsapp: '237677112233',
    contactEmail: 'mireille@test.cm',
    notificationEmails: '',
    notificationPhones: '',
    gtmIds: '',
    metaPixels: '',
    flockWebhookUrl: '',
    legalCompanyName: 'Mireille Ngo SARL',
    legalAddress: 'Douala, Akwa',
    legalRegistration: 'RC/DLA/2026/B/123',
    legalTaxId: 'M012600000001A',
    legalReturnPolicy: 'Échange sous 7 jours sur présentation du ticket.',
  })
  assert.match(r, /saved=1/, r)
  const terms = (await page('/boutique/chez-mireille/legal/conditions')).html
  for (const text of ['Conditions générales de vente', 'Mireille Ngo SARL', 'RC/DLA/2026/B/123', 'M012600000001A', 'Échange sous 7 jours']) {
    assert.ok(terms.includes(text), `store terms should show ${text}`)
  }
  const privacy = (await page('/boutique/chez-mireille/legal/confidentialite')).html
  assert.ok(privacy.includes('2024/017') && privacy.includes('mireille@test.cm'))
  assert.equal((await page('/boutique/chez-mireille/legal/mentions-legales')).status, 200)
  assert.equal((await page('/boutique/chez-mireille/legal/vendeurs')).status, 404)
  assert.equal((await page('/boutique/chez-mireille/legal/nope')).status, 404)
  const storeHome = (await page('/boutique/chez-mireille')).html
  assert.ok(storeHome.includes('href="/boutique/chez-mireille/legal/conditions"'), 'footer link')
  const sellerTerms = await page('/legal/vendeurs')
  assert.equal(sellerTerms.status, 200)
  assert.ok(sellerTerms.html.includes('Abonnement et paiement'))
  assert.ok((await page('/legal/conditions')).html.includes('marketplace'))
  assert.ok((await page('/')).html.includes('href="/legal/vendeurs"'))
  ok("legal pages: the store's terms, privacy and notice from its settings (company, RCCM, NIU, returns); marketplace terms and seller terms; footer links in each site")

  console.log(`All ${step} commerce checks passed\n`)
}
