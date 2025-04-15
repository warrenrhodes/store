import { NextResponse } from 'next/server'
import { PromotionCalculator } from '@/lib/utils/promotion-calculator'
import { getAllCollectionCache } from '@/lib/api/utils'
import { Promotion } from '@/lib/firebase/models'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { QueryFilter } from '@spreeloop/database'

export async function POST(req: Request) {
  try {
    const { cart, shipping } = await req.json()

    const promotions = await getAllCollectionCache<Promotion>({
      collection: CollectionsName.Promotions,
      filters: [
        new QueryFilter('status', '==', 'ACTIVE'),
        new QueryFilter('startDate', '>=', new Date().toISOString()),
        new QueryFilter('endDate', '<=', new Date().toISOString()),
      ],
    })

    const calculator = new PromotionCalculator(cart, shipping, promotions)

    const result = calculator.calculate()

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to calculate promotions:', error)
    return NextResponse.json({ error: 'Failed to calculate promotions' }, { status: 500 })
  }
}
