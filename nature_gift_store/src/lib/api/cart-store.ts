import { MARKET } from '@ngift/core/site'
import { Product, StoreStatus } from '../firebase/models'
import { getSiteContext, getStoreCache, SiteStore } from './utils'

export type CartStoreError = 'UNKNOWN_SITE' | 'WRONG_STORE'
export const cartStoreErrorStatus: Record<CartStoreError, number> = {
  UNKNOWN_SITE: 404,
  WRONG_STORE: 400,
}

/** The products of one store in a cart (`indexes` into the cart), ordered from that store. */
export type CartGroup = { store: SiteStore; indexes: number[] }

/**
 * The stores a cart is ordered from, decided on the server from the `site` the page sent and the
 * products read from the database, never from a storeId sent by the client (docs 3.2, 3.4).
 * In a store, every product must be that store's: one group. On the marketplace, one group per
 * store, in the order the cart first meets them; each store active and listed, each product
 * listed. One order is placed per group (docs 3.4).
 */
export async function resolveCartGroups(
  site: unknown,
  products: Pick<Product, 'storeId' | 'marketplaceListed'>[],
): Promise<{ groups: CartGroup[] } | { error: CartStoreError }> {
  const ctx = await getSiteContext(typeof site === 'string' && site ? site : MARKET)
  if (!ctx) return { error: 'UNKNOWN_SITE' }
  if (ctx.store) {
    return products.every(p => p.storeId === ctx.store!.id)
      ? { groups: [{ store: ctx.store, indexes: products.map((_, i) => i) }] }
      : { error: 'WRONG_STORE' }
  }
  const byStore = new Map<string, number[]>()
  products.forEach((p, i) =>
    byStore.set(p.storeId ?? '', [...(byStore.get(p.storeId ?? '') ?? []), i]),
  )
  const groups: CartGroup[] = []
  for (const [storeId, indexes] of byStore) {
    const store = storeId ? await getStoreCache(storeId) : null
    if (
      !store ||
      store.status !== StoreStatus.ACTIVE ||
      !store.marketplaceListed ||
      indexes.some(i => !products[i].marketplaceListed)
    ) {
      return { error: 'WRONG_STORE' }
    }
    groups.push({ store, indexes })
  }
  return { groups }
}

/**
 * The abandoned-checkout document of one store's part of a cart: the session id itself for a
 * single-store cart, `<id>_<storeId>` for each store of a mixed marketplace cart.
 */
export const checkoutDocId = (id: string, storeId: string, groups: number) =>
  groups > 1 ? `${id}_${storeId}` : id
