import { NextRequest, NextResponse } from 'next/server'
import { reviewSchema } from '@/lib/validations/reviews'
import { deleteData, getDataById, putData } from '@/lib/actions/server'
import { CollectionsName } from '@/lib/firebase/collection-name'

export const GET = async (req: NextRequest, props: { params: Promise<{ reviewId: string }> }) => {
  const params = await props.params
  try {
    return getDataById(req, CollectionsName.Reviews, params.reviewId)
  } catch (error) {
    console.error('[REVIEW_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const PUT = async (req: NextRequest, props: { params: Promise<{ reviewId: string }> }) => {
  const params = await props.params
  try {
    return putData(req, reviewSchema, CollectionsName.Reviews, params.reviewId)
  } catch (error) {
    console.error('[REVIEW_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  props: { params: Promise<{ reviewId: string }> },
) => {
  const params = await props.params
  try {
    return deleteData(req, CollectionsName.Reviews, params.reviewId)
  } catch (error) {
    console.error('[REVIEW_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
