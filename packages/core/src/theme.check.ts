// Self-check for theme and theme-preview. Run: npx tsx packages/core/src/theme.check.ts
import assert from 'node:assert/strict'
import {
  contrastProblems,
  contrastRatio,
  hexToHsl,
  hslToHex,
  parseHsl,
  PRESETS,
  readableOn,
  themeCss,
  themeOf,
  themeVariables,
  THEME_PRESETS,
  videoEmbedUrl,
} from './theme'
import { isPreviewToken, previewToken } from './theme-preview'

// Contrast: the WCAG reference values
assert.equal(contrastRatio('0 0% 0%', '0 0% 100%'), 21)
assert.equal(contrastRatio('0 0% 100%', '0 0% 0%'), 21)
assert.equal(contrastRatio('163 94% 24%', '163 94% 24%'), 1)
assert.ok(Math.abs(contrastRatio('0 0% 46%', '0 0% 100%') - 4.6) < 0.1) // #767676 ≈ 4.54
assert.equal(readableOn('0 0% 100%'), '0 0% 0%')
assert.equal(readableOn('163 94% 24%'), '0 0% 100%')

// HSL parsing and hex conversion (the admin's color pickers)
assert.deepEqual(parseHsl('163 94% 24%'), [163, 94, 24])
for (const bad of ['163 94 24', '400 10% 10%', '1 101% 1%', 'red', '', null, '1 1% 1%;}x']) {
  assert.equal(parseHsl(bad), null, String(bad))
}
assert.equal(hexToHsl('#ffffff'), '0 0% 100%')
assert.equal(hexToHsl('#000000'), '0 0% 0%')
assert.equal(hexToHsl('nope'), null)
assert.equal(hslToHex('0 0% 100%'), '#ffffff')
assert.ok(contrastRatio(hexToHsl(hslToHex('163 94% 24%'))!, '163 94% 24%') < 1.02) // rounding only

// Every preset passes its own rules
for (const preset of THEME_PRESETS) {
  assert.deepEqual(contrastProblems(PRESETS[preset].colors), [], preset)
}

// Low contrast is refused, with the failing pair named
const pale = { ...PRESETS.nature.colors, primary: '163 60% 70%' }
assert.match(contrastProblems(pale).join('\n'), /primary\) on the background: \d\.\d\d:1/)
const grey = { ...PRESETS.nature.colors, foreground: '0 0% 70%' }
assert.match(contrastProblems(grey)[0], /^Text on the background/)
// A dark background makes the fixed error and sale colors unreadable
const dark = { primary: '163 94% 60%', background: '0 0% 5%', foreground: '0 0% 98%' }
assert.ok(contrastProblems(dark).some(p => p.startsWith('Error messages')))
// Anything that isn't an HSL triple (CSS injection) is refused before any math
assert.deepEqual(contrastProblems({ ...PRESETS.nature.colors, primary: '0 0% 0%;}body{x' }), [
  'primary: not a color',
])

// CSS variables: readable button text, muted text still readable, the chosen font
const vars = themeVariables(themeOf({ preset: 'bold' }))
assert.equal(vars['--primary-foreground'], '0 0% 100%')
assert.ok(contrastRatio(vars['--muted-foreground'], vars['--background']) >= 4.5)
assert.equal(vars['--font-theme'], 'var(--font-poppins)')
assert.equal(vars['--radius'], '1rem')
assert.ok(themeCss(themeOf(null)).startsWith(':root{--background:0 0% 100%;'))

// themeOf: preset defaults under the saved values, default sections
const t = themeOf({ preset: 'minimal', colors: { primary: '10 80% 30%' } as never })
assert.equal(t.colors.primary, '10 80% 30%')
assert.equal(t.colors.background, PRESETS.minimal.colors.background)
assert.equal(t.font, 'inter')
assert.equal(t.sections?.[0].type, 'hero')
assert.equal(themeOf({ preset: 'unknown' as never }).preset, 'nature')

// Videos: YouTube and Vimeo only
assert.equal(
  videoEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=3'),
  'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
)
assert.equal(
  videoEmbedUrl('https://youtu.be/dQw4w9WgXcQ'),
  'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
)
assert.equal(
  videoEmbedUrl('https://vimeo.com/123456789'),
  'https://player.vimeo.com/video/123456789',
)
assert.equal(videoEmbedUrl('https://evil.com/watch?v=dQw4w9WgXcQ'), null)
assert.equal(videoEmbedUrl('javascript:alert(1)'), null)

// Preview tokens: per store, expiring, signed with the shared secret
const now = 1_800_000_000_000
const token = previewToken('s3cret', 'store-a', now)
assert.ok(isPreviewToken('s3cret', 'store-a', token, now + 1000))
assert.ok(!isPreviewToken('s3cret', 'store-b', token, now + 1000), 'another store')
assert.ok(!isPreviewToken('other', 'store-a', token, now + 1000), 'another secret')
assert.ok(!isPreviewToken('s3cret', 'store-a', token, now + 3600_001), 'expired')
assert.ok(!isPreviewToken(undefined, 'store-a', token, now), 'no secret configured')
assert.ok(
  !isPreviewToken('s3cret', 'store-a', `${now + 5000}.${token.split('.')[1]}`, now),
  'moved expiry',
)
for (const bad of ['', null, 'x', '1.2', 'abc.def'])
  assert.ok(!isPreviewToken('s3cret', 'store-a', bad, now))

console.log('theme: all checks passed')
