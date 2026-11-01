import { ShipmentList } from '@/components/shipments/ShipmentList'
import { getLocationsCache, getShipmentsCache } from '@/lib/actions/server'

export default async function ShipmentsPage() {
  const [shipments, locations] = await Promise.all([getShipmentsCache(), getLocationsCache()])
  return (
    <div className="mx-auto w-full max-w-6xl">
      <ShipmentList shipments={shipments} locations={locations} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
