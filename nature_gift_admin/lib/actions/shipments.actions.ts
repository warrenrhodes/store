'use server'

import { CollectionsName } from '@/lib/firebase/collection-name'
import { shipmentSchema, ShipmentSchemaType } from '@/lib/validations/shipment'
import { revalidatePath } from 'next/cache'
import { scopedCreate, scopedDelete, scopedUpdate } from '@/lib/tenant'

export async function createShipment(data: ShipmentSchemaType) {
  try {
    const validatedData = shipmentSchema.parse(data)

    const result = await scopedCreate(CollectionsName.Shipments, validatedData)

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
    const validatedData = shipmentSchema.parse(data)
    const result = await scopedUpdate(CollectionsName.Shipments, shipmentId, validatedData)

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
    if (!(await scopedDelete(CollectionsName.Shipments, shipmentId))) {
      return { success: false, error: 'Not Found or Unauthorized' }
    }

    revalidatePath('/shipments')
    return { success: true }
  } catch (error) {
    console.error('Error deleting shipment:', error)
    return { success: false, error: 'Internal server error' }
  }
}
