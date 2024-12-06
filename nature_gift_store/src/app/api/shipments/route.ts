import { NextRequest, NextResponse } from 'next/server'

import Shipment from '@/lib/models/Shipment'
import { connectToDB } from '@/lib/mongoDB'
export const dynamic = 'force-dynamic'
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()
    const shipments = await Shipment.find().sort({ createdAt: 'desc' })

    if (!shipments) {
      return new NextResponse('shipments not found', { status: 500 })
    }

    return NextResponse.json(shipments, { status: 200 })
  } catch (err) {
    console.log('[shipments_GET]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
