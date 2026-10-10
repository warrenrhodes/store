import SalesChart from '@/components/custom-ui/SalesChart'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { clientConfig, serverConfig } from '@/config'
import { getDashboardStats } from '@/lib/actions/server'
import { OrderPrices, UserData } from '@/lib/type'
import { priceFormatted } from '@/lib/utils/utils'
import { ArrowRight, Clock } from 'lucide-react'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Home() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })
  if (!tokens) notFound()

  const stats = await getDashboardStats()
  const kpis = [
    { label: 'Revenue', value: priceFormatted(stats.revenue), hint: 'Excl. canceled & rejected' },
    { label: 'Orders', value: stats.orderCount.toString() },
    { label: 'Average order', value: priceFormatted(stats.averageOrder) },
    { label: 'Customers', value: stats.customers.toString(), hint: 'Unique phone numbers' },
  ]

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
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

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(kpi => (
          <Card key={kpi.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
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
                      <p className="truncate text-sm font-medium">
                        {(order.data.userData as UserData)?.fullName || '—'}
                      </p>
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
    </div>
  )
}

export const dynamic = 'force-dynamic'
