import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const cost = await request.json()

  try {
    const result = await prisma.campaignCost.create({
      data: cost,
    })
    if (!result) {
      return NextResponse.json({ error: 'Failed to create campagne cost' }, { status: 500 })
    }
    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    console.log('[CAMPAGNE_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
