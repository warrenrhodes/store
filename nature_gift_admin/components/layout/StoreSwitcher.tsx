'use client'

import { switchStore } from '@/lib/actions/store.actions'

/** Picks the store the admin works on (submits on change; the server checks the membership). */
export function StoreSwitcher({
  stores,
  currentStoreId,
}: {
  stores: { id: string; name: string }[]
  currentStoreId?: string
}) {
  if (stores.length === 0) return null
  return (
    <form action={switchStore} className="px-2">
      <label htmlFor="store-switcher" className="sr-only">
        Store
      </label>
      <select
        id="store-switcher"
        name="storeId"
        defaultValue={currentStoreId}
        onChange={e => e.currentTarget.form?.requestSubmit()}
        disabled={stores.length === 1}
        className="w-full rounded-md border bg-background px-2 py-1.5 text-sm disabled:opacity-100"
      >
        {stores.map(s => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </form>
  )
}
