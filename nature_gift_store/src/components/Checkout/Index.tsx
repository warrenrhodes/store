'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeliveryForm } from '@/components/Checkout/delivery-form'
import { ReviewOrder } from '@/components/Checkout/review-order'
import { OrderSummary } from '@/components/Checkout/order-summary'
import { DeliveryFormData } from '@/lib/utils/validation-form'
import { useTemporalUser } from '@/hooks/useTemporalUser'
import { toast } from '@/hooks/use-toast'
import { OrderSummary as OrderSummaryType } from '@/lib/api/orders'
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { ToastAction } from '@/components/ui/toast'
import { createOrder, IOrder } from '@/lib/api/orders'
import { IShipment } from '@/lib/api/shipments'
import { CheckoutSteps } from './CheckoutSteps'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const steps = [
  { id: 'delivery', title: 'Delivery' },
  { id: 'review', title: 'Review' },
]

export default function CheckoutPageView(props: { shipments: IShipment[] }) {
  const router = useRouter()
  const { setUserData } = useTemporalUser()
  const { cartItems, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState('delivery')
  const [formData, setFormData] = useState<DeliveryFormData>()
  const [isLoading, setIsLoading] = useState(false)
  const orderSummary = useRef<OrderSummaryType>()
  const currentStepIndex = steps.findIndex(step => step.id === currentStep)
  const { user, loading, updateUserInfo } = useCurrentUser()

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
        additionalNotes: formData.additionalNotes || null,
        deliveryMethod: formData.shipping.method,
        location: formData.shipping.location,
      },
      userData: {
        id: user?.id || '',
        email: formData.email || '',
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
      promotions: orderSummary.current.appliedPromotions.map(promotion => ({
        promotionId: promotion.id,
        discountAmount: promotion.discountAmount,
        code: promotion.code,
      })),
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user?.id || '',
    }
    const confirmOrder = await createOrder({ order: order, cartItems: cartItems, user: user })

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

    setUserData({ ...formData })
    clearCart()

    if (!user?.isAnonymous) {
      router.replace('/profile?tabs=orders')
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

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven't added any items to your cart yet
        </p>
        <Button asChild className="mt-8">
          <Link href="/shop">Start Shopping</Link>
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
                >
                  <DeliveryForm
                    shipment={props.shipments}
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
  )
}
