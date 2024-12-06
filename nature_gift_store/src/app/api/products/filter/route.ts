import Category from '@/lib/models/Category'
import Media from '@/lib/models/Media'
import Product from '@/lib/models/Product'
import Review from '@/lib/models/Reviews'
import { connectToDB } from '@/lib/mongoDB'

import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export const GET = async (req: Request) => {
  try {
    await connectToDB()
    const url = new URL(req.url)
    const searchParams = url.searchParams
    const query: any = {}

    searchParams.forEach((value, key) => {
      if (key === 'categories') {
        query.categories = { $in: value.split(',') }
      } else if (key === 'tags') {
        query.tags = { $in: value.split(',') }
      } else {
        query[key] = value
      }
    })

    const products = await Product.find({ status: 'published', visibility: true, ...query })
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
