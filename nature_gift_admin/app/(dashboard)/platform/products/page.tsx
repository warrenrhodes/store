import { FormNotice } from '@/components/layout/FormNotice'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  isPlatformAdmin,
  listStoreProductsForPlatform,
  setProductListed,
} from '@/lib/actions/platform.actions'

export const metadata = { title: 'Marketplace products' }
export const dynamic = 'force-dynamic'

/** Marketplace moderation: which of a store's products the marketplace shows. */
export default async function PlatformProductsPage(props: {
  searchParams: Promise<{ store?: string; saved?: string; error?: string }>
}) {
  if (!(await isPlatformAdmin())) {
    return <p className="text-muted-foreground">Reserved to the platform administrator.</p>
  }
  const { store, saved, error } = await props.searchParams
  const data = store ? await listStoreProductsForPlatform(store) : undefined
  if (!data) return <p className="text-muted-foreground">Store not found.</p>

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <div>
        <a href="/platform" className="text-sm underline">
          ← Platform
        </a>
        <h1 className="mt-1 text-2xl font-semibold">{data.name}: marketplace products</h1>
        <p className="text-sm text-muted-foreground">
          A hidden product stays on the store&apos;s own storefront; the store can&apos;t list it
          again.
        </p>
      </div>
      <FormNotice saved={saved} error={error} />
      <ul className="divide-y rounded-lg border">
        {data.products.map(product => (
          <li key={product.id} className="flex flex-wrap items-center gap-3 p-3">
            <span className="mr-auto font-medium">{product.title}</span>
            <Badge variant="outline">{product.status}</Badge>
            <Badge variant={product.listed ? 'default' : 'secondary'}>
              {product.listed ? 'On the marketplace' : 'Hidden'}
            </Badge>
            <form action={setProductListed}>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="listed" value={String(!product.listed)} />
              <Button type="submit" variant="outline" size="sm">
                {product.listed ? 'Hide' : 'List'}
              </Button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}
