'use client'

import { toast } from '@/hooks/use-toast'
import { updateOrderStatus } from '@/lib/actions/orders.actions'
import { whatsappUrl } from '@/lib/orders/messages'
import { FINAL_STATUSES, STATUS_TRANSITIONS } from '@/lib/orders/order-logic'
import Link from 'next/link'
import { IOrder } from '@/lib/actions/server'
import { DeliveryInfo, OrderPrices, UserData } from '@/lib/type'
import { priceFormatted } from '@/lib/utils/utils'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, Loader2, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { OrderStatusBadge } from './OrderStatusBadge'

const shortId = (order: IOrder) => getDocumentId(order.path).slice(0, 8).toUpperCase()
const customer = (order: IOrder) => order.data.userData as UserData
const formatDate = (date?: string | Date | null) =>
  date
    ? new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—'

export const columns: ColumnDef<IOrder>[] = [
  {
    id: 'order',
    header: 'Order',
    cell: ({ row }) => (
      <Link
        href={`/orders/${getDocumentId(row.original.path)}`}
        className="font-mono text-sm hover:underline"
      >
        #{shortId(row.original)}
      </Link>
    ),
  },
  {
    // Searchable text: customer name, phone and order number.
    id: 'customer',
    accessorFn: row =>
      `${customer(row)?.fullName ?? ''} ${customer(row)?.phone ?? ''} ${shortId(row)}`,
    header: 'Customer',
    cell: ({ row }) => {
      const user = customer(row.original)
      return (
        <div className="min-w-[10rem]">
          <p className="font-medium">{user?.fullName || '—'}</p>
          {user?.phone && (
            <a
              href={whatsappUrl(user.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              {user.phone}
            </a>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    accessorFn: row => row.data.createdAt,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{formatDate(row.original.data.createdAt)}</span>
    ),
  },
  {
    id: 'delivery',
    header: 'Delivery',
    cell: ({ row }) => {
      const info = row.original.data.deliveryInfo as unknown as DeliveryInfo
      return (
        <span className="whitespace-nowrap">
          {formatDate(info?.deliveryDate)} {info?.deliveryTime}
        </span>
      )
    },
  },
  {
    accessorKey: 'status',
    accessorFn: row => row.data.status,
    header: 'Status',
    cell: ({ row }) => <StatusCell order={row.original} />,
  },
  {
    id: 'total',
    accessorFn: row => (row.data.orderPrices as OrderPrices).total,
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {priceFormatted((row.original.data.orderPrices as OrderPrices).total)}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => (
      <Button asChild variant="outline" size="sm">
        <Link href={`/orders/${getDocumentId(row.original.path)}`}>View</Link>
      </Button>
    ),
  },
]

function StatusCell({ order }: { order: IOrder }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const current = order.data.status
  const next = STATUS_TRANSITIONS[current] ?? []

  const change = async (status: string) => {
    if (
      FINAL_STATUSES.includes(status) &&
      !confirm(`Mark order #${shortId(order)} as ${status.toLowerCase()}? This can't be undone.`)
    )
      return
    setPending(true)
    const res = await updateOrderStatus(getDocumentId(order.path), status)
    setPending(false)
    if (res.success) {
      toast({
        variant: 'success',
        description: `Order #${shortId(order)} → ${status.toLowerCase()}`,
      })
      router.refresh()
    } else {
      toast({ variant: 'destructive', description: res.error || 'Failed to update status' })
    }
  }

  return (
    <div className="flex items-center gap-1">
      <OrderStatusBadge status={current} />
      {next.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              disabled={pending}
              aria-label="Change status"
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Change status</DropdownMenuLabel>
            {next.map(status => (
              <DropdownMenuItem key={status} onClick={() => change(status)}>
                <OrderStatusBadge status={status} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
