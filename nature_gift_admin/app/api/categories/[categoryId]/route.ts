import { deleteData, getDataById, putData } from '@/lib/actions/server'
import { categorySchema } from '@/lib/validations/category'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionsName } from '@/lib/firebase/collection-name'

export const GET = async (req: NextRequest, props: { params: Promise<{ categoryId: string }> }) => {
  const params = await props.params
  try {
    return getDataById(req, CollectionsName.Categories, params.categoryId)
  } catch (error) {
    console.error('[CATEGORY_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const PUT = async (req: NextRequest, props: { params: Promise<{ categoryId: string }> }) => {
  const params = await props.params
  try {
    return putData(req, categorySchema, CollectionsName.Categories, params.categoryId)
  } catch (error) {
    console.error('[CATEGORY_PUT]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ categoryId: string }> },
) => {
  const params = await props.params
  try {
    return deleteData(req, CollectionsName.Categories, params.categoryId)
  } catch (error) {
    console.error('[CATEGORY_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
