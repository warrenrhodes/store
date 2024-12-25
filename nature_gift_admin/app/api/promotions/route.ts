import { getUserByClerkId } from '@/lib/actions/server'
import { promotionSchema } from '@/lib/validations/promotions'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const promotions = await prisma.promotion.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      include: {
        products: true,
      },
    })

    return NextResponse.json(promotions)
  } catch (error) {
    console.error('[PROMOTIONS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()
    const body = promotionSchema.parse(json)

    const promotion = await prisma.promotion.create({
      data: {
        ...body,
        creatorId: _currentUser.id,
      },
    })

    return NextResponse.json(promotion)
  } catch (error) {
    console.error('[PROMOTIONS_POST]', error)
    return NextResponse.json({ error: 'Failed to create promotion' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const dynamic = 'force-dynamic'
