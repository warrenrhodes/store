import { promotionSchema } from '@/lib/validations/promotions'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  req: NextRequest,
  props: { params: Promise<{ promotionId: string }> },
) => {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const params = await props.params
  try {
    const promotion = await prisma.promotion.findUnique({
      where: {
        id: params.promotionId,
      },
    })

    if (!promotion) {
      return new NextResponse('Promotion not found', { status: 404 })
    }

    return NextResponse.json(promotion)
  } catch (error) {
    console.error('[PROMOTION_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ promotionId: string }> }) {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()
    const body = promotionSchema.partial().parse(json)

    const promotion = await prisma.promotion.update({
      where: {
        id: params.promotionId,
      },
      data: {
        ...body,
        ...(body.startDate && { startDate: new Date(body.startDate) }),
        ...(body.endDate && { endDate: new Date(body.endDate) }),
      },
    })

    return NextResponse.json(promotion)
  } catch (error) {
    console.error('[PROMOTION_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ promotionId: string }> }) {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.promotion.delete({
      where: {
        id: params.promotionId,
      },
    })

    return NextResponse.json({ message: 'Promotion deleted successfully' })
  } catch (error) {
    console.error('[PROMOTION_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const dynamic = 'force-dynamic'
