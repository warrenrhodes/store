'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeliveryForm } from '@/components/Checkout/delivery-form'
import { OrderSummary } from '@/components/Checkout/order-summary'
import { DeliveryFormData, deliverySchema } from '@/lib/utils/validation-form'
import { useTemporalUser } from '@/hooks/useTemporalUser'
import { toast } from '@/hooks/use-toast'
import { OrderSummary as OrderSummaryType, Shipment } from '@/lib/firebase/models'
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/lib/api/orders'
import { useLocalization } from '@/hooks/useLocalization'
import { sendGTMEvent } from '@next/third-parties/google'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/hooks/store/auth-store'
import { getDocumentId } from '@spreeloop/database'

export default function CheckoutPageView(props: { shipments: Shipment[] }) {
  const router = useRouter()
  const { setUserData } = useTemporalUser()
  const { cartItems, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const orderSummary = useRef<OrderSummaryType>()
  const { user } = useAuthStore()
  const { localization } = useLocalization()

  const { temporalUser } = useTemporalUser()
  const form = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
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

  const onOrderConfirm = async (data: DeliveryFormData) => {
    if (!orderSummary.current) {
      toast({
        description: localization.fillTheForm,
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
      toast({ description: localization.orderError, variant: 'destructive' })
      setIsLoading(false)

      return
    }

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

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 px-4 text-center">
        <ShoppingBag className="h-14 w-14 text-muted-foreground" aria-hidden />
        <h1 className="mt-4 text-2xl font-semibold">{localization.cartEmpty}</h1>
        <p className="mt-2 text-muted-foreground">{localization.addItemsToCart}</p>
        <Button asChild className="mt-6">
          <Link href="/shop">{localization.continueShopping}</Link>
        </Button>
      </div>
    )
  }

  const isGuest = !user || user.isAnonymous

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {localization.backToCart}
      </Link>
      <h1 className="mt-3 text-3xl font-semibold">{localization.checkout}</h1>
      {isGuest && (
        <p className="mt-2 text-sm text-muted-foreground">
          {localization.signInBeforeTrack}{' '}
          <Link href="/sign-in?redirect=/checkout" className="font-medium text-primary underline">
            {localization.signIn}
          </Link>
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <DeliveryForm
            shipment={props.shipments}
            onSubmit={onOrderConfirm}
            form={form}
            isLoading={isLoading}
          />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-2">
          <OrderSummary orderSummary={orderSummary} />
        </div>
      </div>
    </div>
  )
}
