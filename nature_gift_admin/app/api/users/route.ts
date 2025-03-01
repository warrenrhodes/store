import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { getDatabasePath } from '@spreeloop/database'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const data = await request.json()
  if (!data.email || !data.authId) {
    return NextResponse.json('Invalid data', { status: 403 })
  }

  try {
    const result = await backend.database.setRecord(
      getDatabasePath(CollectionsName.Users, data.authId),
      data,
    )

    if (!result) {
      return new NextResponse('Failed to create the user', { status: 500 })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(`Internal error ${e}`, { status: 500 })
  }
}
