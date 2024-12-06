'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Steps } from '@/components/Checkout/steps'
import { DeliveryForm } from '@/components/Checkout/delivery-form'
import { PaymentForm } from '@/components/Checkout/payment-form'
import { ReviewOrder } from '@/components/Checkout/review-order'
import { OrderSummary } from '@/components/Checkout/order-summary'
import { DeliveryFormData } from '@/lib/utils/validation-form'
import { useTemporalUser } from '@/hooks/useTemporalUser'
import { toast } from '@/hooks/use-toast'
import { IOrder } from '@/lib/models/order'
import { OrderSummary as OrderSummaryType } from '@/lib/models/orderSummary'
import { useCart } from '@/hooks/useCart'
import { create } from 'domain'
import { clear } from 'console'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import User from '@/lib/models/User'
import { ToastAction } from '@/components/ui/toast'
import { createOrder } from '@/lib/api/orders'

const steps = [
  { id: 'delivery', title: 'Delivery' },
  { id: 'review', title: 'Review' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { isSignedIn, user } = useUser()
  const { setUserData } = useTemporalUser()
  const { cartItems, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState('delivery')
  const [shipments, setShipments] = useState([])
  const [formData, setFormData] = useState<DeliveryFormData>()
  const [isLoading, setIsLoading] = useState(false)
  const orderSummary = useRef<OrderSummaryType>()

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  const handleStepSubmit = (stepId: string, data: DeliveryFormData) => {
    setFormData(data)
    const nextStep = steps[currentStepIndex + 1]
    if (nextStep) {
      setCurrentStep(nextStep.id)
    }
  }
  const onOrderConfirm = async () => {
    if (!formData || !orderSummary.current) {
      toast({
        description: 'Please fill the form before submitting your order',
        variant: 'destructive',
      })
      return
    }
    setIsLoading(true)
    const order: IOrder = {
      deliveryInfo: {
        address: formData.address,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
        city: formData.city,
        additionalNotes: formData.additionalNotes,
        deliveryMethod: formData.shipping.method,
        location: formData.shipping.location,
      },
      userData: {
        id: user?.id,
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone,
      },
      status: 'PENDING',
      orderPrices: {
        subtotal: orderSummary.current.subtotal,
        shipping: orderSummary.current.shipping,
        total: orderSummary.current.total,
        discount: orderSummary.current.discount,
      },
      items: cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      promotions: orderSummary.current.appliedPromotions.map(promotion => ({
        promotionId: promotion.id,
        discountAmount: promotion.discountAmount,
        code: promotion.code,
      })),
    }
    const confirmOrder = await createOrder(order)

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
      description: `Order created successfully ${!isSignedIn ? '\n Sign in to track your order' : ''}`,
      variant: 'default',
      action: isSignedIn ? (
        <></>
      ) : (
        <ToastAction altText="Sign in">
          <Link href="/sign-in">Sign in</Link>
        </ToastAction>
      ),
    })

    setUserData({ ...formData })
    clearCart()

    if (isSignedIn) {
      router.replace('/profile/orders')
      return
    }
    router.replace('/')
  }

  const handleBack = () => {
    const prevStep = steps[currentStepIndex - 1]
    if (prevStep) {
      setCurrentStep(prevStep.id)
    }
  }

  const fetchShipments = useCallback(async () => {
    const res = await fetch('/api/shipments')
    if (!res.ok) return null
    const data = await res.json()
    setShipments(data)
  }, [])

  useEffect(() => {
    fetchShipments()
  }, [])

  return (
    <div className="min-h-screen bg-background">
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

          <Steps steps={steps} currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 'delivery' && (
                  <motion.div
                    key="delivery"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <DeliveryForm
                      shipment={shipments}
                      onSubmit={data => handleStepSubmit('delivery', data)}
                      initialData={formData}
                    />
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
                      onSubmit={onOrderConfirm}
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
    </div>
  )
}
