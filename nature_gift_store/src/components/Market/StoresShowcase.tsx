'use client'

import { SiteLink as Link, useSite } from '@/components/Site'
import { useLocalization } from '@/hooks/useLocalization'
import { Store } from 'lucide-react'

/** The marketplace's stores, each to its vendor page. */
export function StoresShowcase() {
  const { stores } = useSite()
  const { localization } = useLocalization()
  const list = Object.values(stores ?? {}).sort((a, b) => a.name.localeCompare(b.name))
  if (list.length === 0) return null
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {localization.ourStores}
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map(store => (
          <li key={store.slug}>
            <Link
              href={`/vendeur/${store.slug}`}
              className="flex items-center gap-3 rounded-lg border p-4 font-medium hover:bg-accent"
            >
              <Store className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              {store.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
