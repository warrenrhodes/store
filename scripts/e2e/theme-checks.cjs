// Phase 3 checks: store themes (docs/MULTI_TENANT_PLAN.md, 3.7). Run by run.cjs after the
// per-store checks, on store A (/boutique/ngift, stores/admin-uid). The theme page's forms are
// posted like a browser without JavaScript would; the accessibility audit (axe-core, already
// installed with eslint-plugin-jsx-a11y) runs in Chromium on each preset.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { browserTools } = require('./site-checks.cjs')

const A = '/boutique/ngift'
const B = '/boutique/boutique-bertrand'
const PAGES = ['', '/shop/cafe-ginseng', '/cart', '/checkout']

module.exports = async function themeChecks({
  db,
  STORE,
  ADMIN,
  AUTH_HOST,
  apiKey,
  ADMIN_APP,
  STORE_APP,
  revalidateSecret,
}) {
  let step = 0
  const ok = msg => console.log(`✔ ${++step}. ${msg}`)
  const manifest = require(
    path.join(
      ADMIN_APP,
      process.env.E2E_DIST_DIR || '.next-e2e',
      'server/server-reference-manifest.json',
    ),
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
    const login = await fetch(`${ADMIN}/api/login`, {
      headers: { Authorization: `Bearer ${(await r.json()).idToken}` },
    })
    return login.headers
      .getSetCookie()
      .map(c => c.split(';')[0])
      .join('; ')
  }
  const submit = async (cookie, action, fields) => {
    const body = new FormData()
    body.append(`$ACTION_ID_${actionId(action)}`, '')
    for (const [k, v] of Object.entries(fields)) body.append(k, v)
    const res = await fetch(`${ADMIN}/theme`, {
      method: 'POST',
      headers: { cookie },
      body,
      redirect: 'manual',
    })
    return decodeURIComponent((res.headers.get('location') ?? '').replace(/\+/g, ' '))
  }
  const html = async p => (await fetch(STORE + p)).text()
  const storeA = async () => (await db.doc('stores/admin-uid').get()).data()

  const owner = await signIn('admin@test.cm')
  const staff = await signIn('staff@test.cm')
  const sections = [
    {
      id: 'hero',
      type: 'hero',
      title: 'Bienvenue chez A',
      subtitle: 'Le café du matin',
      ctaLabel: 'Voir',
      ctaHref: '/shop',
    },
    {
      id: 'faq',
      type: 'faq',
      title: null,
      items: [{ question: 'Livrez-vous à Douala ?', answer: 'Oui, en 48 h.' }],
    },
    { id: 'txt', type: 'richText', title: 'Caché', text: 'Texte caché', hidden: true },
    { id: 'products', type: 'featuredProducts', source: 'all', limit: 4 },
    { id: 'reviews', type: 'reviews', limit: 3 },
    { id: 'video', type: 'video', url: 'https://youtu.be/dQw4w9WgXcQ' },
  ]
  const form = {
    preset: 'nature',
    primary: '#7c1d6f',
    background: '#ffffff',
    foreground: '#1a1a1a',
    accent: '#f3e8f1',
    radius: '0.5',
    font: 'playfair',
    logoUrl: '',
    faviconUrl: '',
    announcement: '  Livraison à Douala   · Paiement à la livraison ',
    sections: JSON.stringify(sections),
  }

  // Refused, nothing saved: low contrast, a bad section, a non-color, staff.
  const before = await storeA()
  let r = await submit(owner, 'saveTheme', { ...form, intent: 'publish', primary: '#a8e6cf' })
  assert.match(r, /Not readable enough\. .*primary\) on the background: 1\.\d\d:1/, r)
  r = await submit(owner, 'saveTheme', { ...form, intent: 'publish', foreground: '#bbbbbb' })
  assert.match(r, /Text on the background/, r)
  r = await submit(owner, 'saveTheme', {
    ...form,
    intent: 'draft',
    sections: JSON.stringify([{ id: 'v', type: 'video', url: 'https://evil.com/x' }]),
  })
  assert.match(r, /Section 1 \(video\): url: a YouTube or Vimeo address/, r)
  r = await submit(owner, 'saveTheme', { ...form, intent: 'draft', primary: 'red;}body{x' })
  assert.match(r, /primary: pick a color/, r)
  await submit(staff, 'saveTheme', { ...form, intent: 'publish' })
  assert.deepEqual(await storeA(), before)
  ok('theme refused: low contrast (ratio named), invalid section, non-color, staff; nothing saved')

  // Draft: only the signed preview link shows it, on this store only.
  r = await submit(owner, 'saveTheme', { ...form, intent: 'draft' })
  assert.match(r, /Draft saved/, r)
  const a = await storeA()
  assert.equal(a.theme ?? null, null)
  assert.equal(a.themeDraft.colors.primary.split(' ')[0], '308') // #7c1d6f
  assert.equal(a.themeDraft.sections.length, 6)
  const themePage = await (await fetch(`${ADMIN}/theme`, { headers: { cookie: owner } })).text()
  const token = decodeURIComponent(themePage.match(/\?preview=([^"&]+)/)[1])
  const live = await html(A)
  assert.ok(!live.includes('Bienvenue chez A') && !live.includes('var(--font-playfair)'))
  const preview = await html(`${A}?preview=${encodeURIComponent(token)}`)
  for (const text of [
    'Bienvenue chez A',
    'Livrez-vous à Douala ?',
    '--font-theme:var(--font-playfair)',
    '--radius:0.5rem',
    'youtube-nocookie.com/embed/dQw4w9WgXcQ',
  ]) {
    assert.ok(preview.includes(text), `preview should show ${text}`)
  }
  assert.ok(!preview.includes('Texte caché'), 'a hidden section is not shown')
  assert.ok(
    !(await html(`${A}?preview=${encodeURIComponent(token)}x`)).includes('Bienvenue chez A'),
  )
  assert.ok(!(await html(`${A}?preview=1.abc`)).includes('Bienvenue chez A'))
  // The token is A's: B's draft never shows with it.
  await db
    .doc('stores/vendor-b')
    .update({
      themeDraft: {
        ...a.themeDraft,
        sections: [{ id: 'h', type: 'hero', title: 'Brouillon de B' }],
      },
    })
  await fetch(`${STORE}/api/revalidate`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${revalidateSecret}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags: ['store:vendor-b'] }),
  })
  assert.ok(!(await html(`${B}?preview=${encodeURIComponent(token)}`)).includes('Brouillon de B'))
  await db.doc('stores/vendor-b').update({ themeDraft: null })
  ok(
    "draft: shown only with the admin's signed preview link (not tampered, not on B); hidden section absent",
  )

  // Publish: the storefront changes at once, B doesn't; the draft is gone.
  r = await submit(owner, 'saveTheme', { ...form, intent: 'publish' })
  assert.match(r, /Published/, r)
  assert.equal((await storeA()).themeDraft, null)
  const published = await html(A)
  for (const text of [
    'Bienvenue chez A',
    'Livrez-vous à Douala ?',
    '--font-theme:var(--font-playfair)',
    '--primary:308 62% 30%',
    'Livraison à Douala · Paiement à la livraison',
  ]) {
    assert.ok(published.includes(text), `published home should show ${text}`)
  }
  const homeB = await html(B)
  assert.ok(!homeB.includes('Livraison à Douala'), "A's announcement stays on A")
  assert.ok(
    !homeB.includes('--font-theme:var(--font-playfair)') && !homeB.includes('Bienvenue chez A'),
  )
  assert.ok(
    !(await html('/')).includes('--font-theme:var(--font-playfair)'),
    'marketplace unchanged',
  )
  ok('publish: A shows its theme and sections at once; B and the marketplace keep theirs')

  // Live preview, in a real browser on the admin's theme page: the preview is the storefront's
  // sample page, fed by postMessage. A color and a text edit show at once without any reload
  // or server call from the preview; nothing in it can be clicked; the edit is still autosaved.
  const tools = browserTools()
  if (!tools) {
    console.log('- live preview: skipped (no Playwright Chromium found)')
  } else {
    const browser = await tools.chromium.launch({ executablePath: tools.executablePath })
    try {
      const context = await browser.newContext()
      await context.addCookies(
        owner.split('; ').map(c => {
          const i = c.indexOf('=')
          return { name: c.slice(0, i), value: c.slice(i + 1), url: ADMIN }
        }),
      )
      const tab = await context.newPage()
      const isPreview = f => f.url().startsWith(`${STORE}/theme_preview`)
      const calls = []
      tab.on('request', r => {
        if (isPreview(r.frame()) && (r.method() !== 'GET' || r.url().includes('/api/'))) {
          calls.push(`${r.method()} ${r.url()}`)
        }
      })
      await tab.goto(`${ADMIN}/theme`)
      const preview = tab.frameLocator('iframe[title="Storefront preview"]')
      await preview.getByText('Bienvenue chez A').first().waitFor()
      await preview.getByText('Savon au karité').first().waitFor()
      assert.equal(await preview.getByText('Café Ginseng').count(), 0, 'sample products only')
      assert.equal(await preview.locator('[inert]').count(), 1, 'nothing clickable')
      // A marker in the preview's window: still there at the end if it never reloaded.
      await tab.frames().find(isPreview).evaluate(() => (window.__kept = true))
      await tab.locator('input[name=primary]').fill('#0b5394')
      const previewPrimary = () =>
        tab
          .frames()
          .find(isPreview)
          ?.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--primary').trim())
      await until(async () => (await previewPrimary()) === '208 86% 31%', 'color in the preview')
      await tab.locator('#hero-title').fill('Titre en direct')
      await preview.getByText('Titre en direct').first().waitFor({ timeout: 3000 })
      await until(
        async () => (await storeA()).themeDraft?.sections?.[0]?.title === 'Titre en direct',
        'edit saved as the draft',
      )
      assert.equal((await storeA()).themeDraft.colors.primary, '208 86% 31%')
      assert.ok(
        await tab.frames().find(isPreview).evaluate(() => window.__kept === true),
        'the preview never reloads',
      )
      assert.deepEqual(calls, [], 'the preview calls no server')
      const live = await html(A)
      assert.ok(!live.includes('Titre en direct') && live.includes('--primary:308 62% 30%'), 'published theme unchanged')
      ok('live preview: sample products, nothing clickable; a color and a text edit show at once with no reload and no server call; autosaved as the draft; the storefront is unchanged')

      // A blog page's looping countdown (seed: ended 1 h ago, 24 h cycle): restarted at ~23 h.
      await tab.goto(`${STORE}/boutique/ngift/blogs/test-pub`)
      const timer = tab.getByRole('timer')
      await timer.getByText('Plus que quelques heures').waitFor()
      const shown = () => timer.locator('.tabular-nums').allTextContents()
      const first = await shown()
      assert.equal(first.length, 3, 'no days box under a day')
      assert.equal(first[0], '22', 'loop restarted after its end date')
      await until(async () => (await shown()).join() !== first.join(), 'the timer ticks')
      ok('blog countdown: a loop past its end date starts a new 24 h cycle, with its label, and ticks')

      // The order form's place on an ad page: the position field, the builder's block, the tag.
      const pub = (await db.doc('blogs/pub').get()).data()
      const adPage = (id, html, orderFormPosition) =>
        db.doc(`blogs/${id}`).set({
          ...pub,
          slug: id,
          associateProductPath: 'products/the',
          countdown: null,
          orderFormPosition,
          content: { ...pub.content, content: html },
        })
      const article = '<p id="before">Avant</p><p id="after">Après</p>'
      await adPage('form-end', article, null)
      await adPage('form-start', article, 'start')
      await adPage('form-block', '<section id="wrap"><p id="before">Avant</p><div data-order-form=""></div><p id="after">Après</p></section>', 'start')
      await adPage('form-tag', '<p id="before">Avant</p>{{orderForm}}<p id="after">Après</p>{{orderForm}}', 'start')
      const form = tab.locator('#checkout-form')
      const openAd = async id => {
        await tab.goto(`${STORE}/boutique/ngift/blogs/${id}`)
        await form.waitFor({ timeout: 15000 }).catch(async e => {
          throw new Error(`${id}: ${e.message}\n${(await tab.locator('body').innerText()).slice(0, 500)}`)
        })
        assert.equal(await form.count(), 1, `${id}: one form`)
      }
      const isBefore = (a, b) =>
        tab.evaluate(
          ([a, b]) =>
            !!(document.querySelector(a).compareDocumentPosition(document.querySelector(b)) &
              Node.DOCUMENT_POSITION_FOLLOWING),
          [a, b],
        )
      await openAd('form-end')
      assert.ok(await isBefore('#after', '#checkout-form'), 'default: after the content')
      // Details or comment: only once a listed delivery area is picked, never with a typed address.
      const notes = form.getByText('Précisions ou commentaire')
      const zone = form.locator('button[role=combobox][aria-haspopup=dialog]')
      assert.equal(await notes.count(), 0, 'no area yet: no notes')
      await zone.click()
      await tab.getByRole('option').first().click()
      await notes.waitFor()
      await zone.click()
      await tab.getByRole('button', { name: "Mon quartier n'est pas dans la liste" }).click()
      await form.locator('input[name=address]').waitFor()
      assert.equal(await notes.count(), 0, 'typed address: no notes')
      await openAd('form-start')
      assert.ok(await isBefore('#checkout-form', '#before'), 'start: before the content')
      await openAd('form-tag')
      assert.ok(await isBefore('#before', '#checkout-form'), 'tag: after what precedes it')
      assert.ok(await isBefore('#checkout-form', '#after'), 'tag: before what follows it')
      assert.equal(await tab.getByText('{{orderForm}}').count(), 0, 'the tag never shows')
      await openAd('form-block')
      assert.equal(await tab.locator('#wrap [data-order-form] #checkout-form').count(), 1, 'block: inside its section, over the position field')
      assert.ok(await isBefore('#before', '#checkout-form'))
      assert.ok(await isBefore('#checkout-form', '#after'))
      // What the customer typed survives the page's updates (the quantity bar).
      await form.locator('input[name=fullName]').fill('Awa Test')
      await tab.locator('footer button').last().click()
      await tab.locator('footer').getByText('2', { exact: true }).waitFor()
      assert.equal(await form.locator('input[name=fullName]').inputValue(), 'Awa Test', 'form kept')
      assert.equal(await tab.locator('#wrap #checkout-form').count(), 1, 'still in its place')
      for (const id of ['form-end', 'form-start', 'form-block', 'form-tag']) await db.doc(`blogs/${id}`).delete()
      ok('ad page order form: at the end by default, at the start when set, or where the content places it (block or tag, which win), once; typed values survive a quantity change; details field only with a listed area')

      // Blog cover (one image, already set): no drop zone, a Replace button; a new pick replaces it.
      await tab.goto(`${ADMIN}/blogs/pub`)
      const replace = tab.getByRole('button', { name: 'Replace image' })
      await replace.waitFor()
      assert.equal(await tab.getByText('Drag & drop').isVisible(), false, 'drop zone hidden when full')
      await tab.locator('#fileInput').setInputFiles({
        name: 'new.png',
        mimeType: 'image/png',
        buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64'),
      })
      await tab.getByText('new.png').waitFor()
      assert.equal(await tab.getByRole('button', { name: 'Remove' }).count(), 1, 'replaced, not added')
      assert.equal(await tab.getByText(/files allowed|at most/).count(), 0, 'no limit error')
      assert.equal(new URL(tab.url()).pathname, '/blogs/pub', 'nothing submitted')
      ok('blog cover: once set, the drop zone gives way to "Replace image"; a new pick replaces it, no limit error')

      // The long forms' shared layout, on throwaway documents: sections show; Delete asks first;
      // Save changes saves and goes back to the list; Delete deletes.
      const copy = async (from, to, changes) =>
        db.doc(to).set({ ...(await db.doc(from).get()).data(), ...changes })
      const copied = (slug) => ({ slug, status: 'DRAFT', marketplaceListed: false, updatedAt: 'before' })
      await copy('products/cafe', 'products/form-test', {
        ...copied('form-test'),
        // Below its alert threshold: an almost sold-out product can still be edited.
        inventory: { quantity: 1, stockQuantity: 1, lowStockThreshold: 2 },
        metadata: { seoTitle: 'T', seoDescription: 'D', keywords: ['k'] },
      })
      await copy('promotions/p-pub', 'promotions/p-form-test', {
        status: 'DRAFT',
        updatedAt: 'before',
        code: 'FORM-TEST',
        usageCount: 0,
      })
      await copy('blogs/pub', 'blogs/form-test', copied('form-test'))
      for (const [path, list, sections, doc] of [
        ['/products/form-test', '/products', ['Product', 'Images', 'Price', 'Stock', 'Publishing', 'Organization'], 'products/form-test'],
        ['/promotions/p-form-test', '/promotions', ['Promotion', 'Conditions', 'Discount', 'Limits', 'Schedule'], 'promotions/p-form-test'],
        ['/blogs/form-test', '/blogs', ['Article', 'Sales page', 'After the order', 'Publishing'], 'blogs/form-test'],
      ]) {
        await tab.goto(ADMIN + path)
        for (const title of sections) await tab.getByText(title, { exact: true }).first().waitFor()
        assert.equal(await tab.getByRole('button', { name: 'Upload', exact: true }).isVisible(), false, 'nothing to upload')
        if (doc.startsWith('promotions/')) {
          // A code promotion needs no condition (this one has none) to get its discount.
          const addAction = tab.getByRole('button', { name: 'Add Action' })
          assert.ok(await addAction.isEnabled(), 'code promotion: Add Action enabled')
          await tab.getByRole('combobox').filter({ hasText: 'Discount code' }).click()
          await tab.getByRole('option', { name: /^Automatic/ }).click()
          assert.ok(await addAction.isDisabled(), 'automatic without a condition: Add Action disabled')
          await tab.getByRole('combobox').filter({ hasText: 'Automatic' }).click()
          await tab.getByRole('option', { name: /^Discount code/ }).click()
        }
        const askDelete = async () => {
          await tab.getByRole('button', { name: 'Delete' }).click()
          const dialog = tab.getByRole('alertdialog')
          await dialog.waitFor()
          return dialog
        }
        await (await askDelete()).getByRole('button', { name: 'Cancel' }).click()
        assert.ok((await db.doc(doc).get()).exists, `${doc}: Cancel keeps it`)
        let pickedDay
        if (doc.startsWith('blogs/')) {
          // The countdown's end: a day in the calendar and a time.
          await tab.getByRole('button', { name: 'End date' }).click()
          const lastDay = tab.locator('[data-radix-popper-content-wrapper] button:not([disabled])').last()
          pickedDay = Number(await lastDay.innerText())
          await lastDay.click()
          await tab.getByRole('textbox', { name: 'End time' }).or(tab.getByLabel('End time')).first().fill('18:30')
        }
        await tab.getByRole('button', { name: 'Save changes' }).click()
        await tab.waitForURL(`**${list}`, { timeout: 15000 }).catch(async () => {
          throw new Error(`${path} not saved: ${await tab.locator('[role=status], li[role=status]').allInnerTexts()}`)
        })
        await until(async () => (await db.doc(doc).get()).get('updatedAt') !== 'before', `${doc} saved`)
        if (pickedDay) {
          const endsAt = new Date((await db.doc(doc).get()).get('countdown.endsAt'))
          assert.deepEqual([endsAt.getDate(), endsAt.getHours(), endsAt.getMinutes()], [pickedDay, 18, 30])
        }
        await tab.goto(ADMIN + path)
        await (await askDelete()).getByRole('button', { name: 'Delete' }).click()
        await until(async () => !(await db.doc(doc).get()).exists, `${doc} deleted`)
        await tab.waitForURL(`**${list}`)
      }
      ok('blog, product and promotion forms: sections show, Save changes saves and goes back to the list (also a product below its alert threshold), Delete asks first (Cancel keeps it) then deletes; a code promotion takes a discount without a condition, an automatic one needs a condition first')

      // The account menu: one row in the sidebar, its links only once opened.
      const accountMenu = async (page, url) => {
        await page.goto(url)
        const links = page.getByRole('menuitem')
        assert.equal(await links.count(), 0, 'closed by default')
        await page.getByRole('button', { name: 'Account menu' }).click()
        await links.first().waitFor()
        return links
      }
      const ownerMenu = await accountMenu(tab, `${ADMIN}/products`)
      assert.deepEqual(await ownerMenu.allInnerTexts(), ['View my store', 'Copy store link', 'Sign in'])
      assert.match(await ownerMenu.first().getAttribute('href'), /\/boutique\/ngift/)
      const adminContext = await browser.newContext()
      await adminContext.addCookies(
        (await signIn('platform@test.cm')).split('; ').map(c => {
          const i = c.indexOf('=')
          return { name: c.slice(0, i), value: c.slice(i + 1), url: ADMIN }
        }),
      )
      const adminTab = await adminContext.newPage()
      const consoleMenu = await accountMenu(adminTab, `${ADMIN}/platform`)
      assert.deepEqual(await consoleMenu.allInnerTexts(), ['Store dashboard', 'Sign in'])
      assert.equal(await consoleMenu.first().getAttribute('href'), '/')
      const dashboardMenu = await accountMenu(adminTab, `${ADMIN}/products`)
      assert.deepEqual(await dashboardMenu.allInnerTexts(), ['Platform console', 'Sign in'])
      assert.equal(await dashboardMenu.first().getAttribute('href'), '/platform')
      await adminContext.close()
      ok('account menu: closed by default; store links for an owner, the way between the store dashboard and the console for a platform admin')
    } finally {
      await browser.close()
    }
  }

  // Presets go to the draft and keep the sections; discarding goes back to the published theme.
  r = await submit(owner, 'applyThemePreset', { preset: 'bold' })
  assert.match(r, /Preset bold applied/, r)
  let d = (await storeA()).themeDraft
  assert.equal(d.preset, 'bold')
  assert.equal(d.font, 'poppins')
  assert.equal(d.sections.length, 6)
  r = await submit(owner, 'discardThemeDraft', {})
  assert.match(r, /Draft discarded/, r)
  assert.equal((await storeA()).themeDraft, null)
  assert.equal((await storeA()).theme.font, 'playfair')
  ok('preset applied to the draft (sections kept), then discarded: published theme untouched')

  // Accessibility: home, product, cart and checkout of A with each preset, no serious or
  // critical axe violation.
  if (!tools) {
    console.log('- accessibility audit: skipped (no Playwright Chromium found)')
  } else {
    const axeSource = fs.readFileSync(
      path.join(
        path.dirname(require.resolve('axe-core/package.json', { paths: [STORE_APP] })),
        'axe.min.js',
      ),
      'utf8',
    )
    const browser = await tools.chromium.launch({ executablePath: tools.executablePath })
    const found = []
    try {
      for (const preset of ['nature', 'minimal', 'bold']) {
        await submit(owner, 'applyThemePreset', { preset })
        const draft = (await storeA()).themeDraft
        await submit(owner, 'saveTheme', {
          ...form,
          // No video: the audit stays offline (the embed is a third-party frame anyway).
          sections: JSON.stringify(sections.filter(s => s.type !== 'video')),
          intent: 'publish',
          preset,
          primary: hex(draft.colors.primary),
          background: hex(draft.colors.background),
          foreground: hex(draft.colors.foreground),
          accent: hex(draft.colors.accent),
          radius: String(draft.radius),
          font: draft.font,
        })
        assert.equal((await storeA()).theme.preset, preset)
        const tab = await browser.newPage()
        await tab.goto(`${STORE}${A}/shop/cafe-ginseng?autoAddToCart=1`)
        await tab.waitForURL(`**${A}/checkout`)
        for (const p of PAGES) {
          const res = await tab.goto(`${STORE}${A}${p}`, { waitUntil: 'networkidle' })
          assert.equal(res.status(), 200, `${preset} ${A}${p}`)
          // A real page, not an error page: the cart's product, or the home's own banner.
          await tab
            .getByText(p ? 'Café Ginseng' : 'Bienvenue chez A')
            .first()
            .waitFor({ timeout: 15000 })
            .catch(async e => {
              const text = (await tab.locator('body').innerText()).slice(0, 600)
              throw new Error(`${preset} ${A}${p}: ${e.message}\n${text}`)
            })
          await tab.addScriptTag({ content: axeSource })
          const { passes, violations } = await tab.evaluate(async () => {
            // eslint-disable-next-line no-undef
            const result = await axe.run(document)
            return {
              passes: result.passes.length,
              violations: result.violations
                .filter(v => v.impact === 'serious' || v.impact === 'critical')
                .map(v => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`),
            }
          })
          assert.ok(passes > 10, `axe ran on ${preset} ${A}${p} (${passes} rules passed)`)
          for (const v of violations) found.push(`${preset} ${A}${p}: ${v}`)
        }
        await tab.close()
      }
    } finally {
      await browser.close()
    }
    assert.deepEqual(found, [], `accessibility:\n${found.join('\n')}`)
    ok(`accessibility: ${PAGES.length} pages × 3 presets, no serious or critical axe violation`)
  }

  console.log(`All ${step} theme checks passed\n`)
}

/** "306 62% 30%" → "#7c1d6f" (same math as @ngift/core/theme hslToHex). */
function hex(hsl) {
  const [h, s, l] = hsl.match(/[\d.]+/g).map(Number)
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100)
  const f = n => {
    const k = (n + h / 30) % 12
    return Math.round(255 * (l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))))
  }
  return '#' + [f(0), f(8), f(4)].map(v => v.toString(16).padStart(2, '0')).join('')
}

/** Waits up to 10 s for `check` to be true. */
async function until(check, what) {
  for (let i = 0; i < 50; i++) {
    if (await check().catch(() => false)) return
    await new Promise(r => setTimeout(r, 200))
  }
  throw new Error(`timed out waiting for: ${what}`)
}
