import Blog from '@/lib/models/Blog'
import Category from '@/lib/models/Category'
import { connectToDB } from '@/lib/mongoDB'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  try {
    await connectToDB()
    const blog = await Blog.findOne({
      slug: params.slug,
    })

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: 'Blog not found' }), { status: 404 })
    }

    const relatedBlogs = await Blog.find({
      $or: [{ categories: { $in: blog.categories } }],
      slug: { $ne: params.slug },
      status: 'PUBLISHED',
    })
      .lean()
      .sort({ createdAt: 'desc' })
      .populate({ path: 'categories', model: Category })
      .populate({
        path: 'metadata.coverImage',
        model: 'Media',
        select: 'url',
      })

    if (!relatedBlogs) {
      return new NextResponse(JSON.stringify({ message: 'No related blogs found' }), {
        status: 500,
      })
    }

    return NextResponse.json(relatedBlogs, { status: 200 })
  } catch (err) {
    console.log('[relatedBlog_GET', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
