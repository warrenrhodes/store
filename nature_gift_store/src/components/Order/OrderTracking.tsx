'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useLocalization } from '@/hooks/useLocalization'
import { cn, foldFreeShipping, priceFormatted } from '@/lib/utils/utils'
import { Check, CircleX, Loader2, Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export type TrackedOrder = {
  id: string
  token: string
  status: string
  createdAt: string
  history: Array<{ at: string; type: string; status?: string | null }>
  deliveryInfo: {
    address?: string | null
    location?: string | null
    city?: string | null
    deliveryDate?: string | null
    deliveryTime?: string | null
  }
  fullName?: string
  prices: { subtotal: number; shipping: number; discount: number; total: number }
  promotions: Array<{ code: string; discountAmount: number; type?: string }>
  items: Array<{
    path: string
    title: string
    image: string | null
    quantity: number
    price: number
  }>
  reviewed: string[]
}

const STEPS = ['PENDING', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'COMPLETED'] as const
const STOPPED = ['CANCELED', 'REJECTED', 'FAILED_DELIVERY']

export function OrderTracking({ order }: { order: TrackedOrder }) {
  const { localization, formatDate } = useLocalization()
  const label = (status: string) =>
    (localization as Record<string, string>)[`status${status}`] ?? status
  const reachedAt = (status: string) =>
    order.history.filter(e => e.status === status).at(-1)?.at ??
    (status === 'PENDING' ? order.createdAt : undefined)
  const stopped = STOPPED.includes(order.status)
  const current = STEPS.indexOf(order.status as (typeof STEPS)[number])
  // A failed delivery happened after "out for delivery"; cancel/reject can happen earlier.
  const lastReached = stopped ? Math.max(...STEPS.map((s, i) => (reachedAt(s) ? i : -1))) : current
  const info = order.deliveryInfo

  const shown = foldFreeShipping(order.prices.shipping, order.promotions)

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <p className="text-sm text-muted-foreground">{localization.orderTracking}</p>
      <h1 className="mt-1 text-2xl font-semibold">
        {localization.orderNumber} #{order.id.slice(0, 8).toUpperCase()}
      </h1>

      <ol className="mt-8 space-y-0" aria-label={localization.orderTracking}>
        {STEPS.map((step, index) => {
          const done = index <= lastReached
          const at = reachedAt(step)
          return (
            <li key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2',
                    done
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/30 text-muted-foreground',
                  )}
                  aria-hidden
                >
                  {done ? <Check className="h-4 w-4" /> : index + 1}
                </span>
                {index < STEPS.length - 1 && (
                  <span
                    className={cn('h-8 w-0.5', index < lastReached ? 'bg-primary' : 'bg-muted')}
                  />
                )}
              </div>
              <div className="pt-1">
                <p className={cn('font-medium', !done && 'text-muted-foreground')}>
                  {label(step)}
                  <span className="sr-only">{done ? ' ✓' : ''}</span>
                </p>
                {done && at && <p className="text-xs text-muted-foreground">{formatDate(at)}</p>}
              </div>
            </li>
          )
        })}
      </ol>
      {stopped && (
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <CircleX className="h-4 w-4" aria-hidden /> {label(order.status)}
        </p>
      )}

      <Separator className="my-8" />

      <section className="space-y-1 text-sm">
        <h2 className="mb-2 text-base font-semibold">{localization.deliveryArea}</h2>
        {order.fullName && <p>{order.fullName}</p>}
        {(info.location || info.address) && (
          <p className="text-muted-foreground">
            {[info.location, info.address, info.city].filter(Boolean).join(' · ')}
          </p>
        )}
        {info.deliveryDate && (
          <p className="text-muted-foreground">
            {formatDate(info.deliveryDate)} {info.deliveryTime}
          </p>
        )}
      </section>

      <Separator className="my-8" />

      <ul className="space-y-6">
        {order.items.map(item => (
          <li key={item.path} className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-muted">
                {item.image && (
                  <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-medium">{item.title}</p>
                <p className="text-muted-foreground">
                  {item.quantity} × {priceFormatted(item.price)}
                </p>
              </div>
              <span className="text-sm tabular-nums">
                {priceFormatted(item.price * item.quantity)}
              </span>
            </div>
            {order.status === 'COMPLETED' && (
              <ReviewForm
                order={order}
                productPath={item.path}
                done={order.reviewed.includes(item.path)}
              />
            )}
          </li>
        ))}
      </ul>

      <Separator className="my-8" />

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt>{localization.subtotal}</dt>
          <dd className="tabular-nums">{priceFormatted(order.prices.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{localization.shipping}</dt>
          <dd className={shown.waived ? 'font-medium text-primary' : 'tabular-nums'}>
            {shown.waived
              ? localization.free
              : order.prices.shipping > 0
                ? priceFormatted(order.prices.shipping)
                : localization.shippingToConfirm}
          </dd>
        </div>
        {shown.promotions.map(p => (
          <div key={`${p.code}-${p.type}`} className="flex justify-between text-primary">
            <dt>{p.code}</dt>
            <dd className="tabular-nums">-{priceFormatted(p.discountAmount)}</dd>
          </div>
        ))}
        <div className="flex justify-between border-t pt-3 text-base font-semibold">
          <dt>{localization.total}</dt>
          <dd className="tabular-nums">{priceFormatted(order.prices.total)}</dd>
        </div>
      </dl>
    </main>
  )
}

function ReviewForm({
  order,
  productPath,
  done,
}: {
  order: TrackedOrder
  productPath: string
  done: boolean
}) {
  const { localization } = useLocalization()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>(done ? 'sent' : 'idle')

  if (state === 'sent') {
    return (
      <p className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
        <Check className="h-4 w-4" aria-hidden />{' '}
        {done ? localization.reviewAlreadySent : localization.reviewThanks}
      </p>
    )
  }

  const send = async () => {
    setState('sending')
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: order.id, token: order.token, productPath, rating, comment }),
    }).catch(() => null)
    setState(res?.ok ? 'sent' : 'error')
  }

  return (
    <div className="space-y-2 rounded-lg border p-3">
      <p className="text-sm font-medium">{localization.leaveReview}</p>
      <div className="flex gap-1" role="radiogroup" aria-label={localization.leaveReview}>
        {[1, 2, 3, 4, 5].map(value => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${value}/5`}
            onClick={() => setRating(value)}
            className="rounded p-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Star
              className={cn(
                'h-6 w-6',
                value <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground',
              )}
            />
          </button>
        ))}
      </div>
      <Textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder={localization.yourReview}
        aria-label={localization.yourReview}
        maxLength={1000}
      />
      {state === 'error' && <p className="text-sm text-destructive">{localization.orderError}</p>}
      <Button
        type="button"
        size="sm"
        disabled={rating === 0 || comment.trim().length < 3 || state === 'sending'}
        onClick={send}
      >
        {state === 'sending' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {localization.sendReview}
      </Button>
    </div>
  )
}
