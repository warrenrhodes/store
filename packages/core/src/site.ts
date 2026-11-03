// Storefront addresses (docs/MULTI_TENANT_PLAN.md, 3.2). For now every store lives on the
// platform link under /boutique/<slug> (path routing); phase 6 (own hosts) only changes these
// functions and the storefront proxy. Self-check: site.check.ts
import { isValidStoreSlug } from './models'

/** The `site` of the marketplace (the platform root). A store's site is its slug. */
export const MARKET = '_market'
export const STORE_PREFIX = '/boutique'

/** In-site path → browser path: '/shop' on store 'a' is '/boutique/a/shop'. */
export const siteHref = (site: string, path: string) => {
  if (site === MARKET || !path.startsWith('/') || path.startsWith('//')) return path
  // '/' and '/?promo=X' hang off the store's root: '/boutique/a', '/boutique/a?promo=X'.
  return `${STORE_PREFIX}/${site}${path.replace(/^\/(?=[?#]|$)/, '')}`
}

/** Browser path → the site it belongs to and the path inside it (the proxy rewrites to /<site><path>). */
export const parseSitePath = (pathname: string) => {
  const match = pathname.match(/^\/boutique\/([^/]+)(\/.*)?$/)
  if (match && isValidStoreSlug(match[1])) return { site: match[1], path: match[2] ?? '/' }
  return { site: MARKET, path: pathname }
}

/** Absolute URL of a site's page, from the platform URL (no trailing slash needed). */
export const siteUrl = (platformUrl: string, site: string, path = '/') =>
  `${platformUrl.replace(/\/+$/, '')}${siteHref(site, path)}`.replace(/(?<=[^/])\/$/, '')

/** A store's public address: the only way to build one (links, sitemap, metadata, admin). */
export const storeUrl = (platformUrl: string, store: { slug: string }) =>
  siteUrl(platformUrl, store.slug)
