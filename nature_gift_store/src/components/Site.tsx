'use client'

// The site a page belongs to (the marketplace or a store), set by app/[site]/layout.tsx.
// Every internal link goes through SiteLink or useSiteHref, so a store's links stay under
// /boutique/<slug> (scripts/check-store-links.mjs keeps it that way in CI).
import { MARKET, siteHref } from '@ngift/core/site'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { ComponentProps, createContext, useContext, useMemo } from 'react'
import type { StoreApi, UseBoundStore } from 'zustand'

export type SiteInfo = {
  site: string
  /** Brand shown in the header and footer. */
  name: string
  whatsapp: string | null
  email: string | null
  /** The store's logo (theme); the name is shown as text without one. */
  logoUrl?: string | null
  /** The store's announcement bar (theme); the marketplace shows the platform's. */
  announcement?: string | null
  isMarket: boolean
}

/** The platform's own brand, on the marketplace. */
export const PLATFORM_SITE: SiteInfo = {
  site: MARKET,
  name: 'N.Gift',
  whatsapp: '237696689073',
  email: 'natures.gift.237@gmail.com',
  isMarket: true,
}

const SiteContext = createContext<SiteInfo>(PLATFORM_SITE)

export const SiteProvider = ({
  value,
  children,
}: {
  value: SiteInfo
  children: React.ReactNode
}) => <SiteContext.Provider value={value}>{children}</SiteContext.Provider>

export const useSite = () => useContext(SiteContext)

/** '/shop' → the same page in the current site. */
export const useSiteHref = () => {
  const { site } = useSite()
  return useMemo(() => (path: string) => siteHref(site, path), [site])
}

/** router.push / replace with the site's prefix. */
export const useSiteRouter = () => {
  const router = useRouter()
  const href = useSiteHref()
  return useMemo(
    () => ({
      ...router,
      push: (path: string, options?: Parameters<typeof router.push>[1]) =>
        router.push(href(path), options),
      replace: (path: string, options?: Parameters<typeof router.replace>[1]) =>
        router.replace(href(path), options),
    }),
    [router, href],
  )
}

/** next/link that keeps the current site: href="/shop" opens the store's shop in a store. */
export const SiteLink = ({ href, ...props }: ComponentProps<typeof NextLink>) => {
  const toSite = useSiteHref()
  return <NextLink href={typeof href === 'string' ? toSite(href) : href} {...props} />
}

/**
 * One zustand store per site, so each store keeps its own cart and codes in localStorage.
 * `storageKey('cart-storage')` is 'cart-storage:<slug>' in a store, unchanged on the
 * marketplace (existing carts survive).
 */
export function perSite<S>(
  make: (storageKey: (name: string) => string) => UseBoundStore<StoreApi<S>>,
) {
  const stores = new Map<string, UseBoundStore<StoreApi<S>>>()
  function useSiteStore(): S
  function useSiteStore<T>(selector: (state: S) => T): T
  function useSiteStore<T>(selector?: (state: S) => T) {
    const { site } = useSite()
    let store = stores.get(site)
    if (!store) {
      store = make(name => (site === MARKET ? name : `${name}:${site}`))
      stores.set(site, store)
    }
    return store(selector ?? ((state: S) => state as unknown as T))
  }
  return useSiteStore
}
