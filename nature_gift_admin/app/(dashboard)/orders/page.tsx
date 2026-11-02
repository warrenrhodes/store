import { DataTable } from '@/components/custom-ui/DataTable'
import { columns } from '@/components/orders/OrderColumns'
import { getOrdersCache } from '@/lib/actions/server'
import { CsvExportButton } from '@/components/custom-ui/CsvExportButton'
import { DeliveryInfo, OrderPrices, UserData } from '@/lib/type'

const STATUSES = [
  'PENDING',
  'ACCEPTED',
  'OUT_FOR_DELIVERY',
  'COMPLETED',
  'FAILED_DELIVERY',
  'CANCELED',
  'REJECTED',
]

export default async function Orders(props: {
  searchParams: Promise<{ status?: string; q?: string }>
}) {
  const { status, q } = await props.searchParams
  const orders = await getOrdersCache()

  orders.sort((a, b) => {
    if (!a.data.createdAt || !b.data.createdAt) return 0
    return new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime()
  })

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <CsvExportButton
          filename="orders"
          rows={orders.map(o => {
            const user = o.data.userData as UserData
            const info = o.data.deliveryInfo as unknown as DeliveryInfo
            const prices = o.data.orderPrices as OrderPrices
            return {
              order: o.path.split('/').pop()!.slice(0, 8).toUpperCase(),
              date: o.data.createdAt,
              status: o.data.status,
              customer: user?.fullName,
              phone: user?.phone,
              area: info?.location,
              city: info?.city,
              address: info?.address,
              items: o.data.items.map(i => `${i.quantity} x ${i.product.title}`).join(' | '),
              subtotal: prices?.subtotal,
              shipping: prices?.shipping,
              discount: prices?.discount,
              total: prices?.total,
              codes: (o.data.promotions ?? []).map(p => p.code).join(' '),
            }
          })}
        />
      </div>
      <DataTable
        columns={columns}
        data={orders}
        searchKey="customer"
        searchPlaceholder="Search by name, phone or order #"
        filterButton={{ label: 'Status', columnKey: 'status', values: STATUSES }}
        initialFilters={
          status && STATUSES.includes(status) ? [{ id: 'status', value: status }] : []
        }
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
