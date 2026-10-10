import ShipmentForm from '@/components/shipments/ShipmentForm'
import { getShipmentsCache } from '@/lib/actions/server'

export default async function NewShipmentPage() {
  const shipments = await getShipmentsCache()
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Create New Shipment</h1>
        <p className="text-muted-foreground">Add a new shipment to your store</p>
      </div>
      <ShipmentForm shipments={shipments} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
