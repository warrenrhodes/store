import ShipmentForm from '@/components/shipments/ShipmentForm'
import { getLocationsCache, getShipmentByIdCache, getShipmentsCache } from '@/lib/actions/server'

export default async function EditShipmentPage(props: { params: Promise<{ shipmentId: string }> }) {
  const params = await props.params
  const [shipment, shipments, locations] = await Promise.all([
    getShipmentByIdCache(params.shipmentId),
    getShipmentsCache(),
    getLocationsCache(),
  ])

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Edit shipment</h1>
        <p className="text-muted-foreground">Make changes to your shipment</p>
      </div>
      <ShipmentForm initialData={shipment} shipments={shipments} locations={locations} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
