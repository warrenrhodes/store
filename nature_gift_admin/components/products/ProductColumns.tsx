'use client'

import { ColumnDef } from '@tanstack/react-table'
import Delete from '../custom-ui/Delete'
import Link from 'next/link'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { ArrowUpDown, Edit } from 'lucide-react'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { priceFormatted } from '@/lib/utils/utils'
import { Inventory, Price } from '@/lib/type'
import { getDocumentId } from '@spreeloop/database'
import { IProduct } from '@/lib/actions/server'
import { ProductStatus } from '@/lib/firebase/models'

export const productColumns: ColumnDef<IProduct>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.original.data.title}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div>
        <Badge
          className={cn({
            'bg-green-500 ': row.original.data.status === ProductStatus.PUBLISHED,
            'bg-gray-500': row.original.data.status === ProductStatus.DRAFT,
            'bg-red-500': row.original.data.status === ProductStatus.ARCHIVED,
          })}
        >
          {row.original.data.status}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'visibility',
    header: 'Visibility',
    cell: ({ row }) => (
      <div>
        <Badge
          className={cn({
            'bg-blue-500 ': row.original.data.visibility === true,
            'bg-gray-500': !row.original.data.visibility,
          })}
        >
          {row.original.data.visibility === true ? 'Visible' : 'Hidden'}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price (FCFA)',
    cell: ({ row }) => (
      <div>{priceFormatted((row.original.data.price as unknown as Price).regular)}</div>
    ),
  },
  {
    accessorKey: 'inventory',
    header: 'Inventory',
    cell: ({ row }) => (
      <div>
        {(row.original.data.inventory as Inventory).quantity}
        {(row.original.data.inventory as Inventory).quantity <=
          (row.original.data.inventory as Inventory).lowStockThreshold && (
          <Badge variant="destructive" className="ml-2">
            Low Stock
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/products/${getDocumentId(row.original.path)}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      return (
        <div>
          <Link href={`/products/${getDocumentId(row.original.path)}`}>
            <div className="flex gap-3 items-center">
              <Edit className="w-4 h-4" />
              Edit
            </div>
          </Link>
          <div className="flex gap-3 items-center cursor-pointer">
            <Delete item="products" handleDelete={onDelete} />
          </div>
        </div>
      )
    },
  },
]
