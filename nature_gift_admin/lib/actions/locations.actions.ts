'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { DeliveryLocation, Shipment } from '@/lib/firebase/models'
import { scopedCreate, scopedDelete, scopedList, scopedUpdate, Unauthorized } from '@/lib/tenant'
import { locationSchema, LocationSchemaType } from '@/lib/validations/location'
import { revalidatePath } from 'next/cache'

// Each store has its own locations (docs/MULTI_TENANT_PLAN.md, phase 2): its zones and
// promotions reference them, and another store's are neither listed nor editable.

/** 'Yaoundé – Biyem-Assi' and 'yaounde biyem assi' are the same: no case, accents, dashes or extra spaces. */
const key = (text: string = '') =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[\s\-–—_'’.]+/g, ' ')
    .trim()

/** Same name and city in this store. */
const isDuplicate = async (data: LocationSchemaType, ignoreId?: string) =>
  (await scopedList<DeliveryLocation>(CollectionsName.Locations)).some(
    doc =>
      doc.path.split('/').pop() !== ignoreId &&
      key(doc.data.name) === key(data.name) &&
      key(doc.data.city) === key(data.city),
  )

const failure = (error: unknown, action: string) => {
  if (error instanceof Unauthorized) return { success: false, error: 'Unauthorized' }
  console.error(`Error ${action} location:`, error)
  return { success: false, error: 'Internal server error' }
}

export async function createLocation(data: LocationSchemaType) {
  try {
    const validated = locationSchema.parse(data)
    if (await isDuplicate(validated)) {
      return { success: false, error: `${validated.name} (${validated.city}) already exists` }
    }
    await scopedCreate(CollectionsName.Locations, validated)
    revalidatePath('/locations')
    return { success: true }
  } catch (error) {
    return failure(error, 'creating')
  }
}

/** Renaming keeps the id, so shipments and promotions referencing it keep working. */
export async function updateLocation(locationId: string, data: LocationSchemaType) {
  try {
    const validated = locationSchema.parse(data)
    if (await isDuplicate(validated, locationId)) {
      return { success: false, error: `${validated.name} (${validated.city}) already exists` }
    }
    if (!(await scopedUpdate(CollectionsName.Locations, locationId, validated))) {
      return { success: false, error: 'Not Found or Unauthorized' }
    }
    revalidatePath('/locations')
    return { success: true }
  } catch (error) {
    return failure(error, 'updating')
  }
}

/** Refused while a shipment uses the location: deactivate it instead, or remove it from the shipment first. */
export async function deleteLocation(locationId: string) {
  try {
    const shipments = await scopedList<Shipment>(CollectionsName.Shipments)
    if (shipments.some(s => s.data.locationIds?.includes(locationId))) {
      return {
        success: false,
        error: 'This location is used by a shipment. Remove it there first.',
      }
    }
    if (!(await scopedDelete(CollectionsName.Locations, locationId))) {
      return { success: false, error: 'Not Found or Unauthorized' }
    }
    revalidatePath('/locations')
    return { success: true }
  } catch (error) {
    return failure(error, 'deleting')
  }
}
