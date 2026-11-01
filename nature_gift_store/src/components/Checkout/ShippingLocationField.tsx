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
import { Shipment, ShipmentMethod } from '@/lib/firebase/models'
import { DeliveryFormData } from '@/lib/utils/validation-form'
import { getShipmentLocations } from '@/lib/utils/shipment-locations'

const OTHER = '__other__'
/** Show a search box once the list gets long. */
const SEARCH_FROM = 8

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

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
  shipments: Shipment[]
}) {
  const { localization } = useLocalization()
  const { setShipment } = useCartDeliveryInfo()
  const [other, setOther] = useState(false)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const active = shipments.filter(s => s.isActive !== false)
  const locationId = form.watch('shipping.locationId')
  const method = form.watch('shipping.method')

  const groups = [
    { method: ShipmentMethod.DELIVERY, label: localization.delivery },
    { method: ShipmentMethod.EXPEDITION, label: localization.expedition },
  ]
    .map(group => ({
      ...group,
      areas: active
        .filter(s => s.method === group.method)
        .flatMap(s => getShipmentLocations(s).map(area => ({ ...area, cost: s.cost }))),
    }))
    .filter(group => group.areas.length > 0)

  // Values are `${method}::${areaId}`: legacy ids are names, which may repeat across methods.
  const onChange = (value: string) => {
    setOther(value === OTHER)
    form.clearErrors('address')
    if (value === OTHER) {
      form.setValue('shipping', { method: 'DELIVERY', location: '', locationId: '' })
      setShipment(undefined)
      return
    }
    const [nextMethod, nextId] = value.split('::') as [ShipmentMethod, string]
    const area = groups.find(g => g.method === nextMethod)?.areas.find(a => a.id === nextId)
    if (!area) return
    form.setValue('shipping', { method: nextMethod, location: area.name, locationId: area.id })
    setShipment({
      deliveryMethod: nextMethod,
      location: area.name,
      locationId: area.id,
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
      {active.length > 0 && (
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
                  const visible = group.areas.filter(area => matches(area.name, query))
                  if (visible.length === 0) return null
                  return (
                    <div key={group.method} role="group">
                      {groups.length > 1 && (
                        <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                          {group.label}
                        </p>
                      )}
                      {visible.map(area => (
                        <Option
                          key={area.id}
                          label={area.name}
                          selected={selected === `${group.method}::${area.id}`}
                          onSelect={() => pick(`${group.method}::${area.id}`)}
                        />
                      ))}
                    </div>
                  )
                })}
                <Option
                  label={localization.otherZone}
                  selected={selected === OTHER}
                  onSelect={() => pick(OTHER)}
                />
              </div>
            </PopoverContent>
          </Popover>
          {/* The address rule fails while no area is picked and the address field is hidden. */}
          {!other && form.formState.errors.address && (
            <p className="text-sm font-medium text-destructive">{localization.errorZoneRequired}</p>
          )}
        </FormItem>
      )}
      {(active.length === 0 || other) && (
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
    </>
  )
}
