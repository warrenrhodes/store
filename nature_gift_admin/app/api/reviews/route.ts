import { getUserByClerkId } from '@/lib/actions/actions'
import { reviewSchema } from '@/lib/validations/reviews'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
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
    const body = reviewSchema.parse(json)

    const newReview = await prisma.review.create({
      data: {
        userName: body.userName,
        rating: body.rating,
        comment: body.comment,
        verify: body.verify,
        imageUrl: body.imageUrl,
        helpful: body.helpful ?? 0,
        notHelpful: body.notHelpful ?? 0,
        creatorId: _currentUser.id,
        product: {
          connect: {
            id: body.productId,
          },
        },
      },
    })

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error('[REVIEWS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const reviews = await prisma.review.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('[REVIEWS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
