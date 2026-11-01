'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTable } from '../custom-ui/DataTable'
import { getShipmentColumns } from './ShipmentColumns'
import { ILocation, IShipment } from '@/lib/actions/server'
import { getDocumentId } from '@spreeloop/database'
interface ShipmentListProps {
  shipments: IShipment[]
  locations: ILocation[]
}

export function ShipmentList({ shipments, locations }: ShipmentListProps) {
  const names = new Map(
    locations.map(l => [getDocumentId(l.path), `${l.data.name} (${l.data.city})`]),
  )
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Shipments</h1>
        <Button asChild>
          <Link href="/shipments/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Shipments
          </Link>
        </Button>
      </div>
      <DataTable columns={getShipmentColumns(names)} data={shipments} searchKey="method" />
    </div>
  )
}
