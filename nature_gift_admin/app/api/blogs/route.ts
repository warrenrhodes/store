import { getUserByClerkId } from '@/lib/actions/server'
import { generateSlug } from '@/lib/utils/slugify'
import { blogSchema } from '@/lib/validations/blog'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const categories = await prisma.blog.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      include: {
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const user = await currentUser()
    const userName =
      user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.emailAddresses[0].emailAddress

    const json = await req.json()
    const body = blogSchema.parse({
      ...json,
      slug: generateSlug(json.title),
      metadata: {
        ...json.metadata,
        readingTime: calculateReadingTime(json.content.content),
        author: {
          ...json.metadata.author,
          name: userName,
          avatar: user?.imageUrl,
        },
      },
    })

    const blog = await prisma.blog.create({
      data: {
        creatorId: _currentUser.id,
        title: body.title,
        slug: body.slug,
        content: body.content,
        metadata: body.metadata,
        tags: body.tags,
        status: body.status,
        layout: body.layout,
        customFields: [],
        publishedAt: body.publishedAt,
        ...(body.categoryIds?.length > 0 && {
          categories: {
            create: body.categoryIds.map(categoryId => ({
              category: { connect: { id: categoryId } },
            })),
          },
        }),
      },
      include: {
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(blog)
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
