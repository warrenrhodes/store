import { ShipmentList } from '@/components/shipments/ShipmentList'
import { Prisma, prisma } from '@naturegift/models'

async function getShipments(): Promise<Prisma.ShipmentGetPayload<{}>[]> {
  try {
    const shipments = prisma.shipment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return shipments
  } catch (error) {
    console.error('Failed to fetch shipments:', error)
    return []
  }
}

export default async function ShipmentsPage() {
  const shipments = await getShipments()
  return (
    <div className="container py-10">
      <ShipmentList shipments={shipments} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
