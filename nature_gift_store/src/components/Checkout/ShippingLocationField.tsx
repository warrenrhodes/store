'use client'

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils/utils'
import { useCartDeliveryInfo } from '@/hooks/useCart'
import { useLocalization } from '@/hooks/useLocalization'
import { ShipmentMethod } from '@/lib/firebase/models'
import { DeliveryFormData } from '@/lib/utils/validation-form'
import { normalize, ShippingArea, ShippingZone } from '@/lib/utils/shipping-zones'

const OTHER = '__other__'
/** Show a search box once the list gets long. */
const SEARCH_FROM = 8

/** Every word typed must appear in the area name, ignoring accents and case. */
const matches = (area: string, query: string) =>
  normalize(query)
    .split(/\s+/)
    .every(word => normalize(area).includes(word))

function Option(props: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={props.selected}
      onClick={props.onSelect}
      className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent focus:bg-accent focus:outline-none"
    >
      {props.label}
      {props.selected && <Check className="h-4 w-4" aria-hidden />}
    </button>
  )
}

/**
 * Delivery area picker built from the admin shipments. Sets shipping.method/location on the
 * form and the shipping cost used by the order summary (and by location/free-shipping
 * promotions). The address is only asked when the area is not listed; an optional details
 * field lets the customer add a landmark or a comment.
 */
export function ShippingLocationField({
  form,
  shipments,
}: {
  form: UseFormReturn<DeliveryFormData>
  shipments: ShippingZone[]
}) {
  const { localization } = useLocalization()
  const { setShipment } = useCartDeliveryInfo()
  const [other, setOther] = useState(false)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const locationId = form.watch('shipping.locationId')
  const method = form.watch('shipping.method')

  // One group per city (and per method: expedition areas are listed apart), sorted by name.
  const groups = Object.values(
    shipments.reduce<
      Record<
        string,
        {
          key: string
          label: string
          areas: Array<ShippingArea & { method: ShipmentMethod; cost: number }>
        }
      >
    >((acc, zone) => {
      for (const area of zone.areas) {
        const key = `${zone.method}:${area.city}`
        const label =
          zone.method === ShipmentMethod.EXPEDITION
            ? `${area.city || localization.expedition} · ${localization.expedition}`
            : area.city
        acc[key] ??= { key, label, areas: [] }
        acc[key].areas.push({ ...area, method: zone.method, cost: zone.cost })
      }
      return acc
    }, {}),
  )
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(group => ({ ...group, areas: group.areas.sort((a, b) => a.name.localeCompare(b.name)) }))

  // Values are `${method}::${areaId}`: legacy ids are names, which may repeat across methods.
  const onChange = (value: string) => {
    setOther(value === OTHER)
    form.clearErrors('address')
    if (value === OTHER) {
      form.setValue('shipping', { method: 'DELIVERY', location: '', locationId: '' })
      // The address field takes the details then; the notes field is hidden.
      form.setValue('additionalNotes', '')
      setShipment(undefined)
      return
    }
    const [nextMethod, nextId] = value.split('::') as [ShipmentMethod, string]
    const area = groups.flatMap(g => g.areas).find(a => a.method === nextMethod && a.id === nextId)
    if (!area) return
    form.setValue('shipping', { method: nextMethod, location: area.name, locationId: area.id })
    setShipment({
      deliveryMethod: nextMethod,
      location: area.name,
      locationId: area.id,
      city: area.city,
      cost: area.cost,
    })
  }

  const selected = other ? OTHER : locationId ? `${method}::${locationId}` : ''
  const selectedLabel = other
    ? localization.otherZone
    : form.watch('shipping.location') || undefined
  const searchable = groups.reduce((n, g) => n + g.areas.length, 0) > SEARCH_FROM
  const toggle = (next: boolean) => {
    setOpen(next)
    if (!next) setQuery('')
  }
  const pick = (value: string) => {
    onChange(value)
    toggle(false)
  }

  return (
    <>
      {shipments.length > 0 && (
        <FormItem>
          <FormLabel>{localization.deliveryZone}</FormLabel>
          <Popover open={open} onOpenChange={toggle}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-normal"
                >
                  <span className={cn('truncate', !selectedLabel && 'text-muted-foreground')}>
                    {selectedLabel ?? localization.deliveryZone}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-1">
              {searchable && (
                <Input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={localization.searchZone}
                  className="mb-1"
                />
              )}
              <div role="listbox" className="max-h-64 overflow-y-auto">
                {groups.map(group => {
                  const visible = group.areas.filter(area =>
                    matches(`${area.name} ${area.city}`, query),
                  )
                  if (visible.length === 0) return null
                  return (
                    <div key={group.key} role="group">
                      {groups.length > 1 && group.label && (
                        <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                          {group.label}
                        </p>
                      )}
                      {visible.map(area => (
                        <Option
                          key={area.id}
                          label={area.name}
                          selected={selected === `${area.method}::${area.id}`}
                          onSelect={() => pick(`${area.method}::${area.id}`)}
                        />
                      ))}
                    </div>
                  )
                })}
              </div>
              {/* Pinned under the scrolling list so it is reachable without scrolling to the end. */}
              <Button
                type="button"
                variant={selected === OTHER ? 'secondary' : 'outline'}
                onClick={() => pick(OTHER)}
                className="mt-1 w-full"
              >
                {localization.otherZone}
              </Button>
            </PopoverContent>
          </Popover>
          {/* The address rule fails while no area is picked and the address field is hidden. */}
          {!other && form.formState.errors.address && (
            <p className="text-sm font-medium text-destructive">{localization.errorZoneRequired}</p>
          )}
        </FormItem>
      )}
      {(shipments.length === 0 || other) && (
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{localization.yourAddress}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="street-address"
                  placeholder={localization.addressPlaceholder}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {!other && (
        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{localization.detailsOrComment}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder={localization.additionalNotesPlaceHolder}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  )
}
