import { deleteData, getDataById, putData } from '@/lib/actions/server'
import { blogSchema } from '@/lib/validations/blog'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionsName } from '@/lib/firebase/collection-name'

export async function GET(req: NextRequest, props: { params: Promise<{ blogId: string }> }) {
  const params = await props.params
  try {
    return getDataById(req, CollectionsName.Blogs, params.blogId)
  } catch (error) {
    console.error('[BLOG_GET]', error)
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, props: { params: Promise<{ blogId: string }> }) {
  const params = await props.params
  try {
    const json = await req.clone().json()
    const readTime = calculateReadingTime(json.content.content)
    const newRequest = new NextRequest(req, {
      body: JSON.stringify({
        ...json,
        metadata: {
          ...json.metadata,
          readingTime: readTime,
        },
        updatedAt: new Date().toISOString(),
      }),
    })
    return putData(newRequest, blogSchema, CollectionsName.Blogs, params.blogId)
  } catch (error) {
    console.error('[BLOG_PATCH]', error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ blogId: string }> }) {
  const params = await props.params
  try {
    return deleteData(req, CollectionsName.Blogs, params.blogId)
  } catch (error) {
    console.error('[BLOG_DELETE]', error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
