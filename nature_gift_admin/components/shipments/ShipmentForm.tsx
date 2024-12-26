'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

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
import { toast } from '@/hooks/use-toast'
import { shipmentSchema, ShipmentSchemaType } from '@/lib/validations/shipment'
import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import MultiText from '../custom-ui/MultiText'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { SubmitButton } from './components/SubmitButton'
import { Prisma } from '@prisma/client'
interface ShipmentFormProps {
  initialData?: Prisma.ShipmentGetPayload<object> | null
  shipments?: Prisma.ShipmentGetPayload<object>[]
}

const ShipmentForm: React.FC<ShipmentFormProps> = ({ initialData, shipments }) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<ShipmentSchemaType>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          locations: [],
          method: 'DELIVERY',
          isActive: false,
          cost: 0,
        },
  })

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const onSubmit = async (values: ShipmentSchemaType) => {
    try {
      setLoading(true)
      const url = initialData ? `/api/shipments/${initialData.id}` : '/api/shipments'
      console.log('📤 [shipments_POST] Submitting:', {
        url,
        method: 'POST',
        values,
      })
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const responseText = await res.text()
      console.log('📥 [shipments_POST] Raw response:', responseText)

      if (!res.ok) {
        console.error('❌ [shipments_POST] Error response:', {
          status: res.status,
          statusText: res.statusText,
          body: responseText,
        })
        throw new Error(responseText)
      }

      const data = responseText ? JSON.parse(responseText) : null
      console.log('✅ [shipments_POST] Success:', data)

      toast({
        description: `Shipment ${initialData ? 'updated' : 'created'} successfully`,
        variant: 'success',
      })

      router.refresh() // Refresh the page data
      router.push('/shipments')
    } catch (err: any) {
      console.error('❌ [shipments_POST] Error:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
      })

      toast({
        description: err instanceof Error ? err.message : 'Something went wrong! Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsDeleting(true)
      const res = await fetch(`/api/shipments/${initialData?.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      toast({
        description: 'Shipment deleted successfully',
        variant: 'success',
      })

      router.refresh() // Refresh the page data
      router.push('/shipments')
    } catch (err) {
      console.error('[shipments_DELETE]', err)
      toast({
        description: err instanceof Error ? err.message : 'Failed to delete shipment',
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="sm:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={'method'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DELIVERY">delivery</SelectItem>
                    <SelectItem value="EXPEDITION">expedition</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locations"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Locations</FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="Ex: Yaounde-Mendong, Yaounde-Odza"
                    value={field.value || []}
                    onChange={tag => {
                      if (
                        shipments
                          ?.filter(shipment => shipment.method === form.watch('method'))
                          .map(e => e.locations)
                          .flat()
                          .map(location => location.toLowerCase())
                          .includes(tag.toLowerCase())
                      ) {
                        toast({
                          title: 'Error',
                          description: `${tag} already exists in ${form.watch('method')} method`,
                          variant: 'destructive',
                        })
                        return
                      }
                      field.onChange([...(field.value || []), tag])
                    }}
                    onRemove={tagToRemove =>
                      field.onChange([...(field.value || []).filter(tag => tag !== tagToRemove)])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
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
            name="isActive"
            render={({ field }) => (
              <FormItem className="space-y-0 flex gap-3 items-center">
                <FormLabel className="mt-0">Is Active</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <SubmitButton
              isLoading={isLoading}
              label={initialData ? 'Update Shipment' : 'Create Shipment'}
            />
            {initialData && (
              <Button
                onClick={e => {
                  e.preventDefault()
                  onDelete()
                }}
                disabled={isDeleting || isLoading}
                variant="destructive"
              >
                {isDeleting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Delete Shipment
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ShipmentForm
