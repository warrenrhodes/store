'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { shipmentColumns } from './ShipmentColumns'
import { Prisma } from '@naturegift/models'

interface ShipmentListProps {
  shipments: Prisma.ShipmentGetPayload<object>[]
}

export function ShipmentList({ shipments }: ShipmentListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Shipments</h2>
        <Button asChild>
          <Link href="/shipments/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Shipments
          </Link>
        </Button>
      </div>
      <DataTable columns={shipmentColumns} data={shipments} searchKey="method" />
    </div>
  )
}
