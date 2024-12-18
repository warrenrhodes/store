import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import Delete from '../custom-ui/Delete'
import Link from 'next/link'
import { Prisma } from '@naturegift/models'

export const reviewColumns: ColumnDef<Prisma.ReviewGetPayload<{}>>[] = [
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
    accessorKey: 'userName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          User Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('userName')}</div>,
  },
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) => <p>{row.original.productId}</p>,
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }) => <p>{row.original.rating}</p>,
  },

  {
    id: 'actions',
    header: 'Product',
    cell: ({ row }) => {
      const review = row.original
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/reviews/${row.original.id}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      return (
        <div>
          <Link href={`/reviews/${review.id}`}>
            <div className="flex gap-3 items-center">
              <Edit className="w-4 h-4" />
              Edit
            </div>
          </Link>
          <div className="flex gap-3 items-center cursor-pointer">
            <Delete item="reviews" handleDelete={onDelete} />
          </div>
        </div>
      )
    },
  },
]
