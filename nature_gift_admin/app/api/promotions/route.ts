import { promotionSchema } from '@/lib/validations/promotions'
import { NextRequest, NextResponse } from 'next/server'
import { getUserTokensOnApiRoute, postData } from '@/lib/actions/server'
import { CollectionsName } from '@/lib/firebase/collection-name'

export async function POST(req: NextRequest) {
  try {
    const token = await getUserTokensOnApiRoute(req)
    const json = await req.clone().json()
    json.metadata = {
      createdBy: token?.decodedToken.email || token?.decodedToken.uid,
      updatedBy: token?.decodedToken.email || token?.decodedToken.uid,
    }

    const newRequest = new NextRequest(req, {
      body: JSON.stringify(json),
    })
    return postData(
      newRequest,
      promotionSchema,
      CollectionsName.Promotions,
      true,
      'slug',
      json.slug,
    )
  } catch (error) {
    console.error('[PROMOTIONS_POST]', error)
    return NextResponse.json({ error: 'Failed to create promotion' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
