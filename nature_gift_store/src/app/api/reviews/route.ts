import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

import Product from '@/lib/models/Product'
import Review from '@/lib/models/Reviews'
import { connectToDB } from '@/lib/mongoDB'

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const { product, userName, rating, comment, imageUrl, verify, helpful, notHelpful } =
      await req.json()

    if (!product || !userName || !rating || !comment) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const newReview = await Review.create({
      product,
      userName,
      rating,
      comment,
      imageUrl,
      verify,
      helpful,
      notHelpful,
    })

    return NextResponse.json(newReview, { status: 200 })
  } catch (err) {
    console.log('[reviews_POST]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const productId = searchParams.get('productId')

  try {
    await connectToDB()
    if (!productId) {
      const reviews = await Review.find({ product: productId })
        .sort({ createdAt: 'desc' })
        .populate({ path: 'product', model: Product })
      return NextResponse.json(reviews, { status: 200 })
    }
    const reviews = await Review.find()
      .sort({ createdAt: 'desc' })
      .populate({ path: 'product', model: Product })

    return NextResponse.json(reviews, { status: 200 })
  } catch (err) {
    console.log('[reviews_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
