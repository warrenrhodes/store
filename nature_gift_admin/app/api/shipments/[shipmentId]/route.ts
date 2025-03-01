import { deleteData, getDataById, putData } from '@/lib/actions/server'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { shipmentSchema } from '@/lib/validations/shipment'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, props: { params: Promise<{ shipmentId: string }> }) => {
  const params = await props.params
  try {
    return getDataById(req, CollectionsName.Shipments, params.shipmentId)
  } catch (error) {
    console.error('[SHIPMENT_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const PUT = async (req: NextRequest, props: { params: Promise<{ shipmentId: string }> }) => {
  const params = await props.params
  try {
    return putData(req, shipmentSchema, CollectionsName.Shipments, params.shipmentId)
  } catch (error) {
    console.error('[SHIPMENT_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ shipmentId: string }> },
) => {
  const params = await props.params
  try {
    return deleteData(req, CollectionsName.Shipments, params.shipmentId)
  } catch (error) {
    console.error('[SHIPMENT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
