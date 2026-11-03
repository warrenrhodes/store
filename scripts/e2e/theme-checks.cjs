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

  // Live preview, in a real browser on the admin's theme page: a color reaches the preview at
  // once; a text edit is saved as the draft by itself and the preview reloads with it.
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
      await tab.goto(`${ADMIN}/theme`)
      const preview = tab.frameLocator('iframe[title="Storefront preview"]')
      await preview.getByText('Bienvenue chez A').first().waitFor()
      await tab.locator('input[name=primary]').fill('#0b5394')
      const previewPrimary = () =>
        tab
          .frames()
          .find(f => f.url().includes(`${A}?preview=`))
          ?.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--primary').trim())
      await until(async () => (await previewPrimary()) === '208 86% 31%', 'color in the preview')
      await until(
        async () => (await storeA()).themeDraft?.colors.primary === '208 86% 31%',
        'color saved as the draft',
      )
      await tab.locator('#hero-title').fill('Titre en direct')
      await preview.getByText('Titre en direct').first().waitFor({ timeout: 15000 })
      const live = await html(A)
      assert.ok(!live.includes('Titre en direct') && live.includes('--primary:308 62% 30%'), 'published theme unchanged')
      ok('live preview: a color shows at once, a text edit is autosaved as the draft and shown; the storefront is unchanged')
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
          await tab.getByText(p ? 'Café Ginseng' : 'Bienvenue chez A').first().waitFor()
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
