'use client'

import { format } from 'date-fns'
import { ArrowUpDown, Edit } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IPromotion } from '@/lib/actions/server'
import { PromotionStatus } from '@/lib/firebase/models'
import { cn } from '@/lib/utils'
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
        <div>{format(new Date(row.original.data.startDate), 'PP')}</div>
        <div className="text-muted-foreground">
          to {format(new Date(row.original.data.endDate), 'PP')}
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
              'bg-green-500': row.original.data.status !== PromotionStatus.ACTIVE,
              'bg-blue-500': row.original.data.status === PromotionStatus.DRAFT,
              'bg-red-500': row.original.data.status === PromotionStatus.EXPIRED,
              'bg-gray-500': row.original.data.status === PromotionStatus.DISABLED,
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
        <div>
          <Link href={`/promotions/${getDocumentId(row.original.path)}`}>
            <div className="flex gap-3 items-center">
              <Edit className="w-4 h-4" />
              Edit
            </div>
          </Link>
          <div className="flex gap-3 items-center cursor-pointer">
            <Delete item="promotions" handleDelete={onDelete} />
          </div>
        </div>
      )
    },
  },
]
