'use client'

import { IProduct } from '@/lib/actions/server'
import { ProductStatus } from '@/lib/firebase/models'
import { Inventory, Price } from '@/lib/type'
import { cn } from '@/lib/utils'
import { priceFormatted } from '@/lib/utils/utils'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Delete from '../custom-ui/Delete'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export const productColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'title',
    accessorFn: row => row.data.title,
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
    cell: ({ row }) => {
      const media = row.original.data.medias?.[0]?.url
      return (
        <Link
          href={`/products/${getDocumentId(row.original.path)}`}
          className="flex items-center gap-3 font-medium hover:underline"
        >
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-muted">
            {media && <Image src={media} alt="" fill sizes="40px" className="object-cover" />}
          </span>
          <span className="line-clamp-2">{row.original.data.title}</span>
        </Link>
      )
    },
  },
  {
    accessorKey: 'status',
    accessorFn: row => row.data.status,
    header: 'Status',
    cell: ({ row }) => (
      <div>
        <Badge
          className={cn({
            'bg-emerald-100 text-emerald-900 hover:bg-emerald-100':
              row.original.data.status === ProductStatus.PUBLISHED,
            'bg-muted text-muted-foreground hover:bg-muted':
              row.original.data.status === ProductStatus.DRAFT,
            'bg-red-100 text-red-900 hover:bg-red-100':
              row.original.data.status === ProductStatus.ARCHIVED,
          })}
        >
          {row.original.data.status}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'visibility',
    accessorFn: row => row.data.visibility,
    header: 'Visibility',
    cell: ({ row }) => (
      <div>
        <Badge
          className={cn({
            'bg-sky-100 text-sky-900 hover:bg-sky-100': row.original.data.visibility === true,
            'bg-muted text-muted-foreground hover:bg-muted': !row.original.data.visibility,
          })}
        >
          {row.original.data.visibility === true ? 'Visible' : 'Hidden'}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    accessorFn: row => (row.data.price as unknown as Price).regular,
    header: 'Price (FCFA)',
    cell: ({ row }) => (
      <div>{priceFormatted((row.original.data.price as unknown as Price).regular)}</div>
    ),
  },
  {
    id: 'stock',
    accessorFn: row => (row.data.inventory as Inventory)?.stockQuantity ?? -1,
    header: 'Stock',
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
          <Button asChild variant="ghost" size="icon" aria-label="Edit">
            <Link href={`/products/${getDocumentId(row.original.path)}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Delete item="products" handleDelete={onDelete} />
        </div>
      )
    },
  },
]
