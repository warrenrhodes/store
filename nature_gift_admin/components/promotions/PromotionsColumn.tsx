'use client'

import { Edit } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IPromotion } from '@/lib/actions/server'
import { priceFormatted } from '@/lib/utils/utils'
import { discountLabel, promotionState } from '@ngift/core/promotion-summary'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import Delete from '../custom-ui/Delete'
import { shortDate, SortHeader, StatusBadge } from '../custom-ui/ListParts'

export const promotionsColumns: ColumnDef<IPromotion>[] = [
  {
    accessorKey: 'name',
    accessorFn: row => row.data.name,
    header: ({ column }) => <SortHeader column={column} label="Promotion" />,
    cell: ({ row }) => (
      <Link href={`/promotions/${getDocumentId(row.original.path)}`} className="group block">
        <span className="line-clamp-1 font-medium group-hover:underline">
          {row.original.data.name}
        </span>
        {row.original.data.description && (
          <span className="line-clamp-1 max-w-[300px] text-xs text-muted-foreground">
            {row.original.data.description}
          </span>
        )}
      </Link>
    ),
  },
  {
    accessorKey: 'code',
    accessorFn: row => row.data.code,
    header: 'Applies',
    cell: ({ row }) =>
      row.original.data.requiresCode ? (
        <Badge variant="outline" className="font-mono font-medium">
          {row.original.data.code}
        </Badge>
      ) : (
        <span className="text-sm text-muted-foreground">Automatic</span>
      ),
  },
  {
    id: 'discount',
    header: 'Discount',
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-medium tabular-nums">
        {discountLabel(row.original.data.actions, priceFormatted)}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    // Its real state: an active promotion past its end date reads Expired.
    accessorFn: row => promotionState(row.data),
    header: ({ column }) => <SortHeader column={column} label="Status" />,
    cell: ({ row }) => <StatusBadge status={promotionState(row.original.data)} />,
  },
  {
    accessorKey: 'period',
    accessorFn: row => row.data.endDate,
    header: ({ column }) => <SortHeader column={column} label="Period" />,
    cell: ({ row }) => (
      <span className="block whitespace-nowrap text-sm">
        {shortDate(row.original.data.startDate)}
        <span className="block text-xs text-muted-foreground">
          to {shortDate(row.original.data.endDate)}
        </span>
      </span>
    ),
  },
  {
    id: 'usage',
    header: 'Used',
    cell: ({ row }) => {
      const { usageCount = 0, usageLimit } = row.original.data
      return (
        <div className="tabular-nums">
          {usageCount}
          {usageLimit?.total ? ` / ${usageLimit.total}` : ''}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/promotions/${getDocumentId(row.original.path)}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      return (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="Edit" title="Edit">
            <Link href={`/promotions/${getDocumentId(row.original.path)}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Delete handleDelete={onDelete} />
        </div>
      )
    },
  },
]
