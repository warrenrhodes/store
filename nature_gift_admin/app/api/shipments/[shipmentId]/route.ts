import { NextRequest, NextResponse } from 'next/server'
import { shipmentSchema } from '@/lib/validations/shipment'
import { prisma } from '@naturegift/models'
import { auth } from '@clerk/nextjs/server'

export const GET = async (req: NextRequest, props: { params: Promise<{ shipmentId: string }> }) => {
  const params = await props.params

  try {
    const shipment = await prisma.shipment.findUnique({
      where: {
        id: params.shipmentId,
      },
    })
    if (!shipment) {
      return new NextResponse('Shipment not found', { status: 404 })
    }

    return NextResponse.json(shipment, { status: 200 })
  } catch (err) {
    console.error('[shipmentId_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const POST = async (
  req: NextRequest,
  props: { params: Promise<{ shipmentId: string }> },
) => {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = shipmentSchema.parse(json)

    const shipment = await prisma.shipment.update({
      where: {
        id: params.shipmentId,
      },
      data: body,
    })

    return NextResponse.json(shipment, { status: 200 })
  } catch (err) {
    console.error('[shipmentId_POST]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ shipmentId: string }> },
) => {
  const params = await props.params
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await prisma.shipment.delete({
      where: {
        id: params.shipmentId,
      },
    })

    return new NextResponse('Shipment deleted successfully', { status: 200 })
  } catch (err) {
    console.error('[shipmentId_DELETE]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
