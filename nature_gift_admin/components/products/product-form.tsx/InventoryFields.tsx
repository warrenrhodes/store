'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProductSchemaType } from '@/lib/validations/product'
import { useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface InventoryFieldsProps {
  form: UseFormReturn<ProductSchemaType>
}

export function InventoryFields({ form }: InventoryFieldsProps) {
  const onQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) return
      form.setValue('inventory.stockQuantity', parseInt(e.target.value || '0'))
      form.setValue('inventory.quantity', parseInt(e.target.value || '0'))
    },
    [form],
  )

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="inventory.quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={onQuantityChange}
                onKeyDown={handleKeyPress}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="inventory.lowStockThreshold"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Low Stock Threshold</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={e => field.onChange(parseInt(e.target.value))}
                onKeyDown={handleKeyPress}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />{' '}
      <FormField
        control={form.control}
        name="inventory.stockQuantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stock Quantity</FormLabel>
            <Input
              type="number"
              {...field}
              value={form.watch('inventory.quantity') ?? 0}
              onKeyDown={handleKeyPress}
              disabled
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
