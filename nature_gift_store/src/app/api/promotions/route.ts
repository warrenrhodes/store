import { Promotion } from '@/lib/models/Promotions'
import { connectToDB } from '@/lib/mongoDB'

import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const GET = async () => {
  try {
    await connectToDB()
    const promotions = await Promotion.find({ status: 'ACTIVE' }).sort({
      createdAt: 'desc',
    })

    if (!promotions) {
      return new NextResponse('Promotions not found', { status: 500 })
    }

    return NextResponse.json(promotions, { status: 200 })
  } catch (err) {
    console.log('[products_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
