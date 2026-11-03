import { CsvExportButton } from '@/components/custom-ui/CsvExportButton'
import { DataTable } from '@/components/custom-ui/DataTable'
import { checkoutColumns } from '@/components/checkouts/CheckoutColumns'
import { checkoutState } from '@/lib/orders/order-logic'
import { getCheckoutsCache } from '@/lib/actions/server'
import { priceFormatted } from '@/lib/utils/utils'

const STATES = ['NEW', 'CONTACTED', 'RECOVERED']

/** Shopify "Abandoned checkouts": customers who typed name and phone but didn't order. */
export default async function CheckoutsPage(props: { searchParams: Promise<{ state?: string }> }) {
  const { state } = await props.searchParams
  // Ten minutes of grace: a checkout being filled right now isn't abandoned yet.
  const cutoff = Date.now() - 10 * 60 * 1000
  const checkouts = (await getCheckoutsCache())
    .filter(c => c.data.orderPath || new Date(c.data.updatedAt).getTime() < cutoff)
    .sort((a, b) => b.data.createdAt.localeCompare(a.data.createdAt))
  const open = checkouts.filter(c => !c.data.orderPath)
  const recovered = checkouts.length - open.length

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Abandoned checkouts</h1>
          <p className="text-sm text-muted-foreground">
            {open.length} to follow up ({priceFormatted(open.reduce((s, c) => s + c.data.total, 0))}
            ) · {recovered} recovered
          </p>
        </div>
        <CsvExportButton
          filename="abandoned-checkouts"
          rows={checkouts.map(c => ({
            started: c.data.createdAt,
            name: c.data.fullName,
            phone: c.data.phone,
            items: c.data.items.map(i => `${i.quantity} x ${i.title}`).join(' | '),
            value: c.data.total,
            area: c.data.location,
            status: checkoutState(c),
            contacted_at: c.data.contactedAt,
          }))}
        />
      </div>
      <DataTable
        columns={checkoutColumns}
        data={checkouts}
        searchKey="customer"
        searchPlaceholder="Search by name or phone"
        filterButton={{ label: 'Status', columnKey: 'state', values: STATES }}
        initialFilters={[{ id: 'state', value: state && STATES.includes(state) ? state : 'NEW' }]}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
