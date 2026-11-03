// Theme preview links (docs/MULTI_TENANT_PLAN.md, 3.7): the admin signs `?preview=<token>`,
// the storefront checks it and shows the store's draft. Both apps share REVALIDATE_SECRET.
// Server only (node:crypto). Self-check: theme.check.ts
import { createHmac, timingSafeEqual } from 'node:crypto'

/** The storefront proxy copies ?preview= into this request header for the layout. */
export const PREVIEW_HEADER = 'x-theme-preview'

const sign = (secret: string, storeId: string, expires: number) =>
  createHmac('sha256', secret).update(`theme-preview:${storeId}:${expires}`).digest('base64url')

/** A token for this store's draft, valid `ttlMs` (an hour by default). */
export const previewToken = (
  secret: string,
  storeId: string,
  now = Date.now(),
  ttlMs = 3600_000,
) => {
  const expires = now + ttlMs
  return `${expires}.${sign(secret, storeId, expires)}`
}

export const isPreviewToken = (
  secret: string | undefined,
  storeId: string,
  token: string | null | undefined,
  now = Date.now(),
) => {
  const [expires, signature] = String(token ?? '').split('.')
  if (!secret || !signature || !(Number(expires) > now)) return false
  const expected = Buffer.from(sign(secret, storeId, Number(expires)))
  const given = Buffer.from(signature)
  return given.length === expected.length && timingSafeEqual(given, expected)
}
