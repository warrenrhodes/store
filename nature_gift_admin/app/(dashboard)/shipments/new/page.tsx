import ShipmentForm from '@/components/shipments/ShipmentForm'
import { getShipments } from '@/lib/actions/server'

export default async function NewShipmentPage() {
  const shipments = await getShipments()
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Shipment</h1>
        <p className="text-muted-foreground">Add a new shipment to your store</p>
      </div>
      <ShipmentForm shipments={shipments} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
