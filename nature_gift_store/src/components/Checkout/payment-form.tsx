'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, CreditCard } from 'lucide-react'
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
import { paymentSchema } from '@/lib/utils/validation-form'

interface PaymentFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onBack: () => void
}

export function PaymentForm({ initialData, onSubmit, onBack }: PaymentFormProps) {
  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: initialData || {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  })

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
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <h2 className="text-2xl font-semibold">Payment Information</h2>
          </div>

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    onChange={e => {
                      const value = e.target.value.replace(/\s/g, '')
                      const formatted = value.replace(/(\d{4})/g, '$1 ').trim()
                      field.onChange(formatted)
                    }}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Holder Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="MM/YY"
                      maxLength={5}
                      onKeyDown={handleKeyPress}
                      onChange={e => {
                        const value = e.target.value.replace(/\D/g, '')
                        const formatted = value.replace(/^(\d{2})(\d{0,2})/, '$1/$2')
                        field.onChange(formatted)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      maxLength={4}
                      placeholder="123"
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Review Order
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}
