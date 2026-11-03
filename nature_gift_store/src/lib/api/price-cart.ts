// Prices a cart on the server, one group per store (docs/MULTI_TENANT_PLAN.md, 3.4): products,
// shipping and promotions all come from the database, never from the client. Shared by the
// summary preview (/api/promotions/calculate) and the order (/api/orders).
import type { CartItem } from '@/hooks/useCart'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { OrderSummary, Product, ProductStatus } from '@/lib/firebase/models'
import {
  CodeStatus,
  isWithinUsageLimit,
  PromotionCalculator,
} from '@/lib/utils/promotion-calculator'
import { findArea, normalize, ShippingArea, ShippingZone } from '@/lib/utils/shipping-zones'
import { getRegularPrice } from '@/lib/utils/utils'
import { CartStoreError, resolveCartGroups } from './cart-store'
import {
  getDocumentByPathCache,
  getDocumentByPathFresh,
  getPromotionsWithFreshUsage,
  getShippingZonesCache,
  SiteStore,
} from './utils'

export type PricedGroup = {
  store: SiteStore
  cart: CartItem[]
  summary: OrderSummary
  /** The store's own delivery area; none when it doesn't deliver there (shipping to confirm). */
  area?: ShippingArea
  codeStatuses: Record<string, CodeStatus>
}

const areaKey = (a: ShippingArea) => `${normalize(a.name)}|${normalize(a.city)}`

/**
 * The customer picks one area; each store of the cart has its own locations (phase 2), so a
 * store matches it by id, else by the same name and city.
 */
const sameArea = (zones: ShippingZone[], method?: string, id?: string, key?: string) => {
  const exact = findArea(zones, method, id)
  if (exact || !key) return exact
  for (const zone of zones) {
    if (zone.method !== method) continue
    const area = zone.areas.find(a => areaKey(a) === key)
    if (area) return { zone, area }
  }
  return undefined
}

/** A code applied in one store counts as applied; it is invalid only if no store knows it. */
export const mergeCodeStatuses = (all: Record<string, CodeStatus>[]) => {
  const merged: Record<string, CodeStatus> = {}
  for (const statuses of all) {
    for (const [code, status] of Object.entries(statuses)) {
      const rank = { invalid: 0, not_applicable: 1, applied: 2 }
      if (!merged[code] || rank[status] > rank[merged[code]]) merged[code] = status
    }
  }
  return merged
}

export const sumSummaries = (groups: PricedGroup[]): OrderSummary => ({
  subtotal: groups.reduce((s, g) => s + g.summary.subtotal, 0),
  shipping: groups.reduce((s, g) => s + g.summary.shipping, 0),
  discount: groups.reduce((s, g) => s + g.summary.discount, 0),
  total: groups.reduce((s, g) => s + g.summary.total, 0),
  appliedPromotions: groups.flatMap(g => g.summary.appliedPromotions),
})

/**
 * `fresh`: read products from the database (the order) rather than the shared cache (the
 * preview). `uses`: orders this customer already placed per promotion path (per-customer limits);
 * `pastOrders`: per store id (first-order promotions). Both unknown in the preview.
 */
export async function priceCart(params: {
  items: unknown
  site: unknown
  delivery?: { deliveryMethod?: string; locationId?: string }
  codes: string[]
  fresh: boolean
  uses?: Map<string, number>
  pastOrders?: Map<string, number>
}): Promise<{ groups: PricedGroup[] } | { error: CartStoreError | 'INVALID_CART' }> {
  const { items, delivery, codes, fresh, uses = new Map(), pastOrders = new Map() } = params
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return { error: 'INVALID_CART' }
  }
  const read = fresh ? getDocumentByPathFresh : getDocumentByPathCache
  const cart = await Promise.all(
    items.map(async (item): Promise<CartItem | null> => {
      const quantity = Number(item?.quantity)
      const path = String(item?.product?.path ?? '')
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return null
      if (!path.startsWith(`${CollectionsName.Products}/`)) return null
      const product = await read<Product>({ path })
      if (!product?.title || product.status !== ProductStatus.PUBLISHED) return null
      return { product: { ...product, path }, quantity, price: getRegularPrice(product) }
    }),
  )
  if (cart.some(item => !item)) return { error: 'INVALID_CART' }
  const resolved = await resolveCartGroups(
    params.site,
    cart.map(item => item!.product),
  )
  if ('error' in resolved) return resolved

  const zones = await Promise.all(resolved.groups.map(g => getShippingZonesCache(g.store.id)))
  const method = delivery?.deliveryMethod
  const picked = zones.map(z => findArea(z, method, delivery?.locationId)).find(Boolean)
  const key = picked && areaKey(picked.area)

  const groups = await Promise.all(
    resolved.groups.map(async ({ store, indexes }, g): Promise<PricedGroup> => {
      const groupCart = indexes.map(i => cart[i]!)
      const match = sameArea(zones[g], method, delivery?.locationId, key)
      const promotions = (await getPromotionsWithFreshUsage(store.id)).filter(p =>
        isWithinUsageLimit(p, uses.get(p.path) ?? 0),
      )
      const calculator = new PromotionCalculator(
        groupCart,
        {
          // Without an area of this store the shipping cost is unknown: no method-based promos.
          deliveryMethod: match ? (method as never) : undefined,
          locationId: match?.area.id,
          city: match?.area.city,
          cost: match?.zone.cost ?? 0,
        },
        promotions,
        codes,
        pastOrders.get(store.id) ?? 0,
      )
      const summary = calculator.calculate()
      return {
        store,
        cart: groupCart,
        summary,
        area: match?.area,
        codeStatuses: calculator.codeStatuses(summary),
      }
    }),
  )
  return { groups }
}
