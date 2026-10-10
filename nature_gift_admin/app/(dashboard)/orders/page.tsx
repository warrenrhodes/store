import { DataTable } from '@/components/custom-ui/DataTable'
import { columns } from '@/components/orders/OrderColumns'
import { getOrdersCache } from '@/lib/actions/server'

const STATUSES = ['PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELED', 'REJECTED']

export default async function Orders(props: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await props.searchParams
  const orders = await getOrdersCache()

  orders.sort((a, b) => {
    if (!a.data.createdAt || !b.data.createdAt) return 0
    return new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime()
  })

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <DataTable
        columns={columns}
        data={orders}
        searchKey="customer"
        searchPlaceholder="Search by name, phone or order #"
        filterButton={{ label: 'Status', columnKey: 'status', values: STATUSES }}
        initialFilters={status && STATUSES.includes(status) ? [{ id: 'status', value: status }] : []}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
