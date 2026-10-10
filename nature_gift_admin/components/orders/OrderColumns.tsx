'use client'

import { toast } from '@/hooks/use-toast'
import { updateOrderStatus } from '@/lib/actions/orders.actions'
import { IOrder } from '@/lib/actions/server'
import { OrderItem } from '@/lib/firebase/models'
import { DeliveryInfo, OrderPrices, UserData } from '@/lib/type'
import { priceFormatted } from '@/lib/utils/utils'
import { getDocumentId } from '@spreeloop/database'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, Loader2, MessageCircle, Phone } from 'lucide-react'
import Image from 'next/image'
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
import { Separator } from '../ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { OrderStatusBadge } from './OrderStatusBadge'

const statusTransitions: Record<string, string[]> = {
  PENDING: ['ACCEPTED', 'REJECTED'],
  ACCEPTED: ['COMPLETED', 'CANCELED'],
  COMPLETED: [],
  CANCELED: [],
  REJECTED: [],
}
const FINAL_STATUSES = ['COMPLETED', 'CANCELED', 'REJECTED']

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

/** Cameroon numbers are stored without country code (6XXXXXXXX). */
const whatsappUrl = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits.length === 9 ? `237${digits}` : digits}`
}

export const columns: ColumnDef<IOrder>[] = [
  {
    id: 'order',
    header: 'Order',
    cell: ({ row }) => <span className="font-mono text-sm">#{shortId(row.original)}</span>,
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
    cell: ({ row }) => <OrderView order={row.original} />,
  },
]

function StatusCell({ order }: { order: IOrder }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const current = order.data.status
  const next = statusTransitions[current] ?? []

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

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-right">{children}</span>
  </div>
)

const OrderView = ({ order }: { order: IOrder }) => {
  const user = customer(order)
  const info = order.data.deliveryInfo as unknown as DeliveryInfo
  const prices = order.data.orderPrices as OrderPrices
  const promotions = order.data.promotions ?? []

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Order #{shortId(order)} <OrderStatusBadge status={order.data.status} />
          </SheetTitle>
          <SheetDescription>Placed on {formatDate(order.data.createdAt)}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <section className="space-y-2">
            <h3 className="text-sm font-semibold">Customer</h3>
            <p className="font-medium">{user?.fullName}</p>
            {user?.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
            {user?.phone && (
              <div className="flex gap-2 pt-1">
                <Button asChild size="sm">
                  <a href={whatsappUrl(user.phone)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={`tel:${user.phone}`}>
                    <Phone className="mr-1 h-4 w-4" /> {user.phone}
                  </a>
                </Button>
              </div>
            )}
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="text-sm font-semibold">Delivery</h3>
            <Row label="Address">{info?.address || '—'}</Row>
            <Row label="Date">
              {formatDate(info?.deliveryDate)} {info?.deliveryTime}
            </Row>
            {info?.city && <Row label="City">{info.city}</Row>}
            {info?.location && <Row label="Zone">{info.location}</Row>}
            <Row label="Method">
              {info?.deliveryMethod === 'EXPEDITION' ? 'Expedition' : 'Delivery'}
            </Row>
            {info?.additionalNotes && <Row label="Notes">{info.additionalNotes}</Row>}
          </section>

          <Separator />

          <section className="space-y-3">
            <h3 className="text-sm font-semibold">Items</h3>
            {order.data.items.map(item => (
              <OrderItemView item={item} key={item.product.path} />
            ))}
          </section>

          <Separator />

          <section className="space-y-2">
            <Row label="Subtotal">{priceFormatted(prices.subtotal)}</Row>
            <Row label="Shipping">{priceFormatted(prices.shipping)}</Row>
            {promotions.map(promo => (
              <Row key={promo.code} label={`Promo ${promo.code}`}>
                <span className="text-primary">-{priceFormatted(promo.discountAmount)}</span>
              </Row>
            ))}
            <div className="flex justify-between border-t pt-3 font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{priceFormatted(prices.total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Paid on delivery</p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const OrderItemView = ({ item }: { item: OrderItem }) => (
  <div className="flex items-center gap-3">
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
      {item.product.medias?.[0]?.url && (
        <Image src={item.product.medias[0].url} alt="" fill sizes="48px" className="object-cover" />
      )}
    </div>
    <div className="min-w-0 flex-1 text-sm">
      <p className="truncate font-medium">{item.product.title}</p>
      <p className="text-muted-foreground">
        {item.quantity} × {priceFormatted(item.price)}
      </p>
    </div>
    <span className="text-sm tabular-nums">{priceFormatted(item.price * item.quantity)}</span>
  </div>
)
