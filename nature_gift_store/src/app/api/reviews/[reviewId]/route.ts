import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import Product from '@/lib/models/Product'
import Review from '@/lib/models/Reviews'
import { connectToDB } from '@/lib/mongoDB'

export const GET = async (req: NextRequest, { params }: { params: { reviewId: string } }) => {
  try {
    await connectToDB()
    const review = await Review.findById(params.reviewId).populate({
      path: 'product',
      model: Product,
    })

    if (!review) {
      return new NextResponse(JSON.stringify({ message: 'Review not found' }), {
        status: 404,
      })
    }

    return NextResponse.json(review, { status: 200 })
  } catch (err) {
    console.log('[reviewId_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const POST = async (req: NextRequest, { params }: { params: { reviewId: string } }) => {
  try {
    await connectToDB()
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    let review = await Review.findById(params.reviewId)

    if (!review) {
      return new NextResponse('Review not found', { status: 404 })
    }

    const { product, userName, rating, comment, imageUrl, verify, helpful, notHelpful } =
      await req.json()

    if (!rating || !comment) {
      return new NextResponse('Rating and comment are required', {
        status: 400,
      })
    }

    review = await Review.findByIdAndUpdate(
      params.reviewId,
      {
        product,
        userName,
        rating,
        comment,
        imageUrl,
        verify,
        helpful,
        notHelpful,
      },
      { new: true },
    )

    return NextResponse.json(review, { status: 200 })
  } catch (err) {
    console.log('[reviewId_POST]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: { reviewId: string } }) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await Review.findByIdAndDelete(params.reviewId)

    return new NextResponse('Review is deleted', { status: 200 })
  } catch (err) {
    console.log('[reviewId_DELETE]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
