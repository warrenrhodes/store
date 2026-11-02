'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProductSchemaType } from '@/lib/validations/product'
import { UseFormReturn } from 'react-hook-form'

interface InventoryFieldsProps {
  form: UseFormReturn<ProductSchemaType>
}

export function InventoryFields({ form }: InventoryFieldsProps) {
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* stockQuantity is the live stock (orders decrement it); quantity mirrors it for old readers. */}
      <FormField
        control={form.control}
        name="inventory.stockQuantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stock</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                value={field.value ?? form.getValues('inventory.quantity') ?? 0}
                onChange={e => {
                  const value = Math.max(0, parseInt(e.target.value || '0'))
                  field.onChange(value)
                  form.setValue('inventory.quantity', value)
                }}
                onKeyDown={handleKeyPress}
              />
            </FormControl>
            <p className="text-xs text-muted-foreground">
              Goes down with each order, back up when an order is canceled.
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="inventory.lowStockThreshold"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Low stock alert at</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                {...field}
                onChange={e => field.onChange(parseInt(e.target.value || '0'))}
                onKeyDown={handleKeyPress}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
