import { auth, reverificationErrorResponse } from '@clerk/nextjs/server'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId, has } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!has({ reverification: 'strict' })) {
      return reverificationErrorResponse('strict')
    }

    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
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

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, ...orderData } = body

    if (
      !items ||
      !orderData.deliveryInfo.address ||
      !orderData.deliveryInfo.deliveryDate ||
      !orderData.deliveryInfo.deliveryTime ||
      !orderData.deliveryInfo.city ||
      !orderData.userData.fullName ||
      !orderData.userData.phone ||
      !orderData.orderPrices.totalAmount
    ) {
      return new NextResponse(
        'Missing required fields.[address, deliveryDate, deliveryTime, city, fullName, phone, totalAmount]',
        { status: 400 },
      )
    }

    const order = await prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            product: {
              connect: { id: item.productId },
            },
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const dynamic = 'force-dynamic'
