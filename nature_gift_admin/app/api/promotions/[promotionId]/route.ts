import { deleteData, getDataById, putData } from '@/lib/actions/server'
import { promotionSchema } from '@/lib/validations/promotions'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { isTakenAcrossStores } from '@/lib/tenant'

export const GET = async (
  req: NextRequest,
  props: { params: Promise<{ promotionId: string }> },
) => {
  const params = await props.params
  try {
    return getDataById(req, CollectionsName.Promotions, params.promotionId)
  } catch (error) {
    console.error('[PROMOTION_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const PUT = async (
  req: NextRequest,
  props: { params: Promise<{ promotionId: string }> },
) => {
  const params = await props.params
  try {
    // The order API maintains usageCount; the code is stored upper-case and must be unique.
    const json = await req.clone().json()
    delete json.usageCount
    json.code = String(json.code ?? '')
      .trim()
      .toUpperCase()
    if (
      await isTakenAcrossStores(CollectionsName.Promotions, 'code', json.code, params.promotionId)
    ) {
      return new NextResponse('A promotion already uses this code', { status: 409 })
    }
    return putData(
      new NextRequest(req, { body: JSON.stringify(json) }),
      promotionSchema,
      CollectionsName.Promotions,
      params.promotionId,
    )
  } catch (error) {
    console.error('[PROMOTION_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ promotionId: string }> },
) => {
  const params = await props.params
  try {
    return deleteData(req, CollectionsName.Promotions, params.promotionId)
  } catch (error) {
    console.error('[PROMOTION_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
