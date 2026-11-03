// Absolute storefront URLs on the server (metadata, canonical links, sitemap).
import { siteUrl } from '@ngift/core/site'

/** The platform link (<projet>.vercel.app for now), without trailing slash. */
export const PLATFORM_URL = (process.env.NEXT_PUBLIC_PLATFORM_URL ?? '').replace(/\/+$/, '')
if (!PLATFORM_URL) {
  console.error('NEXT_PUBLIC_PLATFORM_URL is not set: canonical links and sitemaps are wrong (.env.example).')
}

/** Absolute URL of a page of `site` (its slug, or _market). */
export const absoluteUrl = (site: string, path = '/') => siteUrl(PLATFORM_URL, site, path)
