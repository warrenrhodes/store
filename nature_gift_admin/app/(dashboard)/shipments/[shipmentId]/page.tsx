import ShipmentForm from '@/components/shipments/ShipmentForm'
import { getShipmentById } from '@/lib/actions/server'
import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

async function getShipment(shipmentId: string) {
  const { getToken } = await auth()
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/shipments/${shipmentId}`,
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    },
  )

  if (!response.ok) {
    notFound()
  }

  return response.json()
}

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
