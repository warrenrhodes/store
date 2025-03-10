import { putData } from '@/lib/actions/server'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionsName } from '@/lib/firebase/collection-name'
import z from 'zod'
import { OrderStatus } from '@/lib/firebase/models'

export const PUT = async (req: NextRequest, props: { params: Promise<{ orderId: string }> }) => {
  const params = await props.params
  try {
    return putData(
      req,
      z.object({
        status: z.enum([
          OrderStatus.ACCEPTED,
          OrderStatus.CANCELED,
          OrderStatus.COMPLETED,
          OrderStatus.COMPLETED,
          OrderStatus.REJECTED,
        ]),
      }),
      CollectionsName.Orders,
      params.orderId,
    )
  } catch (error) {
    console.error('[ORDER_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
