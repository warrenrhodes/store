'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { locationSchema, LocationSchemaType } from '@/lib/validations/location'
import { revalidatePath } from 'next/cache'
import { getUserTokens } from './server'

const isDuplicate = async (data: LocationSchemaType, ignoreId?: string) => {
  const existing = await backend.db.collection(CollectionsName.Locations).get()
  return existing.docs.some(
    doc =>
      doc.id !== ignoreId &&
      doc.get('name')?.toLowerCase() === data.name.toLowerCase() &&
      doc.get('city')?.toLowerCase() === data.city.toLowerCase(),
  )
}

export async function createLocation(data: LocationSchemaType) {
  try {
    const token = await getUserTokens()
    if (!token) return { success: false, error: 'Unauthorized' }

    const validated = locationSchema.parse(data)
    if (await isDuplicate(validated)) {
      return { success: false, error: `${validated.name} (${validated.city}) already exists` }
    }
    await backend.db.collection(CollectionsName.Locations).add({
      ...validated,
      creatorId: token.decodedToken.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    revalidatePath('/locations')
    return { success: true }
  } catch (error) {
    console.error('Error creating location:', error)
    return { success: false, error: 'Internal server error' }
  }
}

/** Renaming keeps the id, so shipments and promotions referencing it keep working. */
export async function updateLocation(locationId: string, data: LocationSchemaType) {
  try {
    const token = await getUserTokens()
    if (!token) return { success: false, error: 'Unauthorized' }

    const validated = locationSchema.parse(data)
    if (await isDuplicate(validated, locationId)) {
      return { success: false, error: `${validated.name} (${validated.city}) already exists` }
    }
    await backend.db
      .collection(CollectionsName.Locations)
      .doc(locationId)
      .update({ ...validated, updatedAt: new Date().toISOString() })
    revalidatePath('/locations')
    return { success: true }
  } catch (error) {
    console.error('Error updating location:', error)
    return { success: false, error: 'Internal server error' }
  }
}

/** Refused while a shipment uses the location: deactivate it instead, or remove it from the shipment first. */
export async function deleteLocation(locationId: string) {
  try {
    const token = await getUserTokens()
    if (!token) return { success: false, error: 'Unauthorized' }

    const used = await backend.db
      .collection(CollectionsName.Shipments)
      .where('locationIds', 'array-contains', locationId)
      .limit(1)
      .get()
    if (!used.empty) {
      return {
        success: false,
        error: 'This location is used by a shipment. Remove it there first.',
      }
    }
    await backend.db.collection(CollectionsName.Locations).doc(locationId).delete()
    revalidatePath('/locations')
    return { success: true }
  } catch (error) {
    console.error('Error deleting location:', error)
    return { success: false, error: 'Internal server error' }
  }
}
