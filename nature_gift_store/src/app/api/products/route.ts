import { prisma } from '@naturegift/models'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        media: {
          include: {
            media: true,
          },
        },
        reviews: true,
      },
    })

    if (!products) {
      return new NextResponse('Products not found', { status: 404 })
    }

    return NextResponse.json(products, { status: 200 })
  } catch (err) {
    console.log('[products_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
