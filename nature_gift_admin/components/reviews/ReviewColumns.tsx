import { IReview } from '@/lib/actions/server'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit } from 'lucide-react'
import Link from 'next/link'
import Delete from '../custom-ui/Delete'
import { Button } from '../ui/button'

export const reviewColumns: ColumnDef<IReview>[] = [
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
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="Edit">
            <Link href={`/reviews/${getDocumentId(review.path)}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Delete item="reviews" handleDelete={onDelete} />
        </div>
      )
    },
  },
]
