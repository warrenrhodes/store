import { FormNotice } from '@/components/layout/FormNotice'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  createStore,
  isPlatformAdmin,
  listStoresForPlatform,
  recordCashPayment,
  updateStoreFlags,
} from '@/lib/actions/platform.actions'
import { StorePlan, StoreStatus } from '@/lib/firebase/models'
import { paymentState } from '@ngift/core/store-rules'

export const metadata = { title: 'Platform' }

const STATE_LABEL = { none: 'never paid', expired: 'expired', soon: 'expires soon', ok: '' }

export default async function PlatformPage(props: {
  searchParams: Promise<{ saved?: string; error?: string; status?: string }>
}) {
  if (!(await isPlatformAdmin())) {
    return <p className="text-muted-foreground">Reserved to the platform administrator.</p>
  }
  const { saved, error, status } = await props.searchParams
  const stores = (await listStoresForPlatform()).filter(s => !status || s.status === status)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Platform</h1>
          <p className="text-sm text-muted-foreground">
            Stores, cash payments and activation. Pending stores first.
          </p>
        </div>
        <nav className="flex gap-2 text-sm" aria-label="Filter by status">
          {['', ...Object.values(StoreStatus)].map(s => (
            <a
              key={s || 'all'}
              href={s ? `/platform?status=${s}` : '/platform'}
              aria-current={(status ?? '') === s ? 'page' : undefined}
              className="rounded-md border px-2 py-1 aria-[current=page]:bg-accent"
            >
              {s || 'all'}
            </a>
          ))}
        </nav>
      </div>
      <FormNotice saved={saved} error={error} />

      <Card>
        <CardHeader>
          <CardTitle>New store</CardTitle>
          <CardDescription>
            The owner signs up to the admin first. The store stays pending until a payment is
            recorded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createStore} className="grid gap-2 sm:grid-cols-4">
            <Input name="name" required placeholder="Store name" aria-label="Store name" />
            <Input
              name="slug"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              placeholder="address-slug"
              aria-label="Address"
            />
            <Input
              name="ownerEmail"
              type="email"
              required
              placeholder="owner@email.com"
              aria-label="Owner email"
            />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      {stores.map(store => {
        const state = paymentState(store.paidUntil)
        return (
          <Card
            key={store.id}
            className={state === 'expired' || state === 'soon' ? 'border-amber-500' : ''}
          >
            <CardHeader className="flex-row flex-wrap items-center justify-between gap-2 space-y-0">
              <div>
                <CardTitle className="text-lg">{store.name}</CardTitle>
                <CardDescription>
                  /boutique/{store.slug} · {store.plan}
                  {store.paidUntil ? ` · paid until ${store.paidUntil.slice(0, 10)}` : ''}
                  {STATE_LABEL[state] ? ` · ${STATE_LABEL[state]}` : ''}
                </CardDescription>
              </div>
              <Badge
                variant={
                  store.status === StoreStatus.ACTIVE
                    ? 'default'
                    : store.status === StoreStatus.SUSPENDED
                      ? 'destructive'
                      : 'secondary'
                }
              >
                {store.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <form action={recordCashPayment} className="flex flex-wrap items-center gap-2">
                <input type="hidden" name="storeId" value={store.id} />
                <Input
                  name="amount"
                  type="number"
                  min={1}
                  step={1}
                  required
                  placeholder="Amount (FCFA)"
                  aria-label="Amount in FCFA"
                  className="w-40"
                />
                <Input
                  name="months"
                  type="number"
                  min={1}
                  max={24}
                  defaultValue={1}
                  required
                  aria-label="Months"
                  className="w-24"
                />
                <Input name="note" placeholder="Note" aria-label="Note" className="w-48" />
                <Button type="submit" size="sm">
                  Record cash payment
                </Button>
              </form>
              <div className="flex flex-wrap gap-2">
                {store.status !== StoreStatus.SUSPENDED ? (
                  <Flag
                    storeId={store.id}
                    name="status"
                    value={StoreStatus.SUSPENDED}
                    label="Suspend"
                  />
                ) : (
                  <Flag
                    storeId={store.id}
                    name="status"
                    value={StoreStatus.ACTIVE}
                    label="Reactivate"
                  />
                )}
                <Flag
                  storeId={store.id}
                  name="plan"
                  value={store.plan === StorePlan.PRO ? StorePlan.FREE : StorePlan.PRO}
                  label={store.plan === StorePlan.PRO ? 'Switch to free' : 'Switch to pro'}
                />
                <Flag
                  storeId={store.id}
                  name="marketplaceListed"
                  value={String(!store.marketplaceListed)}
                  label={store.marketplaceListed ? 'Hide from marketplace' : 'List on marketplace'}
                />
                <Button variant="outline" size="sm" asChild>
                  <a href={`/platform/products?store=${encodeURIComponent(store.id)}`}>
                    Marketplace products
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function Flag(props: { storeId: string; name: string; value: string; label: string }) {
  return (
    <form action={updateStoreFlags}>
      <input type="hidden" name="storeId" value={props.storeId} />
      <input type="hidden" name={props.name} value={props.value} />
      <Button type="submit" variant="outline" size="sm">
        {props.label}
      </Button>
    </form>
  )
}

export const dynamic = 'force-dynamic'
