import { deleteData, getDataById, putData } from '@/lib/actions/server'
import { productSchema } from '@/lib/validations/product'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionsName } from '@/lib/firebase/collection-name'

export const GET = async (req: NextRequest, props: { params: Promise<{ productId: string }> }) => {
  const params = await props.params
  try {
    return getDataById(req, CollectionsName.Products, params.productId)
  } catch (error) {
    console.error('[PRODUCT_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const PUT = async (req: NextRequest, props: { params: Promise<{ productId: string }> }) => {
  const params = await props.params
  try {
    return putData(req, productSchema, CollectionsName.Products, params.productId)
  } catch (error) {
    console.error('[PRODUCT_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ productId: string }> },
) => {
  const params = await props.params
  try {
    return deleteData(req, CollectionsName.Products, params.productId)
  } catch (error) {
    console.error('[PRODUCT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
