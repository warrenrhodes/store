import { OrderSummary } from '@/components/Checkout/order-summary'
import { toast } from '@/hooks/use-toast'
import { CartItem, useCartDeliveryInfo } from '@/hooks/useCart'
import { useLocalization } from '@/hooks/useLocalization'
import { useTemporalUser } from '@/hooks/useTemporalUser'
import { useCheckoutCapture } from '@/hooks/useCheckoutCapture'
import { useOrderSubmit } from '@/hooks/useOrderSubmit'
import { OrderSummary as OrderSummaryType } from '@/lib/firebase/models'
import { ShippingZone } from '@/lib/utils/shipping-zones'
import { DeliveryFormData, deliverySchema } from '@/lib/utils/validation-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendGTMEvent } from '@next/third-parties/google'
import { getDocumentId } from '@spreeloop/database'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AdsDeliveryForm } from './AdsDeliveryForm'
import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import { priceFormatted } from '@/lib/utils/utils'

// Direct checkout: orders only the items passed in, never touches the global cart.
export const AdsForm = (props: { shipments: ShippingZone[]; items: CartItem[] }) => {
  const cartItems = props.items
  const { clearDeliveryInfo } = useCartDeliveryInfo()
  const [formData, setFormData] = useState<DeliveryFormData>()
  const [total, setTotal] = useState<number>()
  const orderSummary = useRef<OrderSummaryType>()
  const { localization } = useLocalization()

  const { temporalUser } = useTemporalUser()

  // Fired once, on the first interaction with the form (not on page view).
  const checkoutStarted = useRef(false)
  const onBeginCheckout = () => {
    if (checkoutStarted.current) return
    checkoutStarted.current = true
    sendGTMEvent({
      event: 'begin_checkout',
      currency: 'XAF',
      value: cartItems.reduce((acc, e) => acc + e.price * e.quantity, 0),
      items: cartItems.map(e => ({
        item_id: getDocumentId(e.product.path),
        item_name: e.product.title,
        quantity: e.quantity,
      })),
    })
  }
  const form = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: formData || {
      fullName: temporalUser?.fullName || '',
      phone: temporalUser?.phone || '',
      email: temporalUser?.email || undefined,
      address: temporalUser?.address || '',
      deliveryDate: undefined,
      deliveryTime: '',
      additionalNotes: '',
      city: temporalUser?.city || '',
      shipping: {
        method: 'DELIVERY',
        location: '',
      },
    },
  })

  useCheckoutCapture(form, cartItems)
  const { submit, isLoading } = useOrderSubmit({ items: cartItems, onPlaced: clearDeliveryInfo })

  const onOrderConfirm = async (data: DeliveryFormData) => {
    setFormData(data)
    if (!form.formState.isValid || !orderSummary.current) {
      toast({
        description: localization.fillTheForm,
        variant: 'destructive',
      })
      return
    }
    await submit(data)
  }

  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        id="checkout-form"
        onFocusCapture={onBeginCheckout}
      >
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key="delivery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <AdsDeliveryForm
                shipment={props.shipments}
                onSubmit={data => onOrderConfirm(data)}
                form={form}
              />
              <Button
                onClick={form.handleSubmit(onOrderConfirm)}
                className="w-full"
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                {localization.placeOrder}
                {total !== undefined && ` · ${priceFormatted(total)}`}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="lg:col-span-1">
          <OrderSummary orderSummary={orderSummary} items={cartItems} onTotalChange={setTotal} />
        </div>
      </div>
    </>
  )
}
