import { NextRequest, NextResponse } from 'next/server'
import { reviewSchema } from '@/lib/validations/reviews'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getUserByClerkId } from '@/lib/actions/server'

export const GET = async (req: NextRequest, props: { params: Promise<{ reviewId: string }> }) => {
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

    const review = await prisma.review.findUnique({
      where: {
        id: params.reviewId,
        creatorId: _currentUser.id,
      },
      include: {
        product: true,
      },
    })

    if (!review) {
      return new NextResponse('Review not found', { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error('[REVIEW_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const POST = async (req: NextRequest, props: { params: Promise<{ reviewId: string }> }) => {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()
    const body = reviewSchema.parse(json)

    const review = await prisma.review.update({
      where: {
        id: params.reviewId,
        creatorId: _currentUser.id,
      },
      data: {
        userName: body.userName,
        rating: body.rating,
        comment: body.comment,
        verify: body.verify,
        imageUrl: body.imageUrl,
        helpful: body.helpful ?? 0,
        notHelpful: body.notHelpful ?? 0,
        product: {
          connect: {
            id: body.productId,
          },
        },
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('[REVIEW_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ reviewId: string }> },
) => {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await prisma.review.delete({
      where: {
        id: params.reviewId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[REVIEW_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
