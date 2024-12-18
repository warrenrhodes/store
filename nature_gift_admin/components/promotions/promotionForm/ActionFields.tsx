'use client'

import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { PromotionSchemaType } from '@/lib/validations/promotions'

interface ActionFieldsProps {
  form: UseFormReturn<PromotionSchemaType>
}

export function ActionFields({ form }: ActionFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'actions',
  })

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>Actions</FormLabel>
        <Button
          type="button"
          variant="outline"
          disabled={form.watch('conditions').length == 0}
          size="sm"
          onClick={() => append({ type: 'PERCENTAGE_DISCOUNT', value: '0' })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Action
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <FormField
            control={form.control}
            name={`actions.${index}.type`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    onValueChange={e => {
                      form.setValue(`actions.${index}.value`, '')
                      field.onChange(e)
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select action type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERCENTAGE_DISCOUNT">Percentage Discount</SelectItem>
                      <SelectItem value="FIXED_DISCOUNT">Fixed Discount</SelectItem>
                      <SelectItem value="FREE_SHIPPING">Free Shipping</SelectItem>
                      <SelectItem value="FREE_PRODUCT">Free Product</SelectItem>
                      <SelectItem value="BUY_X_GET_Y">Buy X Get Y</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`actions.${index}.value`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  {form.watch(`actions.${index}.type`) === 'PERCENTAGE_DISCOUNT' ? (
                    <Input
                      type="number"
                      min={0}
                      placeholder="Percentage discount"
                      {...field}
                      onChange={e => {
                        const value = e.target.value
                        if (/^\d*$/.test(value)) {
                          const parsedValue = value ? value : '0'
                          field.onChange(parsedValue)
                        }
                      }}
                      onKeyDown={e => {
                        if (
                          !/\d/.test(e.key) &&
                          e.key !== 'Backspace' &&
                          e.key !== 'Delete' &&
                          e.key !== 'ArrowLeft' &&
                          e.key !== 'ArrowRight'
                        ) {
                          e.preventDefault()
                        }
                      }}
                    />
                  ) : form.watch(`actions.${index}.type`) === 'FIXED_DISCOUNT' ? (
                    <Input
                      type="number"
                      min={0}
                      placeholder="Fixed discount"
                      {...field}
                      onChange={e => {
                        const value = e.target.value
                        if (/^\d*$/.test(value)) {
                          const parsedValue = value ? value : '0'
                          field.onChange(parsedValue)
                        }
                      }}
                      onKeyDown={e => {
                        if (
                          !/\d/.test(e.key) &&
                          e.key !== 'Backspace' &&
                          e.key !== 'Delete' &&
                          e.key !== 'ArrowLeft' &&
                          e.key !== 'ArrowRight'
                        ) {
                          e.preventDefault()
                        }
                      }}
                    />
                  ) : form.watch(`actions.${index}.type`) === 'BUY_X_GET_Y' ? (
                    <div className="flex gap-4 w-full flex-1">
                      <Input
                        type="number"
                        placeholder="Buy X"
                        min={0}
                        {...field}
                        value={((field.value || '') as string)?.split(',')[0] || ''}
                        onKeyDown={e => {
                          if (
                            !/\d/.test(e.key) &&
                            e.key !== 'Backspace' &&
                            e.key !== 'Delete' &&
                            e.key !== 'ArrowLeft' &&
                            e.key !== 'ArrowRight'
                          ) {
                            e.preventDefault()
                          }
                        }}
                        onChange={e => {
                          const [buyX, getY] = ((field.value || '') as string).split(',') || [
                            '',
                            '',
                          ]
                          const newBuyX = parseInt(e.target.value)
                          field.onChange(`${newBuyX},${getY}`)
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Get Y"
                        min={0}
                        {...field}
                        value={((field.value || '') as string)?.split(',')[1] || ''}
                        onKeyDown={handleKeyPress}
                        onChange={e => {
                          const [buyX, getY] = ((field.value || '') as string).split(',') || [
                            '',
                            '',
                          ]
                          const newGetY = parseInt(e.target.value)
                          field.onChange(`${buyX},${newGetY}`)
                        }}
                      />
                    </div>
                  ) : form.watch(`actions.${index}.type`) === 'FREE_SHIPPING' ? (
                    <></>
                  ) : (
                    <></>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {(form.watch(`actions.${index}.type`) === 'FIXED_DISCOUNT' ||
            form.watch(`actions.${index}.type`) === 'PERCENTAGE_DISCOUNT') && (
            <FormField
              control={form.control}
              name={`actions.${index}.maxDiscount`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Max discount"
                      {...field}
                      value={field.value ?? ''}
                      onKeyDown={handleKeyPress}
                      onChange={e => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
