import { NextRequest, NextResponse } from 'next/server'
import { shipmentSchema } from '@/lib/validations/shipment'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { scopedCreate, Unauthorized } from '@/lib/tenant'
import z from 'zod'

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json()
    const body = shipmentSchema.parse(json)
    const shipment = await scopedCreate(CollectionsName.Shipments, body)

    if (!shipment) {
      return new NextResponse('Failed to create shipment', { status: 500 })
    }

    return NextResponse.json(shipment, { status: 201 })
  } catch (err) {
    if (err instanceof Unauthorized) return new NextResponse('Unauthorized', { status: 403 })
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          details: err.issues,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
