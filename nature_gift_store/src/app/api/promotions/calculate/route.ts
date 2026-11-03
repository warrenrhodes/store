import { NextResponse } from 'next/server'
import { isWithinUsageLimit, PromotionCalculator } from '@/lib/utils/promotion-calculator'
import { getDocumentByPathCache, getPromotionsWithFreshUsage } from '@/lib/api/utils'
import { cartStoreErrorStatus, resolveCartStore } from '@/lib/api/cart-store'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Product } from '@/lib/firebase/models'

/**
 * Order summary preview for the cart and checkout. `codes`: discount codes typed by the
 * customer or carried by an ad link; `codeStatuses` tells which ones applied. `site`: the
 * page's site; only the promotions of the cart's store apply (its products are read here, the
 * client's storeId is ignored). The order API re-prices everything and enforces per-customer
 * limits when the order is placed.
 */
export async function POST(req: Request) {
  try {
    const { cart, shipping, codes, site } = await req.json()
    const paths: string[] = Array.isArray(cart) ? cart.map(i => String(i?.product?.path ?? '')) : []
    if (paths.length === 0 || paths.some(p => !p.startsWith(`${CollectionsName.Products}/`))) {
      return NextResponse.json({ error: 'Invalid cart' }, { status: 400 })
    }
    const products = await Promise.all(paths.map(path => getDocumentByPathCache<Product>({ path })))
    if (products.some(p => !p?.title)) {
      return NextResponse.json({ error: 'Invalid cart' }, { status: 400 })
    }
    const resolved = await resolveCartStore(site, products as Product[])
    if ('error' in resolved) {
      return NextResponse.json(
        { error: resolved.error },
        { status: cartStoreErrorStatus[resolved.error] },
      )
    }

    const promotions = (await getPromotionsWithFreshUsage(resolved.store.id)).filter(p =>
      isWithinUsageLimit(p),
    )
    const calculator = new PromotionCalculator(
      cart,
      shipping,
      promotions,
      Array.isArray(codes) ? codes.map(String).slice(0, 5) : [],
    )
    const result = calculator.calculate()

    return NextResponse.json({ ...result, codeStatuses: calculator.codeStatuses(result) })
  } catch (error) {
    console.error('Failed to calculate promotions:', error)
    return NextResponse.json({ error: 'Failed to calculate promotions' }, { status: 500 })
  }
}
