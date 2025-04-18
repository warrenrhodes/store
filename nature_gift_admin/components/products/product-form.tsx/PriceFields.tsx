'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProductSchemaType } from '@/lib/validations/product'
import { UseFormReturn } from 'react-hook-form'
import { addDays, format, isAfter, set, sub } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface PriceFieldsProps {
  form: UseFormReturn<ProductSchemaType>
}

export function PriceFields({ form }: PriceFieldsProps) {
  const saleStartDate = form.getValues('price.saleStartDate')
  const saleEndDate = form.getValues('price.saleEndDate')

  const [date, setDate] = useState<{
    from: Date
    to: Date
  }>({
    from: saleStartDate ? new Date(saleStartDate) : new Date(),
    to: saleEndDate ? new Date(saleEndDate) : addDays(new Date(), 20),
  })

  useEffect(() => {
    if (date) {
      form.setValue('price.saleStartDate', date.from)
      form.setValue('price.saleEndDate', date.to)
    }
  }, [date, form])

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  console.log(date)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="price.regular"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Regular Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                {...field}
                onKeyDown={handleKeyPress}
                onChange={e => field.onChange(parseFloat(e.target.value || '0'))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price.sale"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sale Price (Optional)</FormLabel>
            <FormControl>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  value={field.value || '0'}
                  onKeyDown={handleKeyPress}
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className={cn('grid gap-2')}>
        <FormLabel>Sale Date Range (Optional)</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-[300px] justify-start text-left font-normal',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={data =>
                setDate({
                  from: set(data?.from ? data?.from : date.from, {
                    hours: 1,
                    minutes: 0,
                    seconds: 0,
                  }),
                  to: set(data?.to ? data?.to : date.to, {
                    hours: 1,
                    minutes: 0,
                    seconds: 0,
                  }),
                })
              }
              numberOfMonths={2}
              disabled={date => {
                const today = sub(new Date(), { days: 1 })
                return isAfter(today, date)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
