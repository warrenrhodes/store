import { DataTable } from '@/components/custom-ui/DataTable'
import { columns } from '@/components/orders/OrderColumns'
import { Separator } from '@/components/ui/separator'
import { getOrdersCache } from '@/lib/actions/server'

export default async function Orders() {
  const orders = await getOrdersCache()

  orders.sort((a, b) => {
    if (!a.data.createdAt || !b.data.createdAt) {
      return 0
    }
    return new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime()
  })
  return (
    <div className="sm:px-10 px-2 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={orders} searchKey="id" />
    </div>
  )
}

export const dynamic = 'force-dynamic'
