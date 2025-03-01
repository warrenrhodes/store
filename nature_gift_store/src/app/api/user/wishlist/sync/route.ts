import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { User } from '@/lib/firebase/models'
import { getDatabasePath } from '@spreeloop/database'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId, currentItems } = await request.json()

    const userPath = getDatabasePath(CollectionsName.Users, userId)

    const user = await backend.database.getRecord<User>(userPath)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const currentWhitelists = new Set([...user.data.whitelists, ...currentItems])

    await backend.database.setRecord(getDatabasePath(CollectionsName.Users, userId), {
      whitelists: currentWhitelists,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error syncing wishlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
