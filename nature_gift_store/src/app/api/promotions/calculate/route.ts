import { NextResponse } from 'next/server'
import { PromotionCalculator } from '@/lib/utils/promotion-calculator'
import { getAllValidPromotionCache } from '@/lib/api/utils'

export async function POST(req: Request) {
  try {
    const { cart, shipping } = await req.json()

    const promotions = await getAllValidPromotionCache()

    const calculator = new PromotionCalculator(cart, shipping, promotions)

    const result = calculator.calculate()

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to calculate promotions:', error)
    return NextResponse.json({ error: 'Failed to calculate promotions' }, { status: 500 })
  }
}
