import { connectToDB } from '@/lib/mongoDB'
import { NextRequest, NextResponse } from 'next/server'

import Category from '@/lib/models/Category'
import Media from '@/lib/models/Media'

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const categories = await Category.find()
      .populate({ path: 'image', model: Media })
      .populate({ path: 'parent', model: Category })
      .sort({ createdAt: 'desc' })

    return NextResponse.json(categories, { status: 200 })
  } catch (err) {
    console.log('[categories_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
