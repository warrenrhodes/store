import { Prisma, prisma } from '@naturegift/models'

export type IShipment = Prisma.ShipmentGetPayload<object>

export async function getShipments(): Promise<IShipment[]> {
  try {
    const shipments = prisma.shipment.findMany({
      where: {
        isActive: true,
      },
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
