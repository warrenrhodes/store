'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/hooks/use-toast'
import { addOrderNote, editOrder, updateOrderStatus } from '@/lib/actions/orders.actions'
import { IOrder } from '@/lib/actions/server'
import { OrderEvent, OrderItem } from '@/lib/firebase/models'
import { orderMessages, trackingUrl, whatsappUrl } from '@/lib/orders/messages'
import {
  EDITABLE_STATUSES,
  FINAL_STATUSES,
  recomputeTotals,
  STATUS_TRANSITIONS,
} from '@/lib/orders/order-logic'
import { DeliveryInfo, OrderPrices, UserData } from '@/lib/type'
import { priceFormatted } from '@/lib/utils/utils'
import { getDocumentId } from '@spreeloop/database'
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Printer,
  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { OrderStatusBadge } from './OrderStatusBadge'

type ProductOption = { path: string; title: string; price: number; stock?: number }
type CustomerStats = { orders: number; delivered: number; failed: number }

const formatDateTime = (date?: string | null) =>
  date
    ? new Date(date).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—'

const STATUS_ACTION: Record<string, string> = {
  ACCEPTED: 'Accept',
  REJECTED: 'Reject',
  CANCELED: 'Cancel order',
  OUT_FOR_DELIVERY: 'Out for delivery',
  COMPLETED: 'Mark delivered',
  FAILED_DELIVERY: 'Delivery failed',
}

