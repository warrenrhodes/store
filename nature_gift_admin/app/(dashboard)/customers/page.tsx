import { CsvExportButton } from '@/components/custom-ui/CsvExportButton'
import { DataTable } from '@/components/custom-ui/DataTable'
import { customerColumns } from '@/components/customers/CustomerColumns'
import { getOrdersCache } from '@/lib/actions/server'
import { aggregateCustomers, refusalRate } from '@/lib/orders/order-logic'

export default async function CustomersPage(props: { searchParams: Promise<{ phone?: string }> }) {
  const { phone } = await props.searchParams
  const customers = aggregateCustomers(
    (await getOrdersCache()).map(o => ({
      status: o.data.status,
      createdAt: o.data.createdAt,
      userData: o.data.userData,
      orderPrices: o.data.orderPrices,
    })),
  ).sort((a, b) => b.lastOrderAt.localeCompare(a.lastOrderAt))

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-muted-foreground">
            {customers.length} customers, grouped by phone number from their orders.
          </p>
        </div>
        <CsvExportButton
          filename="customers"
          rows={customers.map(c => ({
            name: c.name,
            phone: c.phone,
            email: c.email,
            orders: c.orders,
            delivered: c.delivered,
            failed_deliveries: c.failed,
            refusal_rate: Math.round(refusalRate(c.delivered, c.failed) * 100),
            canceled: c.canceled,
            spent: c.spent,
            first_order: c.firstOrderAt,
            last_order: c.lastOrderAt,
          }))}
        />
      </div>
      <DataTable
        columns={customerColumns}
        data={customers}
        searchKey="customer"
        searchPlaceholder="Search by name or phone"
        initialFilters={phone ? [{ id: 'customer', value: phone }] : []}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
