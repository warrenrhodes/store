'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { shipmentSchema, ShipmentSchemaType } from '@/lib/validations/shipment'
import { getDatabasePath } from '@spreeloop/database'
import { revalidatePath } from 'next/cache'
import { getUserTokens } from './server'

export async function createShipment(data: ShipmentSchemaType) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const validatedData = shipmentSchema.parse(data)

    const result = await backend.database.createRecord(CollectionsName.Shipments, {
      ...validatedData,
      creatorId: token.decodedToken.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    if (!result) {
      return { success: false, error: 'Failed to create shipment' }
    }

    revalidatePath('/shipments')
    return { success: true }
  } catch (error) {
    console.error('Error creating shipment:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function updateShipment(shipmentId: string, data: ShipmentSchemaType) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const validatedData = shipmentSchema.parse(data)
    const shipmentPath = getDatabasePath(CollectionsName.Shipments, shipmentId)

    const result = await backend.database.setRecord(shipmentPath, {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    })

    if (!result) {
      return { success: false, error: 'Failed to update shipment' }
    }

    revalidatePath('/shipments')
    revalidatePath(`/shipments/${shipmentId}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating shipment:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function deleteShipment(shipmentId: string) {
  try {
    const token = await getUserTokens()
    if (!token) {
      throw new Error('Unauthorized')
    }

    const dataRef = backend.db.collection(CollectionsName.Shipments).doc(shipmentId)
    const dataDoc = await dataRef.get()

    if (!dataDoc.exists || dataDoc?.data()?.creatorId !== token.decodedToken.uid) {
       return { success: false, error: 'Not Found or Unauthorized' }
    }

    await dataRef.delete()

    revalidatePath('/shipments')
    return { success: true }
  } catch (error) {
    console.error('Error deleting shipment:', error)
    return { success: false, error: 'Internal server error' }
  }
}
