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
import { getDocumentId } from '@spreeloop/database'
import { Loader2, Plus, Save, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Result = { success: boolean; error?: string }

/** Inline editor for the `locations` collection: neighbourhoods and towns used by shipments. */
export function LocationsManager({ locations }: { locations: ILocation[] }) {
  const router = useRouter()

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="w-28" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map(location => (
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
          <LocationRow
            key={locations.length}
            initial={{ name: '', city: locations[0]?.data.city ?? '', isActive: true }}
            onSave={data => run(() => createLocation(data), 'Location added')}
          />
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
          placeholder={isNew ? 'New location (ex: Mendong)' : undefined}
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
