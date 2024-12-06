import { NextResponse } from 'next/server'
import { Promotion } from '@/lib/models/Promotions'
import { PromotionCalculator } from '@/lib/utils/promotion-calculator'

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query: any = {}

    searchParams.forEach((value, key) => {
      query[key] = value
    })

    const { cart, shipping } = await req.json()

    const promotions = await Promotion.find({
      status: 'ACTIVE',
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
      ...query,
    })
      .sort({ priority: -1 })
      .lean()

    const calculator = new PromotionCalculator(cart, shipping, promotions)

    const result = calculator.calculate()

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to calculate promotions:', error)
    return NextResponse.json({ error: 'Failed to calculate promotions' }, { status: 500 })
  }
}
