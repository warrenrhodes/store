// Storefront addresses as the admin shows and copies them (client and server).
import { storeUrl } from '@ngift/core/site'

/** The platform link the storefront runs on, without trailing slash. */
export const PLATFORM_URL = (process.env.NEXT_PUBLIC_PLATFORM_URL ?? '').replace(/\/+$/, '')

/** A store's public address: <platform>/boutique/<slug>. */
export const storefrontUrl = (store: { slug: string }) => storeUrl(PLATFORM_URL, store)
