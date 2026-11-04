import { IShipment } from '@/lib/actions/server'
import { cn } from '@/lib/utils'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import Delete from '../custom-ui/Delete'
import { Badge } from '../ui/badge'

/** `names`: location id -> display name, from the locations collection. */
export const getShipmentColumns = (names: Map<string, string>): ColumnDef<IShipment>[] => {
  const locationNames = (shipment: IShipment) =>
    (shipment.data.locationIds ?? []).map(id => names.get(id) ?? `${id} (deleted)`).join(', ')

  return [
    {
      accessorKey: 'method',
      accessorFn: row => row.data.method,
      header: 'Method',
      cell: ({ row }) => <div className="lowercase">{row.original.data.method}</div>,
    },
    {
      accessorKey: 'isActive',
      accessorFn: row => row.data.isActive,
      header: 'Is Active',
      cell: ({ row }) => (
        <div>
          <Badge
            className={cn({
              'bg-sky-100 text-sky-900 hover:bg-sky-100': row.original.data.isActive === true,
              'bg-muted text-muted-foreground hover:bg-muted': !row.original.data.isActive,
            })}
          >
            {row.original.data.isActive === true ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'locations',
      accessorFn: row => locationNames(row),
      header: 'Locations',
      cell: ({ row }) => <span>{locationNames(row.original)}</span>,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const onDelete = async (): Promise<boolean> => {
          const res = await fetch(`/api/shipments/${getDocumentId(row.original.path)}`, {
            method: 'DELETE',
          })
          return res.ok
        }

        return (
          <div className="flex items-center justify-end gap-1">
            <Button asChild variant="ghost" size="icon" aria-label="Edit">
              <Link href={`/shipments/${getDocumentId(row.original.path)}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <Delete handleDelete={onDelete} />
          </div>
        )
      },
    },
  ]
}
