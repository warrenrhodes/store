import Category from '@/lib/models/Category'
import Media from '@/lib/models/Media'
import Product from '@/lib/models/Product'
import Review from '@/lib/models/Reviews'
import { connectToDB } from '@/lib/mongoDB'
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest, props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  try {
    await connectToDB()
    const product = await Product.findOne({
      slug: params.slug,
      visibility: true,
      status: 'published',
    })
      .lean()
      .sort({ createdAt: 'desc' })
      .populate({ path: 'categories', model: Category })
      .populate({ path: 'media', model: Media })
      .populate({ path: 'reviews', model: Review })

    if (!product) {
      return new NextResponse(JSON.stringify({ message: 'Product not found' }), { status: 404 })
    }

    return new NextResponse(JSON.stringify(product), {
      status: 200,
    })
  } catch (err) {
    console.log('[promotionId_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
