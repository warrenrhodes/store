import { IReview } from '@/lib/actions/server'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit } from 'lucide-react'
import Link from 'next/link'
import Delete from '../custom-ui/Delete'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

export const reviewColumns: ColumnDef<IReview>[] = [
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
    accessorFn: row => row.data.userName,
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
    cell: ({ row }) => <div className="lowercase">{row.original.data.userName}</div>,
  },
  {
    accessorKey: 'product',
    accessorFn: row => row.data.productPath,
    header: 'Product',
    cell: ({ row }) => <p>{row.original.data.productPath}</p>,
  },
  {
    accessorKey: 'rating',
    accessorFn: row => row.data.rating,
    header: 'Rating',
    cell: ({ row }) => <p>{row.original.data.rating}</p>,
  },

  {
    id: 'actions',
    header: 'Product',
    cell: ({ row }) => {
      const review = row.original
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/reviews/${getDocumentId(review.path || '')}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      return (
        <div>
          <Link href={`/reviews/${getDocumentId(review.path)}`}>
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
