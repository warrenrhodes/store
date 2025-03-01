import { reviewSchema } from '@/lib/validations/reviews'
import { NextRequest, NextResponse } from 'next/server'
import { postData } from '@/lib/actions/server'
import { CollectionsName } from '@/lib/firebase/collection-name'

export const POST = async (req: NextRequest) => {
  try {
    return postData(req, reviewSchema, CollectionsName.Reviews)
  } catch (error) {
    console.error('[REVIEWS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
