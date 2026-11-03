import { NextResponse } from 'next/server'
import { cartStoreErrorStatus } from '@/lib/api/cart-store'
import { mergeCodeStatuses, priceCart, sumSummaries } from '@/lib/api/price-cart'

/**
 * Order summary preview for the cart and checkout, priced like the order (lib/api/price-cart):
 * one group per store, each with its shipping and its own promotions, and the totals. `codes`:
 * discount codes typed by the customer or carried by an ad link; `codeStatuses` tells which
 * ones applied (in any store). The order API re-prices everything when the order is placed.
 */
export async function POST(req: Request) {
  try {
    const { cart, shipping, codes, site } = await req.json()
    const priced = await priceCart({
      items: cart,
      site,
      delivery: shipping,
      codes: Array.isArray(codes) ? codes.map(String).slice(0, 5) : [],
      fresh: false,
    })
    if ('error' in priced) {
      const status = priced.error === 'INVALID_CART' ? 400 : cartStoreErrorStatus[priced.error]
      return NextResponse.json({ error: priced.error }, { status })
    }
    return NextResponse.json({
      ...sumSummaries(priced.groups),
      codeStatuses: mergeCodeStatuses(priced.groups.map(g => g.codeStatuses)),
      groups: priced.groups.map(g => ({
        storeId: g.store.id,
        storeName: g.store.name,
        ...g.summary,
        /** False when this store doesn't deliver to the picked area: shipping to confirm. */
        shippingKnown: !!g.area,
      })),
    })
  } catch (error) {
    console.error('Failed to calculate promotions:', error)
    return NextResponse.json({ error: 'Failed to calculate promotions' }, { status: 500 })
  }
}
