import Category from '@/lib/models/Category'
import Media from '@/lib/models/Media'
import Product from '@/lib/models/Product'
import Review from '@/lib/models/Reviews'
import { connectToDB } from '@/lib/mongoDB'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    await connectToDB()
    const products = await Product.find({ status: 'published', visibility: true })
      .lean()
      .sort({ createdAt: 'desc' })
      .populate({ path: 'categories', model: Category })
      .populate({ path: 'media', model: Media })
      .populate({ path: 'reviews', model: Review })

    if (!products) {
      return new NextResponse('Products not found', { status: 404 })
    }

    return NextResponse.json(products, { status: 200 })
  } catch (err) {
    console.log('[products_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
