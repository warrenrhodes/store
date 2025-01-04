import { getUserByClerkId } from '@/lib/actions/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, props: { params: Promise<{ orderId: string }> }) {
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

    const orderDetails = await prisma.order.findUnique({
      where: {
        id: params.orderId,
        items: {
          some: {
            product: {
              partnerId: _currentUser.id,
            },
          },
        },
      },
      include: {
        user: true,
        items: {
          where: {
            product: {
              partnerId: _currentUser.id,
            },
          },
          include: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                partnerId: true,
              },
            },
          },
        },
      },
    })

    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: 'Order Not Found' }), {
        status: 404,
      })
    }

    return NextResponse.json({ orderDetails }, { status: 200 })
  } catch (err) {
    console.log('[ORDER_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const PUT = async (req: NextRequest, props: { params: Promise<{ orderId: string }> }) => {
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

    const body = await req.json()

    const order = await prisma.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        status: body.status,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('[ORDER_PUT]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
