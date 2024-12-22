import { getUserByClerkId } from '@/lib/actions/server'
import { promotionSchema } from '@/lib/validations/promotions'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  req: NextRequest,
  props: { params: Promise<{ promotionId: string }> },
) => {
  const params = await props.params
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const promotion = await prisma.promotion.findUnique({
      where: {
        id: params.promotionId,
        creatorId: _currentUser.id,
      },
      include: {
        products: true,
      },
    })

    return NextResponse.json(promotion)
  } catch (error) {
    console.error('[PROMOTION_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const PATCH = async (
  req: NextRequest,
  props: { params: Promise<{ promotionId: string }> },
) => {
  const params = await props.params
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()
    const body = promotionSchema.partial().parse(json)

    const promotion = await prisma.promotion.update({
      where: {
        id: params.promotionId,
        creatorId: _currentUser.id,
      },
      data: body,
    })

    return NextResponse.json(promotion)
  } catch (error) {
    console.error('[PROMOTION_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ promotionId: string }> },
) => {
  const params = await props.params
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.promotion.delete({
      where: {
        id: params.promotionId,
        creatorId: _currentUser.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[PROMOTION_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
