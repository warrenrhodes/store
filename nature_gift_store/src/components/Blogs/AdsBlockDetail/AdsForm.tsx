import { OrderSummary } from '@/components/Checkout/order-summary'
import { ToastAction } from '@/components/ui/toast'
import { useAuthStore } from '@/hooks/store/auth-store'
import { toast } from '@/hooks/use-toast'
import { useCart } from '@/hooks/useCart'
import { useLocalization } from '@/hooks/useLocalization'
import { useTemporalUser } from '@/hooks/useTemporalUser'
import { createOrder } from '@/lib/api/orders'
import { OrderSummary as OrderSummaryType, Shipment } from '@/lib/firebase/models'
import { DeliveryFormData, deliverySchema } from '@/lib/utils/validation-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendGTMEvent } from '@next/third-parties/google'
import { getDocumentId } from '@spreeloop/database'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AdsDeliveryForm } from './AdsDeliveryForm'
import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'

export const AdsForm = (props: { shipments: Shipment[] }) => {
  const router = useRouter()
  const { setUserData } = useTemporalUser()
  const { cartItems, clearCart } = useCart()
  const [formData, setFormData] = useState<DeliveryFormData>()
  const [isLoading, setIsLoading] = useState(false)
  const orderSummary = useRef<OrderSummaryType>()
  const { user } = useAuthStore()
  const { localization } = useLocalization()

  const { temporalUser } = useTemporalUser()
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

  const onOrderConfirm = async (data: DeliveryFormData) => {
    setFormData(data)
    if (!form.formState.isValid || !orderSummary.current) {
      toast({
        description: 'Please fill the form before submitting your order',
        variant: 'destructive',
      })
      return
    }

    sendGTMEvent({
      event: 'add_shipping_info',
      currency: 'XAF',
      items: cartItems.map(e => {
        return {
          item_id: getDocumentId(e.product.path),
          item_name: e.product.title,
          quantity: e.quantity,
        }
      }),
    })

    setIsLoading(true)
    const order = {
      deliveryInfo: {
        address: data.address,
        deliveryDate: data.deliveryDate,
        deliveryTime: data.deliveryTime,
        city: data.city,
        additionalNotes: data.additionalNotes || null,
        deliveryMethod: data.shipping.method,
        location: data.shipping.location,
      },
      userData: {
        id: user?.authId || '',
        email: data.email || '',
        fullName: data.fullName,
        phone: data.phone,
      },
      status: 'PENDING',
      orderPrices: {
        subtotal: orderSummary.current.subtotal,
        shipping: orderSummary.current.shipping,
        total: orderSummary.current.total,
        discount: orderSummary.current.discount,
      },
      promotions: orderSummary.current.appliedPromotions.map(promotion => ({
        promotionId: promotion.id,
        discountAmount: promotion.discountAmount,
        code: promotion.code,
      })),
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user?.authId || '',
    }
    const confirmOrder = await createOrder({ order: order, cartItems: cartItems })

    if (!confirmOrder) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to create order',
        variant: 'destructive',
      })
      setIsLoading(false)

      return
    }

    toast({
      title: 'Order created!',
      description: `Order created successfully ${!user || user?.isAnonymous ? '\n Sign in to track your order' : ''}`,
      variant: 'default',
      action:
        !user || user?.isAnonymous ? (
          <ToastAction altText="Sign in">
            <Link href="/sign-in">Sign in</Link>
          </ToastAction>
        ) : (
          <></>
        ),
    })
    const userData = confirmOrder.userData
    const orderPrices = confirmOrder.orderPrices
    const deliveryInfo = confirmOrder.deliveryInfo
    try {
      sendGTMEvent({
        event: 'purchase',
        currency: 'XAF',
        value: orderPrices.total,
        transaction_id: getDocumentId(confirmOrder.path),
        items: confirmOrder.items.map(e => {
          return {
            item_id: getDocumentId(e.product.path),
            item_name: e.product.title,
            quantity: e.quantity,
            price: e.price,
          }
        }),
        userInfo: {
          id: user?.authId,
          email: userData?.email,
          full_name: userData?.fullName,
          phone: userData?.phone,
          address: deliveryInfo.address,
          city: deliveryInfo?.city,
          location: deliveryInfo?.location,
        },
      })
    } catch (error) {
      console.log(error)
    }

    setUserData({ ...data })
    clearCart()
    router.replace('/order/success')
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="checkout-form">
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
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="lg:col-span-1">
          <OrderSummary orderSummary={orderSummary} />
        </div>
      </div>
    </>
  )
}
