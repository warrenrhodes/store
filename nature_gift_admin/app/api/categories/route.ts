import { getUserByClerkId } from '@/lib/actions/server'
import { categorySchema } from '@/lib/validations/category'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()
    const body = categorySchema.parse(json)

    const existingCategory = await prisma.category.findUnique({
      where: {
        slug: body.slug,
      },
    })

    if (existingCategory) {
      return new NextResponse('Category already exists', { status: 409 })
    }

    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        featured: body.featured,
        creatorId: _currentUser.id,
        ...(body.seoMetadata && {
          seoMetadata: {
            seoTitle: body.seoMetadata.seoTitle,
            seoDescription: body.seoMetadata.seoDescription,
            keywords: body.seoMetadata.keywords || [],
          },
        }),
        ...(body.imageId && {
          image: {
            connect: {
              id: body.imageId,
            },
          },
        }),
        ...(body.parentId && {
          parent: {
            connect: {
              id: body.parentId,
            },
          },
        }),
      },
    })

    return NextResponse.json(newCategory)
  } catch (error) {
    console.error('[CATEGORIES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }
    console.log('user', userId)

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.log('_currentUser', _currentUser)
    const categories = await prisma.category.findMany({
      where: {
        creatorId: _currentUser.id,
      },
      include: {
        parent: true,
        image: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const dynamic = 'force-dynamic'
