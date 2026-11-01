import ShipmentForm from '@/components/shipments/ShipmentForm'
import { getLocationsCache, getShipmentsCache } from '@/lib/actions/server'

export default async function NewShipmentPage() {
  const [shipments, locations] = await Promise.all([getShipmentsCache(), getLocationsCache()])
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Create New Shipment</h1>
        <p className="text-muted-foreground">Add a new shipment to your store</p>
      </div>
      <ShipmentForm shipments={shipments} locations={locations} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
