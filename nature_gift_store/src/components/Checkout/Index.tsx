'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Loader2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeliveryForm } from '@/components/Checkout/delivery-form'
import { ReviewOrder } from '@/components/Checkout/review-order'
import { OrderSummary } from '@/components/Checkout/order-summary'
import { DeliveryFormData, deliverySchema } from '@/lib/utils/validation-form'
import { useTemporalUser } from '@/hooks/useTemporalUser'
import { toast } from '@/hooks/use-toast'
import { OrderSummary as OrderSummaryType, Shipment } from '@/lib/firebase/models'
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { ToastAction } from '@/components/ui/toast'
import { createOrder } from '@/lib/api/orders'
import { CheckoutSteps } from './CheckoutSteps'
import { useLocalization } from '@/hooks/useLocalization'
import { sendGTMEvent } from '@next/third-parties/google'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/hooks/store/auth-store'
import { getDocumentId } from '@spreeloop/database'

const steps = [
  { id: 'delivery', title: 'Delivery' },
  { id: 'review', title: 'Review' },
]

export default function CheckoutPageView(props: { shipments: Shipment[] }) {
  const router = useRouter()
  const { setUserData } = useTemporalUser()
  const { cartItems, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState('delivery')
  const [formData, setFormData] = useState<DeliveryFormData>()
  const [isLoading, setIsLoading] = useState(false)
  const orderSummary = useRef<OrderSummaryType>()
  const currentStepIndex = steps.findIndex(step => step.id === currentStep)
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

  useEffect(() => {
    sendGTMEvent({
      event: 'begin_checkout',
      currency: 'XAF',
      value: cartItems.reduce((acc, e) => acc + e.price * e.quantity, 0),
      items: cartItems.map(e => {
        return {
          item_id: getDocumentId(e.product.path),
          item_name: e.product.title,
          quantity: e.quantity,
        }
      }),
    })
  }, [])

  const handleStepSubmit = (stepId: string, data: DeliveryFormData) => {
    setFormData(data)
    const nextStep = steps[currentStepIndex + 1]
    if (nextStep) {
      setCurrentStep(nextStep.id)
    }
  }
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
        id: user?.uid || '',
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
      userId: user?.uid || '',
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
      description: `Order created successfully ${user?.isAnonymous ? '\n Sign in to track your order' : ''}`,
      variant: 'default',
      action: !user?.isAnonymous ? (
        <></>
      ) : (
        <ToastAction altText="Sign in">
          <Link href="/sign-in">Sign in</Link>
        </ToastAction>
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
          id: user?.uid,
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

    if (!user?.isAnonymous) {
      router.replace('/profile?tabs=orders')
      return
    }
    router.replace('/order/success')
  }

  const handleBack = () => {
    const prevStep = steps[currentStepIndex - 1]
    if (prevStep) {
      setCurrentStep(prevStep.id)
    }
  }

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight">{localization.checkout}</h1>
        <h2 className="mt-4 text-xl font-semibold">{localization.cartEmpty}</h2>
        <p className="mt-2 text-muted-foreground">{localization.addItemsToCart}</p>
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/cart" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {localization.backToCart}
          </Link>
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/cart" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        </div>

        <CheckoutSteps steps={steps} currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 'delivery' && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <DeliveryForm
                    shipment={props.shipments}
                    onSubmit={data => handleStepSubmit('delivery', data)}
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
              )}

              {currentStep === 'review' && formData && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ReviewOrder
                    formData={formData}
                    onBack={handleBack}
                    onSubmit={() => onOrderConfirm(formData)}
                    isLoading={isLoading}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary orderSummary={orderSummary} />
          </div>
        </div>
      </div>
    </div>
  )
}
