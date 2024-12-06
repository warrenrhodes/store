import Blog from '@/lib/models/Blog'
import Category from '@/lib/models/Category'
import { connectToDB } from '@/lib/mongoDB'

import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  try {
    await connectToDB()
    const url = new URL(req.url)
    const searchParams = url.searchParams
    const query: any = {}
    searchParams.forEach((value, key) => {
      if (key === 'categories') {
        query.categories = { $in: value.split(',') }
      } else {
        query[key] = value
      }
    })

    const blogs = await Blog.find({ status: 'PUBLISHED', ...query })
      .lean()
      .sort({ createdAt: 'desc' })
      .populate({ path: 'categories', model: Category })
      .populate({
        path: 'metadata.coverImage',
        model: 'Media',
        select: 'url',
      })

    if (!blogs) {
      return new NextResponse('Blogs not found', { status: 404 })
    }

    return NextResponse.json(blogs, { status: 200 })
  } catch (err) {
    console.log('[Blogs_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'