import ShipmentForm from '@/components/shipments/ShipmentForm'
import { getShipmentById } from '@/lib/actions/server'

export default async function EditShipmentPage(props: { params: Promise<{ shipmentId: string }> }) {
  const params = await props.params
  const [shipment] = await Promise.all([getShipmentById(params.shipmentId)])

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit shipment</h1>
        <p className="text-muted-foreground">Make changes to your shipment</p>
      </div>
      <ShipmentForm initialData={shipment} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
