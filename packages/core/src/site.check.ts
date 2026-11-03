// Self-check for site. Run: npx tsx packages/core/src/site.check.ts
import assert from 'node:assert/strict'
import { MARKET, parseSitePath, siteHref, siteUrl, storeUrl } from './site'

// Links: prefixed in a store, unchanged on the marketplace and for external URLs
assert.equal(siteHref('a-b', '/shop'), '/boutique/a-b/shop')
assert.equal(siteHref('a-b', '/'), '/boutique/a-b')
assert.equal(siteHref('a-b', '/?promo=X'), '/boutique/a-b?promo=X')
assert.equal(siteHref('a-b', '/shop?category=cafe'), '/boutique/a-b/shop?category=cafe')
assert.equal(siteHref(MARKET, '/shop'), '/shop')
assert.equal(siteHref('a-b', 'https://wa.me/1'), 'https://wa.me/1')
assert.equal(siteHref('a-b', '//evil.com'), '//evil.com')
assert.equal(siteHref('a-b', '?tab=1'), '?tab=1')

// Proxy: only valid slugs open a store; anything else is a marketplace path
assert.deepEqual(parseSitePath('/boutique/ngift/shop/x'), { site: 'ngift', path: '/shop/x' })
assert.deepEqual(parseSitePath('/boutique/ngift'), { site: 'ngift', path: '/' })
assert.deepEqual(parseSitePath('/boutique/ngift/'), { site: 'ngift', path: '/' })
assert.deepEqual(parseSitePath('/shop'), { site: MARKET, path: '/shop' })
assert.deepEqual(parseSitePath('/'), { site: MARKET, path: '/' })
assert.deepEqual(parseSitePath('/boutique/_market/shop'), {
  site: MARKET,
  path: '/boutique/_market/shop',
})
assert.equal(parseSitePath('/boutique/Upper').site, MARKET)
assert.equal(parseSitePath('/boutique').site, MARKET)
// The marketplace can't be reached by its internal name either: /_market/x stays a market path.
assert.deepEqual(parseSitePath('/_market/shop'), { site: MARKET, path: '/_market/shop' })

// Absolute URLs
assert.equal(storeUrl('https://x.vercel.app/', { slug: 'ngift' }), 'https://x.vercel.app/boutique/ngift')
assert.equal(siteUrl('https://x.vercel.app', MARKET), 'https://x.vercel.app')
assert.equal(siteUrl('https://x.vercel.app', MARKET, '/shop/a'), 'https://x.vercel.app/shop/a')
assert.equal(siteUrl('http://localhost:3101', 'ab-c', '/shop/a'), 'http://localhost:3101/boutique/ab-c/shop/a')

console.log('site: all checks passed')
