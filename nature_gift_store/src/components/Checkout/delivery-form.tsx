'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addDays, format, isBefore, isToday } from 'date-fns'
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
import { IShipment } from '@/lib/models/Shipment'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils/utils'
import { useCart } from '@/hooks/useCart'

interface DeliveryFormProps {
  onSubmit: (data: DeliveryFormData) => void
  shipment: IShipment[]
  initialData?: DeliveryFormData
}

export function DeliveryForm({ onSubmit, shipment: shipments, initialData }: DeliveryFormProps) {
  const today = Date.now()
  const cart = useCart()
  const maxDate = addDays(today, 7)
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
        location: cart.cartShipment?.location || '',
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

  const deliveriesLocation = shipments
    .filter(shipment => shipment.method === 'DELIVERY')
    .map(e => e.locations)
    .flat()
  const expeditionLocation = shipments
    .filter(shipment => shipment.method === 'EXPEDITION')
    .map(e => e.locations)
    .flat()

  const handleLocationChange = (location: string) => {
    if (!location) {
      cart.setShipment(undefined)
      return
    }
    const shipment = shipments.find(
      item => item.locations.includes(location) && form.watch('shipping.method') === item.method,
    )

    if (!shipment) {
      return
    }
    cart.setShipment({
      ...cart.cartShipment,
      deliveryMethod: form.watch('shipping.method'),
      cost: shipment.cost,
      location: location,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Delivery Information</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
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
                    <Input type="email" {...field} defaultValue={field.value || ''} />
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
                  <FormLabel>Delivery Date</FormLabel>
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
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
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
                        disabled={date => isBefore(date, today) || isBefore(maxDate, date)}
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
                  <FormLabel>Delivery Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!form.watch('deliveryDate')}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot">
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
                          Please select a date first
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
                  <Input {...field} />
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
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Shipment Method</FormLabel>
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
                      <SelectItem value="DELIVERY">Delivery</SelectItem>
                      <SelectItem value="EXPEDITION">Expedition</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shipping.location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={e => {
                      field.onChange(e)
                      handleLocationChange(e)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
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
                      Shipping cost: {getShipmentCostByLocation(form.watch('shipping.location'))}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Additional notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Review Order
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  )
}
