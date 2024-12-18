import { connectToDB } from '@/lib/mongoDB'
import { prisma } from '@naturegift/models'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, props: { params: Promise<{ orderId: string }> }) {
  const params = await props.params
  try {
    await connectToDB()

    const orderDetails = await prisma.order.findUnique({
      where: { id: params.orderId },
      include: {
        items: {
          include: {
            product: true,
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

export const dynamic = 'force-dynamic'
