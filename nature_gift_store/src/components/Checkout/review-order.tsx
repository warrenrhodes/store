'use client'

import { ArrowLeft, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DeliveryFormData } from '@/lib/utils/validation-form'
import { format } from 'date-fns'
import { useLocalization } from '@/hooks/useLocalization'

interface ReviewOrderProps {
  formData: DeliveryFormData
  onBack: () => void
  onSubmit: () => void
  isLoading: boolean
}

export function ReviewOrder({ formData, onBack, onSubmit, isLoading }: ReviewOrderProps) {
  const delivery = formData
  const { localization } = useLocalization()

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{localization.reviewYourOrder}</h2>
        <p className="text-muted-foreground">{localization.reviewOrderDetails}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{localization.deliveryInformation}</CardTitle>
            <CardDescription>{localization.shipmentInformation}:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <span className="text-muted-foreground">{localization.fullName}: </span>
                <p> {delivery.fullName}</p>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground">{localization.phone}: </span>
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
                <span className="text-muted-foreground">{localization.address}: </span>
                <p> {delivery.address}</p>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground">{localization.deliveryDate}: </span>
                <p>
                  {format(delivery.deliveryDate, 'PPP')} {delivery.deliveryTime}
                </p>
              </div>
              {/* {delivery.city && (
                <div className="flex gap-3">
                  <span className="text-muted-foreground">{localization.city}: </span>
                  <p> {delivery.city}</p>
                </div>
              )}
              <div className="flex gap-3">
                <span className="text-muted-foreground">{localization.shipmentMethod}: </span>
                <p>
                  {delivery.shipping.method === 'DELIVERY'
                    ? `${localization.delivery}`
                    : `${localization.expedition}`}
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground">{localization.address}: </span>
                <p> {delivery.shipping.location}</p>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground">{localization.additionalNotes}: </span>
                <p> {delivery.additionalNotes}</p>
              </div> */}
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
          {localization.placeOrder}
        </Button>
      </div>
    </div>
  )
}
