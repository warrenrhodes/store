'use client'

import { UseFormReturn } from 'react-hook-form'
import { Calendar } from 'lucide-react'
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
import { cn } from '@/lib/utils/utils'
import { ShippingLocationField } from '@/components/Checkout/ShippingLocationField'

import { useLocalization } from '@/hooks/useLocalization'
import { ShippingZone } from '@/lib/utils/shipping-zones'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
interface AdsDeliveryFormProps {
  onSubmit: (data: DeliveryFormData) => void
  shipment: ShippingZone[]
  form: UseFormReturn<DeliveryFormData>
}
const TIME_IN_HOUR_BEFORE_DELIVERY = 3
const MAX_DELIVERY_HOURS = 18
const TODAY = new Date()
export function AdsDeliveryForm({ onSubmit, shipment: shipments, form }: AdsDeliveryFormProps) {
  const { localization } = useLocalization()
  const maxDate = addDays(TODAY, 3)

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
            {/* <FormField
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
            /> */}
          </div>
          <ShippingLocationField form={form} shipments={shipments} />
        </div>
      </form>
    </Form>
  )
}
