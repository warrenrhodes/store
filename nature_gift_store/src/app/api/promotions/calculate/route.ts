import { NextResponse } from 'next/server'
import { isWithinUsageLimit, PromotionCalculator } from '@/lib/utils/promotion-calculator'
import { getAllValidPromotionCache } from '@/lib/api/utils'

/**
 * Order summary preview for the cart and checkout. `codes`: discount codes typed by the
 * customer or carried by an ad link; `codeStatuses` tells which ones applied. The order API
 * re-prices everything and enforces per-customer limits when the order is placed.
 */
export async function POST(req: Request) {
  try {
    const { cart, shipping, codes } = await req.json()

    const promotions = (await getAllValidPromotionCache()).filter(p => isWithinUsageLimit(p))
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
