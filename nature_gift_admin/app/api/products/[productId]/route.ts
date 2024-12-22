import { getUserByClerkId } from '@/lib/actions/server'
import { productSchema } from '@/lib/validations/product'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, props: { params: Promise<{ productId: string }> }) => {
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

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
        creatorId: _currentUser.id,
      },
      include: {
        media: {
          include: {
            media: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('[PRODUCT_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const PATCH = async (
  req: NextRequest,
  props: { params: Promise<{ productId: string }> },
) => {
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
    const body = productSchema.partial().parse(json)

    // First, handle the basic product data
    const updateData: any = {
      title: body.title,
      slug: body.slug,
      description: body.description,
      isFeature: body.isFeature,
      isNewProduct: body.isNewProduct,
      tags: body.tags,
      price: body.price,
      features: body.features,
      status: body.status,
      visibility: body.visibility,
      blogUrl: body.blogUrl,
      metadata: body.metadata,
    }

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key]
      }
    })

    // If media is provided, update media relationships
    if (body.media?.length) {
      await prisma.mediasOnProducts.deleteMany({
        where: { productId: params.productId },
      })
    }

    // If categories are provided, update category relationships
    if (body.categoryIds?.length) {
      await prisma.categoriesOnProducts.deleteMany({
        where: { productId: params.productId },
      })
    }

    // Update the product with all changes
    const product = await prisma.product.update({
      where: { id: params.productId, creatorId: _currentUser.id },
      data: {
        ...updateData,
        ...(body.media?.length && {
          media: {
            create: body.media.map(mediaId => ({
              mediaId,
            })),
          },
        }),
        ...(body.categoryIds?.length && {
          categories: {
            create: body.categoryIds.map(categoryId => ({
              categoryId,
            })),
          },
        }),
      },
      include: {
        media: {
          include: {
            media: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('[PRODUCT_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ productId: string }> },
) => {
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

    await prisma.product.delete({
      where: {
        id: params.productId,
        creatorId: _currentUser.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[PRODUCT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
