import { MARKET } from '@ngift/core/site'
import { Product, StoreStatus } from '../firebase/models'
import { getSiteContext, getStoreCache, SiteStore } from './utils'

export type CartStoreError = 'UNKNOWN_SITE' | 'WRONG_STORE' | 'MIXED_STORES'
export const cartStoreErrorStatus: Record<CartStoreError, number> = {
  UNKNOWN_SITE: 404,
  WRONG_STORE: 400,
  MIXED_STORES: 409,
}

/**
 * The store a cart is ordered from, decided on the server from the `site` the page sent and the
 * products read from the database, never from a storeId sent by the client (docs 3.2).
 * In a store, every product must be that store's. On the marketplace, it is the products' own
 * store, active and listed, with listed products; one store per order until the marketplace
 * splits a cart into one order per store (phase 4).
 */
export async function resolveCartStore(
  site: unknown,
  products: Pick<Product, 'storeId' | 'marketplaceListed'>[],
): Promise<{ store: SiteStore } | { error: CartStoreError }> {
  const ctx = await getSiteContext(typeof site === 'string' && site ? site : MARKET)
  if (!ctx) return { error: 'UNKNOWN_SITE' }
  const ids = [...new Set(products.map(p => p.storeId ?? ''))]
  if (ctx.store) {
    return ids.every(id => id === ctx.store!.id) ? { store: ctx.store } : { error: 'WRONG_STORE' }
  }
  if (ids.length !== 1) return { error: 'MIXED_STORES' }
  const store = ids[0] ? await getStoreCache(ids[0]) : null
  if (
    !store ||
    store.status !== StoreStatus.ACTIVE ||
    !store.marketplaceListed ||
    products.some(p => !p.marketplaceListed)
  ) {
    return { error: 'WRONG_STORE' }
  }
  return { store }
}
