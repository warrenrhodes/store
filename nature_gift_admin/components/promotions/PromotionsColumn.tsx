'use client'

import { ArrowUpDown, Edit } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IPromotion } from '@/lib/actions/server'
import { PromotionStatus } from '@/lib/firebase/models'
import { cn } from '@/lib/utils'
import { toDate } from '@/lib/utils/utils'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import Delete from '../custom-ui/Delete'

export const promotionsColumns: ColumnDef<IPromotion>[] = [
  {
    accessorKey: 'code',
    accessorFn: row => row.data.code,
    header: 'Code',
    cell: ({ row }) => <div className="font-mono leading-none">{row.original.data.code}</div>,
  },
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
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.data.name}</div>
        {row.original.data.description && (
          <div className="text-sm text-muted-foreground truncate max-w-[300px]">
            {row.original.data.description}
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'period',
    header: 'Period',
    cell: ({ row }) => (
      <div className="text-sm">
        <div>{toDate(row.original.data.startDate)?.toLocaleDateString('en-GB') ?? '—'}</div>
        <div className="text-muted-foreground">
          to {toDate(row.original.data.endDate)?.toLocaleDateString('en-GB') ?? '—'}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    accessorFn: row => row.data.status,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <Badge
            className={cn({
              'bg-emerald-100 text-emerald-900 hover:bg-emerald-100':
                row.original.data.status !== PromotionStatus.ACTIVE,
              'bg-sky-100 text-sky-900 hover:bg-sky-100':
                row.original.data.status === PromotionStatus.DRAFT,
              'bg-red-100 text-red-900 hover:bg-red-100':
                row.original.data.status === PromotionStatus.EXPIRED,
              'bg-muted text-muted-foreground hover:bg-muted':
                row.original.data.status === PromotionStatus.DISABLED,
            })}
          >
            {row.original.data.status}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'priority',
    accessorFn: row => row.data.priority,
    header: 'Priority',
    cell: ({ row }) => <div className="font-medium">{row.original.data.priority}</div>,
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
          <Button asChild variant="ghost" size="icon" aria-label="Edit">
            <Link href={`/promotions/${getDocumentId(row.original.path)}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Delete item="promotions" handleDelete={onDelete} />
        </div>
      )
    },
  },
]
