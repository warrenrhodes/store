'use client'

import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { format, subDays } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { promotionSchema, validatePromotionFrom } from '@/lib/validations/promotions'
import { PromotionSchemaType } from '@/lib/validations/promotions'
import { ActionFields } from './promotionForm/ActionFields'
import { ConditionFields } from './promotionForm/ConditionFields'
import { generatePromoCode } from '@/lib/utils/generate-promo'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '../ui/toast'
import { Prisma } from '@prisma/client'
interface PromotionFormProps {
  initialData?: Prisma.PromotionGetPayload<object> | null
  products: Prisma.ProductGetPayload<object>[]
}

export function PromotionFormV2({ initialData, products }: PromotionFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PromotionSchemaType>({
    resolver: zodResolver(promotionSchema),
    defaultValues: initialData || {
      code: '',
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      conditions: [],
      actions: [],
      status: 'DRAFT',
      priority: 0,
      metadata: {
        createdBy: '',
        updatedBy: '',
      },
    },
  })

  async function onSubmit(data: PromotionSchemaType) {
    const errorMessage = validatePromotionFrom(data)

    if (errorMessage) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: errorMessage,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return
    }
    setIsLoading(true)
    try {
      const url = initialData
        ? `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/promotions/${initialData.id}`
        : `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/promotions`

      const res = await fetch(url, {
        method: initialData ? 'PATCH' : 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        toast({
          variant: 'success',
          description: `Promotions ${initialData ? 'updated' : 'created'}`,
        })
        window.location.href = '/promotions'
        router.push('/promotions')
      } else {
        toast({
          variant: 'destructive',
          description: 'Something went wrong! Please try again.',
        })
        console.log(res.body)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value
      form.setValue('name', name)
      form.setValue('code', generatePromoCode(name))
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
    <Form {...form}>
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Summer Sale 2024"
                    onChange={onTitleChange}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promotion Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="SUMMER2024" disabled onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
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
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={date => date < subDays(new Date(), 1)}
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
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
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
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={date => date < form.getValues('startDate')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ConditionFields form={form} products={products} />
        <ActionFields form={form} />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="DISABLED">Disabled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => {
                      const value = e.target.value
                      if (/^\d*$/.test(value)) {
                        const parsedValue = value ? parseInt(value) : 0
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button disabled={isLoading} onClick={() => onSubmit(form.getValues())}>
            {isLoading && <Loader2 className="animate-spin" />}
            {initialData ? 'Update' : 'Create'} Promotion
          </Button>
          {initialData && (
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true)
                try {
                  await fetch(`/api/promotions/${initialData.id}`, {
                    method: 'DELETE',
                  })
                  router.refresh()
                  router.push('/promotions')
                } catch (error) {
                  console.error(error)
                } finally {
                  setIsLoading(false)
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Promotion
            </Button>
          )}
        </div>
      </div>
    </Form>
  )
}
