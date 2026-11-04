'use client'

import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { PromotionSchemaType } from '@/lib/validations/promotions'
import { MultiSelect } from '@/components/custom-ui/MultiSelect'
import { parseList } from '@/lib/utils/parse-list'
import { IProduct } from '@/lib/actions/server'

interface ConditionFieldsProps {
  form: UseFormReturn<PromotionSchemaType>
  products: IProduct[]
  locations: Array<{ id: string; name: string }>
  cities: string[]
  /** Category names (products store their categories by name). */
  categories: string[]
}

export function ConditionFields({
  form,
  products,
  locations,
  cities,
  categories,
}: ConditionFieldsProps) {
  const productOptions = products.map(p => ({ value: p.path, label: p.data.title }))
  const cityOptions = cities.map(c => ({ value: c, label: c }))
  const categoryOptions = categories.map(c => ({ value: c, label: c }))
  // LOCATION conditions store area ids, never names: renaming an area keeps promotions valid.
  const locationOptions = locations.map(l => ({ value: l.id, label: l.name }))
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'conditions',
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
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ type: 'MINIMUM_QUANTITY', value: '2' })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Condition
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <FormField
            control={form.control}
            name={`conditions.${index}.type`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    onValueChange={e => {
                      form.setValue(`conditions.${index}.value`, '')
                      form.setValue(`actions`, [])
                      field.onChange(e)
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MINIMUM_QUANTITY">Minimum Quantity</SelectItem>
                      {products.length > 0 && (
                        <SelectItem value="SPECIFIC_PRODUCTS">Specific Products</SelectItem>
                      )}
                      {categories.length > 0 && (
                        <SelectItem value="SPECIFIC_CATEGORIES">Specific Categories</SelectItem>
                      )}
                      <SelectItem value="MINIMUM_AMOUNT">Minimum Amount (FCFA)</SelectItem>
                      <SelectItem value="DELIVERY_METHOD">Delivery Method</SelectItem>
                      <SelectItem value="CITY">City</SelectItem>
                      <SelectItem value="LOCATION">Location (areas)</SelectItem>
                      <SelectItem value="FIRST_ORDER">First order only</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`conditions.${index}.value`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  {form.watch(`conditions.${index}.type`) === 'MINIMUM_QUANTITY' ? (
                    <Input {...field} type="number" min={1} onKeyDown={handleKeyPress} />
                  ) : form.watch(`conditions.${index}.type`) === 'MINIMUM_AMOUNT' ? (
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      step={500}
                      placeholder="20000"
                      aria-label="Minimum cart subtotal in FCFA"
                      onKeyDown={handleKeyPress}
                    />
                  ) : form.watch(`conditions.${index}.type`) === 'CITY' ? (
                    <MultiSelect
                      placeholder="Cities"
                      values={cityOptions}
                      selectedValues={parseList(field.value).map(c => ({ value: c, label: c }))}
                      onChange={selected =>
                        field.onChange(JSON.stringify(selected.map(s => s.value)))
                      }
                    />
                  ) : form.watch(`conditions.${index}.type`) === 'SPECIFIC_CATEGORIES' ? (
                    <MultiSelect
                      placeholder="Categories"
                      values={categoryOptions}
                      selectedValues={categoryOptions.filter(o =>
                        parseList(field.value).includes(o.value),
                      )}
                      onChange={selected =>
                        field.onChange(JSON.stringify(selected.map(s => s.value)))
                      }
                    />
                  ) : form.watch(`conditions.${index}.type`) === 'DELIVERY_METHOD' ? (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={(field.value || '') as string}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DELIVERY">Delivery</SelectItem>
                        <SelectItem value="EXPEDITION">Expedition</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : form.watch(`conditions.${index}.type`) === 'LOCATION' ? (
                    <MultiSelect
                      placeholder="Delivery areas"
                      values={locationOptions}
                      selectedValues={parseList(field.value).map(id => ({
                        value: id,
                        label:
                          locationOptions.find(o => o.value === id)?.label ?? `${id} (deleted)`,
                      }))}
                      onChange={selected =>
                        field.onChange(JSON.stringify(selected.map(s => s.value)))
                      }
                    />
                  ) : form.watch(`conditions.${index}.type`) === 'SPECIFIC_PRODUCTS' &&
                    products.length > 0 ? (
                    <MultiSelect
                      placeholder="Products"
                      values={productOptions}
                      selectedValues={productOptions.filter(o =>
                        parseList(field.value).includes(o.value),
                      )}
                      onChange={selected =>
                        field.onChange(JSON.stringify(selected.map(s => s.value)))
                      }
                    />
                  ) : form.watch(`conditions.${index}.type`) === 'FIRST_ORDER' ? (
                    <p className="py-2 text-sm text-muted-foreground">
                      Customers who never ordered from this store (by phone number).
                    </p>
                  ) : (
                    <></>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
