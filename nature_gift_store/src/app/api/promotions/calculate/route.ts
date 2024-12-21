import { NextResponse } from 'next/server'
import { PromotionCalculator } from '@/lib/utils/promotion-calculator'
import { prisma } from '@naturegift/models'

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query: any = {}

    searchParams.forEach((value, key) => {
      query[key] = value
    })

    const { cart, shipping } = await req.json()

    const promotions = await prisma.promotion.findMany({
      where: {
        status: 'ACTIVE',
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
        ...query,
      },
      orderBy: {
        priority: 'desc',
      },
    })

    const calculator = new PromotionCalculator(cart, shipping, promotions)

    const result = calculator.calculate()

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to calculate promotions:', error)
    return NextResponse.json({ error: 'Failed to calculate promotions' }, { status: 500 })
  }
}
