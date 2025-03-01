import { getBlogs, getUserTokensOnApiRoute, postData } from '@/lib/actions/server'
import { generateSlug } from '@/lib/utils/slugify'
import { blogSchema } from '@/lib/validations/blog'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionsName } from '@/lib/firebase/collection-name'

export const GET = async (req: NextRequest) => {
  try {
    const token = await getUserTokensOnApiRoute(req)

    if (!token) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const blogs = getBlogs()

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getUserTokensOnApiRoute(req)

    if (!token) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const userName = token.decodedToken.name ? token.decodedToken.name : token.decodedToken?.email

    const json = await req.clone().json()
    const newJson = {
      ...json,
      slug: generateSlug(json.title),
      customFields: [],
      metadata: {
        ...json.metadata,
        readingTime: calculateReadingTime(json.content.content),
        author: {
          ...json.metadata.author,
          name: userName,
          avatar: token.decodedToken?.picture,
        },
      },
    }
    const newRequest = new NextRequest(req, {
      body: JSON.stringify({
        ...newJson,
        creatorId: token.decodedToken.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
    return postData(newRequest, blogSchema, CollectionsName.Blogs, true, 'slug', json.slug)
  } catch (error) {
    console.error('[BLOGS_POST]', error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export const dynamic = 'force-dynamic'
