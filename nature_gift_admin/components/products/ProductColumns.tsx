'use client'

import { IProduct } from '@/lib/actions/server'
import { Inventory, Price } from '@/lib/type'
import { priceFormatted } from '@/lib/utils/utils'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import Delete from '../custom-ui/Delete'
import { SortHeader, StatusBadge, TitleCell } from '../custom-ui/ListParts'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export const productColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'title',
    accessorFn: row => row.data.title,
    header: ({ column }) => <SortHeader column={column} label="Product" />,
    cell: ({ row }) => (
      <TitleCell
        href={`/products/${getDocumentId(row.original.path)}`}
        title={row.original.data.title}
        detail={(row.original.data.categories ?? []).join(', ')}
        image={row.original.data.medias?.[0]?.url}
      />
    ),
  },
  {
    accessorKey: 'status',
    accessorFn: row => row.data.status,
    header: ({ column }) => <SortHeader column={column} label="Status" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <StatusBadge status={row.original.data.status} />
        {!row.original.data.visibility && (
          <Badge variant="outline" className="font-medium">
            Hidden
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    accessorFn: row => (row.data.price as unknown as Price).regular,
    header: ({ column }) => <SortHeader column={column} label="Price" />,
    cell: ({ row }) => (
      <span className="whitespace-nowrap tabular-nums">
        {priceFormatted((row.original.data.price as unknown as Price).regular)}
      </span>
    ),
  },
  {
    id: 'stock',
    accessorFn: row => (row.data.inventory as Inventory)?.stockQuantity ?? -1,
    header: ({ column }) => <SortHeader column={column} label="Stock" />,
    cell: ({ row }) => {
      const inventory = row.original.data.inventory as Inventory | undefined
      const stock = inventory?.stockQuantity
      if (typeof stock !== 'number')
        return <span className="text-muted-foreground">Not tracked</span>
      return (
        <div className="flex items-center gap-2 tabular-nums">
          {stock}
          {stock === 0 ? (
            <Badge variant="destructive">Out of stock</Badge>
          ) : stock <= (inventory?.lowStockThreshold ?? 0) ? (
            <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100">Low stock</Badge>
          ) : null}
        </div>
      )
    },
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
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="Edit" title="Edit">
            <Link href={`/products/${getDocumentId(row.original.path)}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Delete handleDelete={onDelete} />
        </div>
      )
    },
  },
]
