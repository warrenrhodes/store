import { getUserTokensOnApiRoute, postData } from '@/lib/actions/server'
import { categorySchema } from '@/lib/validations/category'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionsName } from '@/lib/firebase/collection-name'

export const POST = async (req: NextRequest) => {
  try {
    const token = await getUserTokensOnApiRoute(req)
    const json = await req.clone().json()

    const newRequest = new NextRequest(req, {
      body: JSON.stringify({
        ...json,
        creatorId: token?.decodedToken.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
    return postData(newRequest, categorySchema, CollectionsName.Categories, true, 'slug', json.slug)
  } catch (error) {
    console.error('[CATEGORIES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
