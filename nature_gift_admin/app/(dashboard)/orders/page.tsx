import { DataTable } from '@/components/custom-ui/DataTable'
import { columns } from '@/components/orders/OrderColumns'
import { Separator } from '@/components/ui/separator'
import { getOrders } from '@/lib/actions/actions'

const Orders = async () => {
  const orders = await getOrders()
  return (
    <div className="sm:px-10 px-2 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  )
}

export default Orders
