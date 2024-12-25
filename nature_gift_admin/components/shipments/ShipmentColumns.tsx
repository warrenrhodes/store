import { ColumnDef } from '@tanstack/react-table'
import { Edit } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import Delete from '../custom-ui/Delete'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { Prisma } from '@prisma/client'

export const shipmentColumns: ColumnDef<Prisma.ShipmentGetPayload<object>>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => <div className="lowercase">{row.original.method}</div>,
  },
  {
    accessorKey: 'isActive',
    header: 'Is Active',
    cell: ({ row }) => (
      <div>
        <Badge
          className={cn({
            'bg-blue-500 ': row.original.isActive === true,
            'bg-gray-500': !row.original.isActive,
          })}
        >
          {row.original.isActive === true ? 'Active' : 'Inactive'}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'locations',
    header: 'Locations',
    cell: ({ row }) => <span>{row.original.locations.join(', ')}</span>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const shipment = row.original
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/shipments/${row.original.id}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      return (
        <div>
          <Link href={`/shipments/${shipment.id}`}>
            <div className="flex gap-3 items-center">
              <Edit className="w-4 h-4" />
              Edit
            </div>
          </Link>
          <div className="flex gap-3 items-center cursor-pointer">
            <Delete item="shipments" handleDelete={onDelete} />
          </div>
        </div>
      )
    },
  },
]
