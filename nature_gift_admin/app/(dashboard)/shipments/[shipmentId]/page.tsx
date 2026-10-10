import ShipmentForm from '@/components/shipments/ShipmentForm'
import { getShipmentByIdCache } from '@/lib/actions/server'

export default async function EditShipmentPage(props: { params: Promise<{ shipmentId: string }> }) {
  const params = await props.params
  const [shipment] = await Promise.all([getShipmentByIdCache(params.shipmentId)])

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Edit shipment</h1>
        <p className="text-muted-foreground">Make changes to your shipment</p>
      </div>
      <ShipmentForm initialData={shipment} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
