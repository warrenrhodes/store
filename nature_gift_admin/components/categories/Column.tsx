import { ICategory } from '@/lib/actions/server'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit } from 'lucide-react'
import Link from 'next/link'
import Delete from '../custom-ui/Delete'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
export const categoryColumns: ColumnDef<ICategory>[] = [
  {
    accessorKey: 'name',
    accessorFn: row => row.data.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.original.data.name}</div>,
  },
  {
    accessorKey: 'description',
    accessorFn: row => row.data.description,
    header: 'Description',
    cell: ({ row }) => <div className="capitalize">{row.original.data.description}</div>,
  },
  {
    accessorKey: 'featured',
    accessorFn: row => row.data.featured,
    header: 'Featured',
    cell: ({ row }) => <div>{row.original.data.featured && <Badge>Featured</Badge>}</div>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const category = row.original
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/categories/${getDocumentId(category.path)}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      return (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="Edit">
            <Link href={`/categories/${getDocumentId(category.path)}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Delete item="categories" handleDelete={onDelete} />
        </div>
      )
    },
  },
]
