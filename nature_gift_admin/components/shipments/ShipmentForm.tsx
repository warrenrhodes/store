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
import { IShipment } from '@/lib/actions/server'
import { createShipment, deleteShipment, updateShipment } from '@/lib/actions/shipments.actions'
import { ShipmentMethod } from '@/lib/firebase/models'
import { shipmentSchema, ShipmentSchemaType } from '@/lib/validations/shipment'
import { getDocumentId } from '@spreeloop/database'
import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { getShipmentLocations } from '@/lib/utils/shipment-locations'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { SubmitButton } from './components/SubmitButton'
interface ShipmentFormProps {
  initialData?: IShipment
  shipments?: IShipment[]
}

const ShipmentForm: React.FC<ShipmentFormProps> = ({ initialData, shipments }) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<ShipmentSchemaType>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: initialData?.data
      ? {
          ...initialData.data,
          locations: getShipmentLocations(initialData.data),
        }
      : {
          locations: [],
          method: ShipmentMethod.DELIVERY,
          isActive: false,
          cost: 0,
        },
  })

  // Names already used by the other shipments of the same method.
  const takenNames = (shipments ?? [])
    .filter(s => s.data.method === form.watch('method') && s.path !== initialData?.path)
    .flatMap(s => getShipmentLocations(s.data))
    .map(l => l.name.toLowerCase())

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
      let res
      if (initialData) {
        res = await updateShipment(getDocumentId(initialData.path), values)
      } else {
        res = await createShipment(values)
      }

      if (!res.success) {
        console.error('❌ [shipments_POST] Error:', res.error)
        throw new Error(res.error)
      }

      console.log('✅ [shipments_POST] Success')

      toast({
        description: `Shipment ${initialData ? 'updated' : 'created'} successfully`,
        variant: 'success',
      })

      router.replace('/shipments') // list page is dynamic; refresh would re-request this page
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
    if (initialData)
      try {
        setIsDeleting(true)
        const res = await deleteShipment(getDocumentId(initialData.path))

        if (!res.success) {
          throw new Error(res.error)
        }

        toast({
          description: 'Shipment deleted successfully',
          variant: 'success',
        })

        router.replace('/shipments') // list page is dynamic; refresh would re-request this page
      } catch (err: any) {
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
                  <div className="space-y-2">
                    {(field.value || []).map((location, index) => (
                      <div key={location.id} className="flex gap-2">
                        <Input
                          value={location.name}
                          aria-label="Location name"
                          onKeyDown={handleKeyPress}
                          onChange={e =>
                            field.onChange(
                              field.value.map((l, i) =>
                                i === index ? { ...l, name: e.target.value } : l,
                              ),
                            )
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Remove ${location.name}`}
                          onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Input
                      placeholder="Add a location and press Enter (ex: Yaoundé – Odza)"
                      onKeyDown={e => {
                        if (e.key !== 'Enter') return
                        e.preventDefault()
                        const name = e.currentTarget.value.trim()
                        if (!name) return
                        const taken = [
                          ...takenNames,
                          ...(field.value || []).map(l => l.name.toLowerCase()),
                        ]
                        if (taken.includes(name.toLowerCase())) {
                          toast({
                            title: 'Error',
                            description: `${name} already exists in ${form.watch('method')} method`,
                            variant: 'destructive',
                          })
                          return
                        }
                        // The id never changes: promotions reference it, so renaming is safe.
                        field.onChange([...(field.value || []), { id: crypto.randomUUID(), name }])
                        e.currentTarget.value = ''
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
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
