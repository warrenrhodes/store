import { ShipmentList } from '@/components/shipments/ShipmentList'
import { getShipmentsCache } from '@/lib/actions/server'

export default async function ShipmentsPage() {
  const shipments = await getShipmentsCache()
  return (
    <div className="container py-10">
      <ShipmentList shipments={shipments} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
