import { ShipmentList } from '@/components/shipments/ShipmentList'
import { getShipments } from '@/lib/actions/actions'

export default async function ShipmentsPage() {
  const shipments = await getShipments()
  return (
    <div className="container py-10">
      <ShipmentList shipments={shipments} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
