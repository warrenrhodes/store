'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { deleteCheckout, markCheckoutContacted } from '@/lib/actions/checkouts.actions'
import { ICheckout } from '@/lib/actions/server'
import { whatsappUrl } from '@/lib/orders/messages'
import { checkoutState } from '@/lib/orders/order-logic'
import { priceFormatted } from '@/lib/utils/utils'
import { ColumnDef } from '@tanstack/react-table'
import { formatDistanceToNow } from 'date-fns'
import { Check, MessageCircle, Phone, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const recoveryMessage = (c: ICheckout) => {
  const firstName = c.data.fullName.split(' ')[0]
  const items = c.data.items.map(i => `${i.quantity} × ${i.title}`).join(', ')
  const link = c.data.source
    ? `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? ''}${c.data.source}`
    : ''
  return (
    `Bonjour ${firstName}, vous avez commencé une commande chez N.Gift (${items})` +
    ` sans la terminer. Avez-vous rencontré un souci ? Nous pouvons la finaliser pour vous` +
    ` par téléphone.${link ? ` Ou reprenez ici : ${link}` : ''}`
  )
}

function Actions({ checkout }: { checkout: ICheckout }) {
  const router = useRouter()
  const id = checkout.path.split('/').pop()!
  const run = async (action: () => Promise<{ success: boolean; error?: string }>, done: string) => {
    const res = await action()
    toast(
      res.success
        ? { variant: 'success', description: done }
        : { variant: 'destructive', description: res.error },
    )
    if (res.success) router.refresh()
  }
  if (checkout.data.orderPath) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link href={`/orders/${checkout.data.orderPath.split('/').pop()}`}>View order</Link>
      </Button>
    )
  }
  return (
    <div className="flex items-center gap-1">
      <Button asChild size="sm">
        <a
          href={whatsappUrl(checkout.data.phone, recoveryMessage(checkout))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            !checkout.data.contactedAt &&
            markCheckoutContacted(id, true).then(() => router.refresh())
          }
        >
          <MessageCircle className="mr-1 h-4 w-4" /> Relaunch
        </a>
      </Button>
      <Button asChild size="icon" variant="outline" aria-label={`Call ${checkout.data.phone}`}>
        <a href={`tel:${checkout.data.phone}`}>
          <Phone className="h-4 w-4" />
        </a>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        aria-label={checkout.data.contactedAt ? 'Mark as not contacted' : 'Mark as contacted'}
        onClick={() => run(() => markCheckoutContacted(id, !checkout.data.contactedAt), 'Updated')}
      >
        <Check className={checkout.data.contactedAt ? 'h-4 w-4 text-primary' : 'h-4 w-4'} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        aria-label="Delete"
        onClick={() =>
          confirm('Delete this abandoned checkout?') && run(() => deleteCheckout(id), 'Deleted')
        }
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

const STATE_STYLE: Record<string, string> = {
  NEW: 'bg-amber-100 text-amber-900',
  CONTACTED: 'bg-sky-100 text-sky-900',
  RECOVERED: 'bg-emerald-100 text-emerald-900',
}

export const checkoutColumns: ColumnDef<ICheckout>[] = [
  {
    id: 'customer',
    accessorFn: row => `${row.data.fullName} ${row.data.phone}`,
    header: 'Customer',
    cell: ({ row }) => (
      <div className="min-w-[9rem]">
        <p className="font-medium">{row.original.data.fullName}</p>
        <p className="text-xs text-muted-foreground">{row.original.data.phone}</p>
      </div>
    ),
  },
  {
    id: 'started',
    accessorFn: row => row.data.createdAt,
    header: 'Started',
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm">
        {formatDistanceToNow(new Date(row.original.data.createdAt), { addSuffix: true })}
      </span>
    ),
  },
  {
    id: 'items',
    header: 'Cart',
    cell: ({ row }) => (
      <div className="max-w-[16rem] text-sm">
        {row.original.data.items.map(i => (
          <p key={i.productPath} className="truncate">
            {i.quantity} × {i.title}
          </p>
        ))}
        {row.original.data.location && (
          <p className="text-xs text-muted-foreground">{row.original.data.location}</p>
        )}
      </div>
    ),
  },
  {
    id: 'total',
    header: () => <div className="text-right">Value</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{priceFormatted(row.original.data.total)}</div>
    ),
  },
  {
    id: 'state',
    accessorFn: row => checkoutState(row),
    header: 'Status',
    cell: ({ row }) => {
      const state = checkoutState(row.original)
      return (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATE_STYLE[state]}`}>
          {state === 'NEW' ? 'Not contacted' : state === 'CONTACTED' ? 'Contacted' : 'Recovered'}
        </span>
      )
    },
  },
  { id: 'actions', cell: ({ row }) => <Actions checkout={row.original} /> },
]
