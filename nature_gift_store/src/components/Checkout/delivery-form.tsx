'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addDays, differenceInHours, format, isBefore, isToday } from 'date-fns'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DeliveryFormData, deliverySchema } from '@/lib/utils/validation-form'
import { useTemporalUser } from '@/hooks/useTemporalUser'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils/utils'
import { useCartDeliveryInfo } from '@/hooks/useCart'
import { IShipment } from '@/lib/api/shipments'

import { useLocalization } from '@/hooks/useLocalization'
interface DeliveryFormProps {
  onSubmit: (data: DeliveryFormData) => void
  shipment: IShipment[]
  initialData?: DeliveryFormData
}
const TIME_IN_HOUR_BEFORE_DELIVERY = 3
const MAX_DELIVERY_HOURS = 18
const TODAY = new Date()
export function DeliveryForm({ onSubmit, shipment: shipments, initialData }: DeliveryFormProps) {
  const cartDeliveryInfo = useCartDeliveryInfo()
  const { localization } = useLocalization()
  const maxDate = addDays(TODAY, 7)
  const { temporalUser } = useTemporalUser()
  const form = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: initialData || {
      fullName: temporalUser?.fullName || '',
      phone: temporalUser?.phone || '',
      email: temporalUser?.email || undefined,
      address: temporalUser?.address || '',
      deliveryDate: undefined,
      deliveryTime: '',
      additionalNotes: '',
      city: temporalUser?.city || '',
      shipping: {
        method: 'DELIVERY',
        location: '',
      },
    },
  })
  const generateTimeSlots = (selectedDate: Date) => {
    const now = new Date()
    const startHour = isToday(selectedDate) ? now.getHours() + 1 : 9
    const endHour = 19

    const timeSlots: string[] = []

    for (let hour = startHour; hour < endHour; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`)
      timeSlots.push(`${hour.toString().padStart(2, '0')}:30`)
    }

    if (isToday(selectedDate) && now.getHours() >= endHour - 1) {
      return []
    }

    return timeSlots
  }

  const getShipmentCostByLocation = (location: string): number | undefined => {
    return shipments.find(item => item.locations.includes(location))?.cost
  }

  const deliveriesLocation =
    shipments.length > 0
      ? Array.from(
          new Set(
            shipments
              .filter(shipment => shipment.method === 'DELIVERY')
              .map(e => e.locations)
              .flat(),
          ),
        )
      : []
  const expeditionLocation =
    shipments.length > 0
      ? Array.from(
          new Set(
            shipments
              .filter(shipment => shipment.method === 'EXPEDITION')
              .map(e => e.locations)
              .flat(),
          ),
        )
      : []

  const handleLocationChange = (location: string) => {
    if (!location) {
      cartDeliveryInfo.setShipment(undefined)
      return
    }
    const shipment = shipments.find(
      item => item.locations.includes(location) && form.watch('shipping.method') === item.method,
    )

    if (!shipment) {
      return
    }
    cartDeliveryInfo.setShipment({
      ...cartDeliveryInfo.cartDeliveryInfo,
      deliveryMethod: form.watch('shipping.method'),
      cost: shipment.cost,
      location: location,
    })
  }

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{localization.deliveryInformation}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{localization.fullName}</FormLabel>
                  <FormControl>
                    <Input {...field} onKeyDown={handleKeyPress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{localization.phone}</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} onKeyDown={handleKeyPress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} onKeyDown={handleKeyPress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 items-start">
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>{localization.deliveryDate}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>{localization.pickADate}</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={date => {
                          field.onChange(date)
                          form.setValue('deliveryTime', '')
                        }}
                        disabled={date => {
                          if (
                            isToday(date) &&
                            differenceInHours(date.setHours(MAX_DELIVERY_HOURS), TODAY) <
                              TIME_IN_HOUR_BEFORE_DELIVERY
                          )
                            return true
                          return isBefore(date, TODAY) || isBefore(maxDate, date)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryTime"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>{localization.deliveryTime}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!form.watch('deliveryDate')}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={localization.deliveryTime}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{field.value || 'Select time'}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.watch('deliveryDate') ? (
                        generateTimeSlots(form.watch('deliveryDate')).map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="Time disabled" disabled>
                          {localization.selectDateFirst}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className={cn({
              hidden: shipments.length > 0,
            })}
          >
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{localization.city}</FormLabel>
                  <FormControl>
                    <Input {...field} onKeyDown={handleKeyPress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className={cn({
              hidden: shipments.length === 0,
              'grid gap-4 sm:grid-cols-2 items-start': shipments.length > 0,
            })}
          >
            <FormField
              control={form.control}
              name="shipping.method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{localization.shipmentMethod}</FormLabel>
                  <Select
                    onValueChange={e => {
                      field.onChange(e)
                      form.setValue('shipping.location', '')
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DELIVERY">{localization.delivery}</SelectItem>
                      <SelectItem value="EXPEDITION">{localization.expedition}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {shipments.length > 0 && (
              <FormField
                control={form.control}
                name="shipping.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{localization.location}</FormLabel>
                    <Select
                      onValueChange={e => {
                        field.onChange(e)
                        handleLocationChange(e)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={localization.location} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(form.watch('shipping.method') === 'DELIVERY'
                          ? deliveriesLocation
                          : expeditionLocation
                        ).map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {getShipmentCostByLocation(form.watch('shipping.location')) && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {localization.shipmentCost}:{' '}
                        {getShipmentCostByLocation(form.watch('shipping.location'))}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {localization.additionalNotes} ({localization.optional})
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={localization.additionalNotes}
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          {localization.reviewOrder}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  )
}
