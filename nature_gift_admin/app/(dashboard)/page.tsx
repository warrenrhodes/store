import SalesChart from '@/components/custom-ui/SalesChart'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { clientConfig, serverConfig } from '@/config'
import { getDashboardStats } from '@/lib/actions/server'
import { OrderPrices, UserData } from '@/lib/type'
import { priceFormatted } from '@/lib/utils/utils'
import { ArrowRight, Clock, Star } from 'lucide-react'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { GettingStarted } from '@/components/layout/GettingStarted'
import { isPlatformAdmin } from '@/lib/actions/platform.actions'
import { getStoreContext } from '@/lib/tenant'

export default async function Home() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })
  if (!tokens) notFound()
  const ctx = await getStoreContext()
  // Without a store: a new account creates its own (self-service sign-up); the platform admin
  // goes to the platform console.
  if (!ctx) redirect((await isPlatformAdmin()) ? '/platform' : '/onboarding')

  const stats = await getDashboardStats()
  const kpis = [
    { label: 'Revenue', value: priceFormatted(stats.revenue), hint: 'Excl. canceled & rejected' },
    { label: 'Orders', value: stats.orderCount.toString() },
    { label: 'Average order', value: priceFormatted(stats.averageOrder) },
    { label: 'Customers', value: stats.customers.toString(), hint: 'Unique phone numbers' },
    {
      label: 'To deliver',
      value: stats.toShip.toString(),
      hint: 'Accepted or out for delivery',
      href: '/orders?status=ACCEPTED',
    },
    {
      label: 'Refusal rate',
      value: `${Math.round(stats.refusalRate * 100)} %`,
      hint: `Failed deliveries over ${stats.finishedDeliveries} finished`,
      href: '/orders?status=FAILED_DELIVERY',
    },
    {
      label: 'Abandoned checkouts',
      value: stats.abandoned.toString(),
      hint: `Last 30 days · ${Math.round(stats.checkoutConversion * 100)} % converted`,
      href: '/checkouts',
    },
    {
      label: 'Low stock',
      value: stats.lowStock.length.toString(),
      hint: 'At or under their alert threshold',
      href: '/products',
    },
  ]

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {ctx && <GettingStarted />}
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {stats.pendingCount > 0 && (
        <Link
          href="/orders?status=PENDING"
          className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950 transition-colors hover:bg-amber-100"
        >
          <Clock className="h-5 w-5 shrink-0" aria-hidden />
          <span className="flex-1">
            <strong>{stats.pendingCount}</strong> order{stats.pendingCount > 1 ? 's' : ''} waiting
            to be accepted
          </span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}

      {stats.pendingReviews > 0 && (
        <Link
          href="/reviews"
          className="flex items-center gap-3 rounded-xl border border-sky-300 bg-sky-50 p-4 text-sky-950 transition-colors hover:bg-sky-100"
        >
          <Star className="h-5 w-5 shrink-0" aria-hidden />
          <span className="flex-1">
            <strong>{stats.pendingReviews}</strong> customer review
            {stats.pendingReviews > 1 ? 's' : ''} waiting for approval
          </span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(kpi => (
          <Card
            key={kpi.label}
            className={
              'href' in kpi && kpi.href ? 'relative transition-colors hover:bg-muted/50' : ''
            }
          >
            {'href' in kpi && kpi.href && (
              <Link href={kpi.href} className="absolute inset-0" aria-label={kpi.label} />
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tabular-nums">{kpi.value}</p>
              {kpi.hint && <p className="mt-1 text-xs text-muted-foreground">{kpi.hint}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Revenue · last 12 months</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart data={stats.salesByMonth} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent orders</CardTitle>
            <Link href="/orders" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentOrders.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <ul className="divide-y">
                {stats.recentOrders.map(order => (
                  <li key={order.path} className="flex items-center gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/orders/${order.path.split('/').pop()}`}
                        className="block truncate text-sm font-medium hover:underline"
                      >
                        {(order.data.userData as UserData)?.fullName || '—'}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.data.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.data.status} />
                    <span className="w-24 text-right text-sm tabular-nums">
                      {priceFormatted((order.data.orderPrices as OrderPrices)?.total || 0)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Best sellers</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.topProducts.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No sales yet.</p>
            ) : (
              <ol className="divide-y">
                {stats.topProducts.map((p, i) => (
                  <li key={p.title} className="flex items-center gap-3 py-2.5 text-sm">
                    <span className="w-5 text-muted-foreground tabular-nums">{i + 1}.</span>
                    <span className="min-w-0 flex-1 truncate font-medium">{p.title}</span>
                    <span className="tabular-nums text-muted-foreground">{p.units} sold</span>
                    <span className="w-28 text-right tabular-nums">
                      {priceFormatted(p.revenue)}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Low stock</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.lowStock.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Every tracked product is above its alert threshold.
              </p>
            ) : (
              <ul className="divide-y">
                {stats.lowStock.slice(0, 8).map(p => (
                  <li key={p.id} className="flex items-center gap-3 py-2.5 text-sm">
                    <Link
                      href={`/products/${p.id}`}
                      className="min-w-0 flex-1 truncate font-medium hover:underline"
                    >
                      {p.title}
                    </Link>
                    <span
                      className={
                        p.stock === 0
                          ? 'rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-900'
                          : 'rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900'
                      }
                    >
                      {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
