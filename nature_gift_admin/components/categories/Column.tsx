import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import Delete from '../custom-ui/Delete'
import { ArrowUpDown, Edit } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { ICategory } from '@/lib/actions/server'
import { getDocumentId } from '@spreeloop/database'
export const categoryColumns: ColumnDef<ICategory>[] = [
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
    accessorKey: 'name',
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
    header: 'Description',
    cell: ({ row }) => <div className="capitalize">{row.original.data.description}</div>,
  },
  {
    accessorKey: 'featured',
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
        <div>
          <Link href={`/categories/${getDocumentId(category.path)}`}>
            <div className="flex gap-3 items-center">
              <Edit className="w-4 h-4" />
              Edit
            </div>
          </Link>
          <div className="flex gap-3 items-center cursor-pointer">
            <Delete item="categories" handleDelete={onDelete} />
          </div>
        </div>
      )
    },
  },
]
