import { getUserByClerkId } from '@/lib/actions/server'
import { blogSchema } from '@/lib/validations/blog'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, props: { params: Promise<{ blogId: string }> }) {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const blog = await prisma.blog.findUnique({
      where: { id: params.blogId, creatorId: _currentUser.id },
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

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('[BLOG_GET]', error)
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

export async function PUT(req: Request, props: { params: Promise<{ blogId: string }> }) {
  const params = await props.params
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()

    const body = blogSchema.partial().parse(json)

    // Handle categories separately if they exist in the update
    const { categoryIds: categoryIds, ...updateData } = body

    const blog = await prisma.blog.update({
      where: { id: params.blogId, creatorId: _currentUser.id },
      data: {
        ...updateData,
        customFields: [],
        ...(categoryIds && {
          categories: {
            deleteMany: {}, // Remove existing categories
            create: categoryIds.map(categoryId => ({
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
    console.error('[BLOG_PATCH]', error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ blogId: string }> }) {
  const params = await props.params
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.blog.delete({
      where: { id: params.blogId, creatorId: _currentUser.id },
    })

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('[BLOG_DELETE]', error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
