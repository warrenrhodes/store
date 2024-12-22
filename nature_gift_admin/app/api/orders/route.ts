import { getUserByClerkId } from '@/lib/actions/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const _currentUser = await getUserByClerkId(userId)
    if (!_currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: {
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
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!orders) {
      return NextResponse.json({ message: 'No orders found' }, { status: 500 })
    }

    const filterOrders = orders.filter(order => {
      return order.items.some(item => item.product.partnerId === userId)
    })

    return NextResponse.json(filterOrders, { status: 201 })
  } catch (err) {
    console.log('[ORDERS_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
