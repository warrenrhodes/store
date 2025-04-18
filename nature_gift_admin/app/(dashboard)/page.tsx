import SalesChart from '@/components/custom-ui/SalesChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { clientConfig, serverConfig } from '@/config'
import { getSalesPerMonth, getTotalCustomers, getTotalSales } from '@/lib/actions/server'
import { priceFormatted } from '@/lib/utils/utils'
import { CircleDollarSign, ShoppingBag, UserRound } from 'lucide-react'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function Home() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  if (!tokens) {
    notFound()
  }
  const totalRevenue = await getTotalSales().then(data => data.totalRevenue)
  const totalOrders = await getTotalSales().then(data => data.totalOrders)
  const totalCustomers = await getTotalCustomers()

  const graphData = await getSalesPerMonth()

  return (
    <div className="px-8 py-10">
      <p className="text-heading2-bold">Dashboard</p>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Revenue</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{priceFormatted(totalRevenue)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Customer</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Sales Chart (FCFA)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  )
}

export const dynamic = 'force-dynamic'
