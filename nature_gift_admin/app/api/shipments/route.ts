import { NextRequest, NextResponse } from 'next/server'
import { shipmentSchema } from '@/lib/validations/shipment'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { getUserTokensOnApiRoute } from '@/lib/actions/server'
import z from 'zod'

export const POST = async (req: NextRequest) => {
  try {
    const token = await getUserTokensOnApiRoute(req)

    if (!token) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    // Step 4: Parse request body
    const json = await req.json()

    const body = shipmentSchema.parse(json)

    // Step 6: Create shipment in Firebase
    const shipment = await backend.database.createRecord(CollectionsName.Shipments, {
      ...body,
      creatorId: token.decodedToken.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    if (!shipment) {
      return new NextResponse('Failed to create shipment', { status: 500 })
    }

    return NextResponse.json(shipment, { status: 201 })
  } catch (err) {
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
