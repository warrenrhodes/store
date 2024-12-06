import { NextRequest, NextResponse } from 'next/server'

import Category from '@/lib/models/Category'
import Product from '@/lib/models/Product'
import Media from '@/lib/models/Media'
import { connectToDB } from '@/lib/mongoDB'

export const GET = async (req: NextRequest, { params }: { params: { categoryId: string } }) => {
  try {
    await connectToDB()
    const category = await Category.findById(params.categoryId)
      .populate({
        path: 'products',
        model: Product,
      })
      .populate({ path: 'media', model: Media })
      .populate({ path: 'parent', model: Category })

    if (!category) {
      return new NextResponse(JSON.stringify({ message: 'Category not found' }), { status: 404 })
    }

    return NextResponse.json(category, { status: 200 })
  } catch (err) {
    console.log('[categoryId_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
