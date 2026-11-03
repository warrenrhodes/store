'use client'

import { Button } from '@/components/ui/button'
import { whatsappUrl } from '@/lib/orders/messages'
import { aggregateCustomers, refusalRate } from '@/lib/orders/order-logic'
import { priceFormatted } from '@/lib/utils/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export type CustomerRow = ReturnType<typeof aggregateCustomers>[number]

const sortable = (label: string) =>
  function SortHeader({
    column,
  }: {
    column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => false | 'asc' | 'desc' }
  }) {
    return (
      <Button
        variant="ghost"
        className="-ml-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )
  }

export const customerColumns: ColumnDef<CustomerRow>[] = [
  {
    // Searchable text: name and phone.
    id: 'customer',
    accessorFn: row => `${row.name} ${row.phone}`,
    header: 'Customer',
    cell: ({ row }) => (
      <div className="min-w-[10rem]">
        <p className="font-medium">{row.original.name || '—'}</p>
        <a
          href={whatsappUrl(row.original.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden />
          {row.original.phone}
        </a>
      </div>
    ),
  },
  {
    accessorKey: 'orders',
    header: sortable('Orders'),
    cell: ({ row }) => <span className="tabular-nums">{row.original.orders}</span>,
  },
  {
    accessorKey: 'delivered',
    header: 'Delivered',
    cell: ({ row }) => <span className="tabular-nums">{row.original.delivered}</span>,
  },
  {
    id: 'refusal',
    accessorFn: row => refusalRate(row.delivered, row.failed),
    header: sortable('Refused'),
    cell: ({ row }) => {
      const { delivered, failed } = row.original
      if (failed === 0) return <span className="text-muted-foreground">—</span>
      return (
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-900">
          {failed} · {Math.round(refusalRate(delivered, failed) * 100)} %
        </span>
      )
    },
  },
  {
    accessorKey: 'spent',
    header: sortable('Spent'),
    cell: ({ row }) => <span className="tabular-nums">{priceFormatted(row.original.spent)}</span>,
  },
  {
    accessorKey: 'lastOrderAt',
    header: sortable('Last order'),
    cell: ({ row }) =>
      new Date(row.original.lastOrderAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button asChild variant="outline" size="sm">
        <Link href={`/orders?q=${encodeURIComponent(row.original.phone)}`}>Orders</Link>
      </Button>
    ),
  },
]
