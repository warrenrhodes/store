import { NextResponse } from 'next/server'
import { prisma } from '@naturegift/models'

export const dynamic = 'force-dynamic'
export const GET = async () => {
  try {
    const shipments = prisma.shipment.findMany()

    if (!shipments) {
      return NextResponse.json([], { status: 200 })
    }
    console.log('shipments', shipments)
    return NextResponse.json(shipments, { status: 200 })
  } catch (err) {
    console.log('[shipments_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
