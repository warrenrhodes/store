'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { User } from '@/lib/firebase/models'
import { getDatabasePath } from '@spreeloop/database'

export async function saveUserToDatabase(data: any) {
  if (!data.email || !data.authId) {
    throw new Error('Invalid data')
  }

  try {
    const result = await backend.database.setRecord(
      getDatabasePath(CollectionsName.Users, data.authId),
      data,
    )

    if (!result) {
      throw new Error('Failed to create the user')
    }

    return true
  } catch (e) {
    console.error('Error saving user:', e)
    return false
  }
}

export async function checkUserExists(uid: string) {
  try {
    const user = await backend.database.getRecord<User>(
      getDatabasePath(CollectionsName.Users, uid)
    )
    return !!user
  } catch (error) {
    console.error('Error checking user existence:', error)
    return false
  }
}
