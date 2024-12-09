import Category from '@/lib/models/Category'
import Media from '@/lib/models/Media'
import Product from '@/lib/models/Product'
import Review from '@/lib/models/Reviews'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  try {
    const product = await Product.findOne({
      slug: params.slug,
    })

    if (!product) {
      return new NextResponse(JSON.stringify({ message: 'Product not found' }), { status: 404 })
    }

    const relatedProducts = await Product.find({
      $or: [{ categories: { $in: product.categories } }],
      slug: { $ne: params.slug },
      status: 'published',
      visibility: true,
    })
      .lean()
      .sort({ createdAt: 'desc' })
      .populate({ path: 'categories', model: Category })
      .populate({ path: 'media', model: Media })
      .populate({ path: 'reviews', model: Review })

    if (!relatedProducts) {
      return new NextResponse(JSON.stringify({ message: 'No related products found' }), {
        status: 500,
      })
    }

    return NextResponse.json(relatedProducts, { status: 200 })
  } catch (err) {
    console.log('[related_GET', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
