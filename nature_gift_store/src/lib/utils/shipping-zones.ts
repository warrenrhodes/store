import { DeliveryLocation, Shipment, ShipmentMethod } from '@/lib/firebase/models'

export type ShippingArea = { id: string; name: string; city: string }

/** A shipment with its locations resolved: what the storefront and the orders API work with. */
export type ShippingZone = { method: ShipmentMethod; cost: number; areas: ShippingArea[] }

const idOf = (path: string) => path.split('/').pop() ?? path

/**
 * Active shipments with their active locations. Shipments not yet migrated
 * (scripts/migrate-locations.mjs) still hold names: the name then doubles as the id, which
 * still matches promotions saved with names.
 */
export const toShippingZones = (
  shipments: Shipment[],
  locations: DeliveryLocation[],
): ShippingZone[] => {
  const byId = new Map(locations.filter(l => l.isActive !== false).map(l => [idOf(l.path), l]))
  return shipments
    .filter(s => s.isActive !== false)
    .map(s => ({
      method: s.method,
      cost: s.cost,
      areas: s.locationIds
        ? s.locationIds.flatMap(id => {
            const location = byId.get(id)
            return location ? [{ id, name: location.name, city: location.city }] : []
          })
        : ((s.locations ?? []) as Array<string | { id: string; name: string }>).map(l =>
            typeof l === 'string'
              ? { id: l, name: l, city: '' }
              : { id: l.id, name: l.name, city: '' },
          ),
    }))
    .filter(zone => zone.areas.length > 0)
}

/** The zone and area a customer picked, matched by id. */
export const findArea = (zones: ShippingZone[], method?: string | null, areaId?: string | null) => {
  for (const zone of zones) {
    if (zone.method !== method) continue
    const area = zone.areas.find(a => a.id === areaId)
    if (area) return { zone, area }
  }
  return undefined
}
