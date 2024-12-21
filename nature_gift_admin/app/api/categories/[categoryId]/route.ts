import { getUserByClerkId } from '@/lib/actions/actions'
import { categorySchema } from '@/lib/validations/category'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, props: { params: Promise<{ categoryId: string }> }) => {
  const params = await props.params
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
        creatorId: _currentUser.id,
      },
      include: {
        parent: true,
        image: true,
      },
    })

    if (!category) {
      return new NextResponse('Category not found', { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const PUT = async (req: NextRequest, props: { params: Promise<{ categoryId: string }> }) => {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = categorySchema.partial().parse(json)

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        featured: body.featured,
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

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_PUT]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ categoryId: string }> },
) => {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // First disconnect all products from this category
    await prisma.categoriesOnProducts.deleteMany({
      where: {
        categoryId: params.categoryId,
      },
    })

    // First disconnect all products from this category
    await prisma.categoriesOnBlogs.deleteMany({
      where: {
        categoryId: params.categoryId,
      },
    })

    // Then delete the category
    await prisma.category.delete({
      where: {
        id: params.categoryId,
        creatorId: _currentUser.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[CATEGORY_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
