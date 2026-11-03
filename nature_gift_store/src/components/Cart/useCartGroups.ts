'use client'

import { useSite } from '@/components/Site'
import type { CartItem } from '@/hooks/useCart'

/**
 * The cart's items by store, in the order they were added. On the marketplace a cart with
 * several stores shows each store's name: each one is ordered and delivered apart (docs 3.4).
 */
export function useCartGroups(items: CartItem[]) {
  const { isMarket, stores } = useSite()
  const byStore = new Map<string, CartItem[]>()
  for (const item of items) {
    const id = item.product.storeId ?? ''
    byStore.set(id, [...(byStore.get(id) ?? []), item])
  }
  const groups = [...byStore].map(([storeId, list]) => ({
    storeId,
    name: stores?.[storeId]?.name ?? '',
    items: list,
  }))
  return { groups, showStores: isMarket && groups.length > 1 }
}