/** Shopify-style order page: status workflow, editable lines and fees, customer, timeline. */
export function OrderDetail({
  order,
  products,
  customer,
}: {
  order: IOrder
  products: ProductOption[]
  customer: CustomerStats
}) {
  const router = useRouter()
  const id = getDocumentId(order.path)
  const data = order.data
  const user = data.userData as UserData
  const info = data.deliveryInfo as unknown as DeliveryInfo
  const prices = data.orderPrices as OrderPrices
  const editable = EDITABLE_STATUSES.includes(data.status)
  const [busy, setBusy] = useState<string | null>(null)
  const [statusNote, setStatusNote] = useState('')
  const [note, setNote] = useState('')

  // Edit draft: lines, shipping fee, manual discount.
  const initialLines = data.items.map(i => ({ ...i }))
  const [lines, setLines] = useState<OrderItem[]>(initialLines)
  const [shipping, setShipping] = useState(String(prices.shipping ?? 0))
  const [manualDiscount, setManualDiscount] = useState(String(data.manualDiscount ?? 0))
  const [adding, setAdding] = useState('')

  const preview = useMemo(
    () =>
      recomputeTotals({
        items: lines,
        shipping: Number(shipping) || 0,
        promotions: data.promotions ?? [],
        manualDiscount: Number(manualDiscount) || 0,
      }),
    [lines, shipping, manualDiscount, data.promotions],
  )
  const dirty =
    JSON.stringify(lines.map(l => [l.product.path, l.quantity])) !==
      JSON.stringify(initialLines.map(l => [l.product.path, l.quantity])) ||
    (Number(shipping) || 0) !== (prices.shipping ?? 0) ||
    (Number(manualDiscount) || 0) !== (data.manualDiscount ?? 0)

  const run = async (
    key: string,
    action: () => Promise<{ success: boolean; error?: string }>,
    done: string,
  ) => {
    setBusy(key)
    const res = await action()
    setBusy(null)
    if (res.success) {
      toast({ variant: 'success', description: done })
      router.refresh()
      return true
    }
    toast({ variant: 'destructive', description: res.error || 'Something went wrong' })
    return false
  }

  const changeStatus = async (status: string) => {
    if (
      FINAL_STATUSES.includes(status) &&
      !confirm(
        `Mark order #${id.slice(0, 8).toUpperCase()} as ${status.toLowerCase()}? This can't be undone.`,
      )
    )
      return
    if (
      await run(
        status,
        () => updateOrderStatus(id, status, statusNote),
        `Order → ${status.toLowerCase()}`,
      )
    ) {
      setStatusNote('')
    }
  }

  const saveEdit = () =>
    run(
      'edit',
      () =>
        editOrder(id, {
          items: lines.map(l => ({ path: l.product.path, quantity: l.quantity })),
          shipping: Number(shipping) || 0,
          manualDiscount: Number(manualDiscount) || 0,
        }),
      'Order updated',
    )

  const setQuantity = (path: string, quantity: number) =>
    setLines(current =>
      current
        .map(l => (l.product.path === path ? { ...l, quantity: Math.min(99, quantity) } : l))
        .filter(l => l.quantity > 0),
    )
  const addProduct = (path: string) => {
    const product = products.find(p => p.path === path)
    if (!product) return
    setLines(current =>
      current.some(l => l.product.path === path)
        ? current.map(l => (l.product.path === path ? { ...l, quantity: l.quantity + 1 } : l))
        : [
            ...current,
            {
              product: { path, title: product.title, medias: [], price: {}, creatorId: '' },
              quantity: 1,
              price: product.price,
            } as unknown as OrderItem,
          ],
    )
    setAdding('')
  }

  const tracking = trackingUrl(id, data.trackingToken)
  const messages = user?.phone
    ? orderMessages({
        id,
        firstName: (user.fullName ?? '').split(' ')[0] || 'cher client',
        items: data.items.map(i => `${i.quantity} × ${i.product.title}`).join(', '),
        total: prices.total,
        zone: info?.location || info?.address,
        date: info?.deliveryDate
          ? new Date(info.deliveryDate).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
            })
          : null,
        tracking,
      })
    : []
  const history = [...((data.history ?? []) as OrderEvent[])].reverse()
  const next = STATUS_TRANSITIONS[data.status] ?? []

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="ghost" size="icon" aria-label="Back to orders">
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Order #{id.slice(0, 8).toUpperCase()}</h1>
        <OrderStatusBadge status={data.status} />
        <span className="text-sm text-muted-foreground">{formatDateTime(data.createdAt)}</span>
        <div className="ml-auto flex gap-2">
          {tracking && (
            <Button asChild variant="outline" size="sm">
              <a href={tracking} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" /> Customer page
              </a>
            </Button>
          )}
          <Button asChild variant="outline" size="sm">
            <Link href={`/orders/${id}/print`}>
              <Printer className="mr-1 h-4 w-4" /> Print
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {next.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Next step</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={statusNote}
                  onChange={e => setStatusNote(e.target.value)}
                  placeholder="Optional note for the timeline (e.g. reason, rider name)"
                  aria-label="Status note"
                />
                <div className="flex flex-wrap gap-2">
                  {next.map(status => (
                    <Button
                      key={status}
                      variant={
                        FINAL_STATUSES.includes(status) && status !== 'COMPLETED'
                          ? 'outline'
                          : 'default'
                      }
                      disabled={busy !== null}
                      onClick={() => changeStatus(status)}
                    >
                      {busy === status && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {STATUS_ACTION[status] ?? status}
                    </Button>
                  ))}
                </div>
                {['CANCELED', 'REJECTED'].some(s => next.includes(s as never)) &&
                  data.stockReserved && (
                    <p className="text-xs text-muted-foreground">
                      Canceling or rejecting puts the items back in stock.
                    </p>
                  )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Items</CardTitle>
              {!editable && (
                <span className="text-xs text-muted-foreground">Locked once out for delivery</span>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="divide-y">
                {lines.map(line => (
                  <li key={line.product.path} className="flex items-center gap-3 py-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
                      {line.product.medias?.[0]?.url && (
                        <Image
                          src={line.product.medias[0].url}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="truncate font-medium">{line.product.title}</p>
                      <p className="text-muted-foreground">{priceFormatted(line.price)} each</p>
                    </div>
                    {editable ? (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`One less ${line.product.title}`}
                          onClick={() => setQuantity(line.product.path, line.quantity - 1)}
                        >
                          {line.quantity === 1 ? (
                            <Trash2 className="h-4 w-4" />
                          ) : (
                            <Minus className="h-4 w-4" />
                          )}
                        </Button>
                        <span className="w-8 text-center tabular-nums" aria-live="polite">
                          {line.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`One more ${line.product.title}`}
                          onClick={() => setQuantity(line.product.path, line.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm tabular-nums">× {line.quantity}</span>
                    )}
                    <span className="w-28 text-right text-sm tabular-nums">
                      {priceFormatted(line.price * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {editable && (
                <>
                  <Select value={adding} onValueChange={addProduct}>
                    <SelectTrigger aria-label="Add a product">
                      <SelectValue placeholder="+ Add a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(p => (
                        <SelectItem key={p.path} value={p.path} disabled={p.stock === 0}>
                          {p.title} · {priceFormatted(p.price)}
                          {typeof p.stock === 'number' ? ` · ${p.stock} in stock` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="space-y-1 text-sm">
                      <span className="font-medium">Shipping fee (FCFA)</span>
                      <Input
                        type="number"
                        min={0}
                        step={100}
                        value={shipping}
                        onChange={e => setShipping(e.target.value)}
                      />
                      {!info?.locationId && (
                        <span className="block text-xs text-muted-foreground">
                          Area not listed: set the fee agreed with the customer.
                        </span>
                      )}
                    </label>
                    <label className="space-y-1 text-sm">
                      <span className="font-medium">Extra discount (FCFA)</span>
                      <Input
                        type="number"
                        min={0}
                        step={100}
                        value={manualDiscount}
                        onChange={e => setManualDiscount(e.target.value)}
                      />
                    </label>
                  </div>
                </>
              )}

              <dl className="space-y-1.5 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tabular-nums">{priceFormatted(preview.orderPrices.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="tabular-nums">{priceFormatted(preview.orderPrices.shipping)}</dd>
                </div>
                {preview.promotions.map(p => (
                  <div key={`${p.code}-${p.type}`} className="flex justify-between text-primary">
                    <dt>
                      {p.type === 'FREE_SHIPPING' ? `Free shipping (${p.code})` : `Promo ${p.code}`}
                    </dt>
                    <dd className="tabular-nums">-{priceFormatted(p.discountAmount)}</dd>
                  </div>
                ))}
                {preview.manualDiscount > 0 && (
                  <div className="flex justify-between text-primary">
                    <dt>Extra discount</dt>
                    <dd className="tabular-nums">-{priceFormatted(preview.manualDiscount)}</dd>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <dt>Total to collect</dt>
                  <dd className="tabular-nums">{priceFormatted(preview.orderPrices.total)}</dd>
                </div>
              </dl>

              {editable && dirty && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setLines(initialLines)
                      setShipping(String(prices.shipping ?? 0))
                      setManualDiscount(String(data.manualDiscount ?? 0))
                    }}
                  >
                    Discard
                  </Button>
                  <Button onClick={saveEdit} disabled={busy !== null || lines.length === 0}>
                    {busy === 'edit' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form
                className="flex gap-2"
                onSubmit={async e => {
                  e.preventDefault()
                  if (await run('note', () => addOrderNote(id, note), 'Note added')) setNote('')
                }}
              >
                <Textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Internal note (not visible to the customer)"
                  aria-label="Internal note"
                  className="min-h-[2.5rem]"
                />
                <Button type="submit" variant="outline" disabled={!note.trim() || busy !== null}>
                  Add
                </Button>
              </form>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">No events recorded for this order.</p>
              ) : (
                <ol className="space-y-3 border-l pl-4">
                  {history.map((event, i) => (
                    <li key={`${event.at}-${i}`} className="relative text-sm">
                      <span
                        className="absolute -left-[1.3rem] top-1.5 h-2 w-2 rounded-full bg-primary"
                        aria-hidden
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        {event.type === 'created' && (
                          <span className="font-medium">Order placed</span>
                        )}
                        {event.type === 'status' && event.status && (
                          <OrderStatusBadge status={event.status} />
                        )}
                        {event.type === 'edit' && <span className="font-medium">Order edited</span>}
                        {event.type === 'note' && <span className="font-medium">Note</span>}
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(event.at)} · {event.by}
                        </span>
                      </div>
                      {event.message && (
                        <p className="mt-1 whitespace-pre-line text-muted-foreground">
                          {event.message}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">{user?.fullName || '—'}</p>
              {user?.email && <p className="text-muted-foreground">{user.email}</p>}
              {user?.phone && (
                <>
                  <div className="flex flex-wrap gap-2 pt-1">
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        Send a ready-made message…
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      {messages.map(m => (
                        <DropdownMenuItem key={m.label} asChild>
                          <a
                            href={whatsappUrl(user.phone!, m.text)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {m.label}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    href={`/customers?phone=${encodeURIComponent(user.phone)}`}
                    className="block pt-2 text-primary hover:underline"
                  >
                    {customer.orders} order{customer.orders > 1 ? 's' : ''} · {customer.delivered}{' '}
                    delivered
                    {customer.failed > 0 && ` · ${customer.failed} failed`}
                  </Link>
                  {customer.failed > 0 && (
                    <p className="rounded-md bg-orange-50 p-2 text-xs text-orange-900">
                      This customer already refused or missed {customer.failed} deliver
                      {customer.failed > 1 ? 'ies' : 'y'}: confirm by phone before shipping.
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-sm">
              <p>{info?.deliveryMethod === 'EXPEDITION' ? 'Expedition' : 'Home delivery'}</p>
              {info?.location && <p className="font-medium">{info.location}</p>}
              {info?.city && <p className="text-muted-foreground">{info.city}</p>}
              {info?.address && <p>{info.address}</p>}
              {info?.deliveryDate && (
                <p>
                  {new Date(info.deliveryDate).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}{' '}
                  {info.deliveryTime}
                </p>
              )}
              {info?.additionalNotes && (
                <p className="rounded-md bg-muted p-2 text-muted-foreground">
                  “{info.additionalNotes}”
                </p>
              )}
            </CardContent>
          </Card>

          {(data.promotions ?? []).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Discounts used</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {(data.promotions ?? []).map(p => (
                  <span
                    key={`${p.code}-${p.type}`}
                    className="rounded-full border px-2 py-0.5 font-mono text-xs"
                  >
                    {p.code}
                  </span>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
