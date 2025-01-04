import { getUserByClerkId } from '@/lib/actions/server'
import { productSchema } from '@/lib/validations/product'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
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
    const body = productSchema.parse(json)

    const product = await prisma.product.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        isFeature: body.isFeature,
        isNewProduct: body.isNewProduct,
        tags: body.tags || [],
        price: body.price,
        features: body.features || [],
        status: body.status,
        visibility: body.visibility,
        inventory: body.inventory,
        blogUrl: body.blogUrl,
        partnerId: _currentUser.id,
        metadata: body.metadata,
        ...(body.media?.length > 0 && {
          media: {
            create: body.media.map(mediaId => ({
              media: { connect: { id: mediaId } },
            })),
          },
        }),
        ...(body.categoryIds?.length > 0 && {
          categories: {
            create: body.categoryIds.map(categoryId => ({
              category: { connect: { id: categoryId } },
            })),
          },
        }),
        creatorId: _currentUser.id,
      },
      include: {
        media: {
          include: {
            media: {
              select: {
                id: true,
                url: true,
                type: true,
              },
            },
          },
        },
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

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('[PRODUCTS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') as 'draft' | 'published' | 'archived' | null
    const featured = searchParams.get('featured') === 'true'
    const tag = searchParams.get('tag')
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const where = {
      ...(status && { status }),
      ...(featured && { isFeature: true }),
      ...(tag && { tags: { has: tag } }),
      creatorId: _currentUser.id,
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
        include: {
          media: {
            include: {
              media: {
                select: {
                  id: true,
                  url: true,
                  type: true,
                },
              },
            },
          },
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
          reviews: {
            select: {
              rating: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json(
      {
        products,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[PRODUCTS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
