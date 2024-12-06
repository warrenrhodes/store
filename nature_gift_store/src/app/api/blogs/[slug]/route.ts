import Blog from '@/lib/models/Blog'
import Category from '@/lib/models/Category'
import { connectToDB } from '@/lib/mongoDB'
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    await connectToDB()
    const blog = await Blog.findOne({
      slug: params.slug,
    })
      .lean()
      .sort({ createdAt: 'desc' })
      .populate({ path: 'categories', model: Category })
      .populate({
        path: 'metadata.coverImage',
        model: 'Media',
        select: 'url',
      })

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: 'blog not found' }), { status: 404 })
    }

    return new NextResponse(JSON.stringify(blog), {
      status: 200,
    })
  } catch (err) {
    console.log('[blog_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
