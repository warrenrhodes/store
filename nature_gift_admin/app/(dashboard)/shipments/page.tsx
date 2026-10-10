import { ShipmentList } from '@/components/shipments/ShipmentList'
import { getShipmentsCache } from '@/lib/actions/server'

export default async function ShipmentsPage() {
  const shipments = await getShipmentsCache()
  return (
    <div className="mx-auto w-full max-w-6xl">
      <ShipmentList shipments={shipments} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
