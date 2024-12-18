import { connectToDB } from '@/lib/mongoDB'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { shipmentSchema } from '@/lib/validations/shipment'
import { prisma } from '@naturegift/models'

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      console.log('Unauthorized')
      return new NextResponse('Unauthorized', { status: 403 })
    }

    await connectToDB()
    const json = await req.json()
    const body = shipmentSchema.parse(json)

    const newShipment = await prisma.shipment.create({
      data: body,
    })

    return NextResponse.json(newShipment, { status: 200 })
  } catch (err) {
    console.log('[shipment_POST]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const shipments = await prisma.shipment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(shipments, { status: 200 })
  } catch (err) {
    console.log('[shipment_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
