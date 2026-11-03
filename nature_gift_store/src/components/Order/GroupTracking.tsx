'use client'

import { SiteLink as Link } from '@/components/Site'
import { Button } from '@/components/ui/button'
import { useLocalization } from '@/hooks/useLocalization'
import { priceFormatted } from '@/lib/utils/utils'

type GroupOrder = {
  id: string
  store: string
  status: string
  total: number
  shipping: number
  items: Array<{ title: string; quantity: number }>
}

/** Every order of a marketplace cart, one card per store, each with its own tracking link. */
export function GroupTracking({ orders, token }: { orders: GroupOrder[]; token: string }) {
  const { localization } = useLocalization()
  const label = (status: string) =>
    (localization as Record<string, string>)[`status${status}`] ?? status
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <p className="text-sm text-muted-foreground">{localization.orderTracking}</p>
      <h1 className="mt-1 text-2xl font-semibold">{localization.yourOrders}</h1>
      <p className="mt-2 text-muted-foreground">{localization.ordersByStore}</p>
      <ul className="mt-6 space-y-4">
        {orders.map(order => (
          <li key={order.id} className="rounded-xl border p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">{order.store}</h2>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm">
                {label(order.status)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {localization.orderNumber} #{order.id.slice(0, 8).toUpperCase()}
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.quantity} × {item.title}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold tabular-nums">{priceFormatted(order.total)}</span>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/order/${order.id}?t=${token}`}>{localization.trackThisOrder}</Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
