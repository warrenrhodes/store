'use client'

import { ArrowLeft, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DeliveryFormData } from '@/lib/utils/validation-form'
import { format } from 'date-fns'

interface ReviewOrderProps {
  formData: DeliveryFormData
  onBack: () => void
  onSubmit: () => void
  isLoading: boolean
}

export function ReviewOrder({ formData, onBack, onSubmit, isLoading }: ReviewOrderProps) {
  const delivery = formData

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Review Your Order</h2>
        <p className="text-muted-foreground">
          Please review your order details before placing the order.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
            <CardDescription>Your order will be delivered to:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <span className="text-muted-foreground">Full Name: </span>
                <p> {delivery.fullName}</p>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground">Phone: </span>
                <p> {delivery.phone}</p>
              </div>
              {delivery.email && (
                <div className="flex gap-3">
                  <span className="text-muted-foreground">Email: </span>
                  <p> {delivery.email}</p>
                </div>
              )}

              <Separator className="my-7" />
              <div className="flex gap-3">
                <span className="text-muted-foreground">Address: </span>
                <p> {delivery.address}</p>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground">Delivery Date: </span>
                <p>
                  {format(delivery.deliveryDate, 'PPP')} {delivery.deliveryTime}
                </p>
              </div>
              {delivery.city && (
                <div className="flex gap-3">
                  <span className="text-muted-foreground">City: </span>
                  <p> {delivery.city}</p>
                </div>
              )}
              <div className="flex gap-3">
                <span className="text-muted-foreground">Delivery Method: </span>
                <p>{delivery.shipping.method === 'DELIVERY' ? 'Delivery' : 'Expedition'}</p>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground">Delivery Location: </span>
                <p> {delivery.shipping.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onSubmit} className="flex-1">
          {isLoading ? <Loader2 className="animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
          Place Order
        </Button>
      </div>
    </div>
  )
}
