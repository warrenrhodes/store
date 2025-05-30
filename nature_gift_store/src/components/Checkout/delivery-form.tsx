'use client'

import { UseFormReturn } from 'react-hook-form'
import { ArrowRight, Calendar } from 'lucide-react'
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
import { DeliveryFormData } from '@/lib/utils/validation-form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils/utils'
import { useCartDeliveryInfo } from '@/hooks/useCart'

import { useLocalization } from '@/hooks/useLocalization'
import { Shipment } from '@/lib/firebase/models'
interface DeliveryFormProps {
  onSubmit: (data: DeliveryFormData) => void
  shipment: Shipment[]
  form: UseFormReturn<DeliveryFormData>
}
const TIME_IN_HOUR_BEFORE_DELIVERY = 3
const MAX_DELIVERY_HOURS = 18
const TODAY = new Date()
export function DeliveryForm({ onSubmit, shipment: shipments, form }: DeliveryFormProps) {
  const cartDeliveryInfo = useCartDeliveryInfo()
  const { localization } = useLocalization()
  const maxDate = addDays(TODAY, 7)

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
          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>

          <div className="grid items-start">
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>{localization.whenToGetTheProduct}</FormLabel>
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
                          // form.setValue('deliveryTime', '')
                        }}
                        disabled={date => {
                          if (
                            isToday(date) &&
                            differenceInHours(date.setHours(MAX_DELIVERY_HOURS), TODAY) <
                              TIME_IN_HOUR_BEFORE_DELIVERY
                          ) {
                            return true
                          }
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
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre address exact</FormLabel>
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
        </div>
        <Button type="submit" className="w-full">
          {localization.reviewOrder}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  )
}
