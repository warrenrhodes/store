'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { User } from '@/lib/firebase/models'
import { getDatabasePath } from '@spreeloop/database'

export async function syncWishlist(userId: string, currentItems: string[]) {
  if (!userId) throw new Error('User ID required')

  try {
    const userPath = getDatabasePath(CollectionsName.Users, userId)
    const user = await backend.database.getRecord<User>(userPath)

    if (!user) {
      throw new Error('User not found')
    }

    const currentWhitelists = new Set([...(user.data?.whitelists ?? []), ...currentItems])

    await backend.database.setRecord(getDatabasePath(CollectionsName.Users, userId), {
      whitelists: Array.from(currentWhitelists),
    })

    return { success: true }
  } catch (error) {
    console.error('Error syncing wishlist:', error)
    return { success: false, error: 'Internal server error' }
  }
}
