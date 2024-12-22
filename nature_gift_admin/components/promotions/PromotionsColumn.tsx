'use client'

import Link from 'next/link'
import { ArrowUpDown, Edit } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import Delete from '../custom-ui/Delete'
import { cn } from '@/lib/utils'
import { Prisma } from '@naturegift/models'

export const promotionsColumns: ColumnDef<Prisma.PromotionGetPayload<object>>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <div className="font-mono leading-none">{row.original.code}</div>,
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
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.name}</div>
        {row.original.description && (
          <div className="text-sm text-muted-foreground truncate max-w-[300px]">
            {row.original.description}
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
        <div>{format(new Date(row.original.startDate), 'PP')}</div>
        <div className="text-muted-foreground">
          to {format(new Date(row.original.endDate), 'PP')}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
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
              'bg-green-500': row.original.status !== 'ACTIVE',
              'bg-blue-500': row.original.status === 'DRAFT',
              'bg-red-500': row.original.status === 'EXPIRED',
              'bg-gray-500': row.original.status === 'DISABLED',
            })}
          >
            {row.original.status}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => <div className="font-medium">{row.original.priority}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const promotions = row.original
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/promotions/${promotions.id}`, {
          method: 'DELETE',
        })
        return res.ok
      }

      return (
        <div>
          <Link href={`/promotions/${promotions.id}`}>
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
