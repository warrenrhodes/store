import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { StoreRole, StoreStatus } from '@/lib/firebase/models'
import { getStoreContext, scopedCount } from '@/lib/tenant'
import { Check, Circle } from 'lucide-react'
import Link from 'next/link'

/**
 * First steps of a new store, on the dashboard until they are all done: contact details,
 * delivery zones, a first product, the look, and the payment that opens the storefront.
 */
export async function GettingStarted() {
  const ctx = await getStoreContext()
  if (!ctx || ctx.role !== StoreRole.OWNER) return null
  const [products, shipments] = await Promise.all([
    scopedCount(CollectionsName.Products),
    scopedCount(CollectionsName.Shipments),
  ])
  const { store } = ctx
  const steps = [
    {
      done: !!(store.settings.whatsapp || store.settings.contactEmail),
      label: 'Add your WhatsApp or email',
      href: '/settings',
    },
    { done: shipments > 0, label: 'Set your delivery zones and prices', href: '/shipments' },
    { done: products > 0, label: 'Add your first product', href: '/products/new' },
    { done: !!store.theme, label: 'Choose your logo and colors', href: '/theme' },
    {
      done: store.status === StoreStatus.ACTIVE,
      label: 'Pay your subscription (cash): the platform then opens your storefront',
    },
  ]
  if (steps.every(s => s.done)) return null
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get your store ready</CardTitle>
        <CardDescription>
          {`${steps.filter(s => s.done).length} of ${steps.length} done.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="space-y-2 text-sm">
          {steps.map(step => (
            <li key={step.label} className="flex items-center gap-2">
              {step.done ? (
                <Check className="h-4 w-4 text-emerald-600" aria-label="Done" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" aria-label="To do" />
              )}
              {step.href && !step.done ? (
                <Link href={step.href} className="underline underline-offset-4">
                  {step.label}
                </Link>
              ) : (
                <span className={step.done ? 'text-muted-foreground line-through' : ''}>
                  {step.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
