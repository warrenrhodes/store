'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import { createLocation, deleteLocation, updateLocation } from '@/lib/actions/locations.actions'
import { ILocation } from '@/lib/actions/server'
import { LocationSchemaType } from '@/lib/validations/location'
import { normalize } from '@ngift/core/shipping-zones'
import { getDocumentId } from '@spreeloop/database'
import { ArrowDown, ArrowUp, ArrowUpDown, Loader2, Plus, Save, Search, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Result = { success: boolean; error?: string }
type SortKey = 'name' | 'city' | 'isActive'

/** Every word typed must appear in the name or the city, ignoring accents and case. */
const matches = (location: ILocation, query: string) => {
  const text = normalize(`${location.data.name} ${location.data.city}`)
  return normalize(query)
    .split(/\s+/)
    .every(word => text.includes(word))
}

/** Inline editor for the `locations` collection: neighbourhoods and towns used by shipments. */
export function LocationsManager({ locations }: { locations: ILocation[] }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'city', dir: 1 })

  // Sorted on saved values, so a row does not jump while it is being edited.
  const visible = locations
    .filter(location => matches(location, query))
    .sort((a, b) => {
      const by = (key: SortKey) =>
        key === 'isActive'
          ? Number(b.data.isActive) - Number(a.data.isActive)
          : a.data[key].localeCompare(b.data[key], 'fr', { sensitivity: 'base' })
      return sort.dir * (by(sort.key) || by(sort.key === 'name' ? 'city' : 'name'))
    })
  const toggleSort = (key: SortKey) =>
    setSort(current => ({ key, dir: current.key === key ? (-current.dir as 1 | -1) : 1 }))
  const sortHead = (label: string, sortKey: SortKey) => {
    const Icon = sort.key !== sortKey ? ArrowUpDown : sort.dir === 1 ? ArrowUp : ArrowDown
    return (
      <TableHead
        aria-sort={sort.key === sortKey ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="-ml-3"
          onClick={() => toggleSort(sortKey)}
        >
          {label}
          <Icon className="ml-1 h-3.5 w-3.5" aria-hidden />
        </Button>
      </TableHead>
    )
  }

  const run = async (action: () => Promise<Result>, message: string) => {
    const res = await action()
    if (!res.success) {
      toast({ description: res.error ?? 'Something went wrong', variant: 'destructive' })
      return false
    }
    toast({ description: message, variant: 'success' })
    router.refresh()
    return true
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Locations</h1>
        <p className="text-muted-foreground">
          Neighbourhoods and towns you deliver to. Group them into shipments to set prices. Renaming
          a location keeps shipments and promotions working.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search a location or a city"
            aria-label="Search locations"
            className="pl-8"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {visible.length} / {locations.length}
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {sortHead('Name', 'name')}
            {sortHead('City', 'city')}
            {sortHead('Active', 'isActive')}
            <TableHead className="w-28" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <LocationRow
            key={locations.length}
            initial={{ name: '', city: locations[0]?.data.city ?? '', isActive: true }}
            onSave={data => run(() => createLocation(data), 'Location added')}
          />
          {visible.map(location => (
            <LocationRow
              key={location.path}
              initial={location.data}
              onSave={data =>
                run(() => updateLocation(getDocumentId(location.path), data), 'Location updated')
              }
              onDelete={() =>
                run(() => deleteLocation(getDocumentId(location.path)), 'Location deleted')
              }
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/** Without `onDelete` the row is the "add a location" row. */
function LocationRow({
  initial,
  onSave,
  onDelete,
}: {
  initial: LocationSchemaType
  onSave: (data: LocationSchemaType) => Promise<boolean>
  onDelete?: () => Promise<boolean>
}) {
  const [data, setData] = useState({
    name: initial.name,
    city: initial.city,
    isActive: initial.isActive,
  })
  const [busy, setBusy] = useState(false)
  const isNew = !onDelete
  const dirty =
    data.name !== initial.name || data.city !== initial.city || data.isActive !== initial.isActive
  const canSave = dirty && data.name.trim() !== '' && data.city.trim() !== ''

  const wrap = (action: () => Promise<boolean>) => async () => {
    setBusy(true)
    await action()
    setBusy(false)
  }

  return (
    <TableRow>
      <TableCell>
        <Input
          value={data.name}
          placeholder={isNew ? 'New location (ex: Mendong – Marché)' : undefined}
          aria-label="Location name"
          onChange={e => setData({ ...data, name: e.target.value })}
        />
      </TableCell>
      <TableCell>
        <Input
          value={data.city}
          placeholder="City (ex: Yaoundé)"
          aria-label="City"
          onChange={e => setData({ ...data, city: e.target.value })}
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={data.isActive}
          aria-label="Active"
          onCheckedChange={isActive => setData({ ...data, isActive })}
        />
      </TableCell>
      <TableCell className="flex gap-1">
        <Button
          type="button"
          size="icon"
          variant={isNew ? 'default' : 'outline'}
          disabled={!canSave || busy}
          aria-label={isNew ? 'Add location' : 'Save location'}
          onClick={wrap(() => onSave(data))}
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isNew ? (
            <Plus className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
        </Button>
        {onDelete && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            disabled={busy}
            aria-label="Delete location"
            onClick={wrap(onDelete)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
