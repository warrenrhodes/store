import { ShipmentLocation } from '@/lib/firebase/models'

/**
 * Areas of a shipment. Documents not yet migrated store plain names: the name then doubles
 * as the id, which still matches promotions saved with names (scripts/migrate-location-ids).
 */
export const getShipmentLocations = (shipment: { locations?: unknown }): ShipmentLocation[] =>
  ((shipment.locations ?? []) as Array<string | ShipmentLocation>).map(location =>
    typeof location === 'string' ? { id: location, name: location } : location,
  )
