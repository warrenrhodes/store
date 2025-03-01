import { postData } from '@/lib/actions/server'
import { productSchema } from '@/lib/validations/product'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionsName } from '@/lib/firebase/collection-name'

export async function POST(req: NextRequest) {
  try {
    const json = await req.clone().json()

    return postData(req, productSchema, CollectionsName.Products, true, 'slug', json.slug)
  } catch (error) {
    console.error('[PRODUCTS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
