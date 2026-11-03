'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { SiteLink as Link } from '@/components/Site'
import { Button } from '@/components/ui/button'
import { DeliveryForm } from '@/components/Checkout/delivery-form'
import { OrderSummary } from '@/components/Checkout/order-summary'
import { DeliveryFormData, deliverySchema } from '@/lib/utils/validation-form'
import { useTemporalUser } from '@/hooks/useTemporalUser'
import { toast } from '@/hooks/use-toast'
import { OrderSummary as OrderSummaryType } from '@/lib/firebase/models'
import { normalize, ShippingZone } from '@/lib/utils/shipping-zones'
import { useCart } from '@/hooks/useCart'
import { getCheckoutId, useCheckoutCapture } from '@/hooks/useCheckoutCapture'
import { useOrderSubmit } from '@/hooks/useOrderSubmit'
import { useLocalization } from '@/hooks/useLocalization'
import { sendGTMEvent } from '@next/third-parties/google'
import { trackPixel } from '@/lib/analytics/pixel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/hooks/store/auth-store'
import { getDocumentId } from '@spreeloop/database'

export default function CheckoutPageView(props: { shipments: ShippingZone[] }) {
  const { cartItems, clearCart } = useCart()
  // On the marketplace the page has every store's zones: keep the cart's stores'. Two stores
  // delivering the same area (name and city) list it once; the server finds each store's own
  // area and shipping cost (lib/api/price-cart).
  const cartStores = new Set(cartItems.map(i => i.product.storeId))
  const seen = new Set<string>()
  const zones = props.shipments
    .filter(z => !z.storeId || cartStores.has(z.storeId))
    .map(z => ({
      ...z,
      areas: z.areas.filter(a => {
        const key = `${z.method}|${normalize(a.name)}|${normalize(a.city)}`
        return !seen.has(key) && !!seen.add(key)
      }),
    }))
    .filter(z => z.areas.length > 0)
  const [total, setTotal] = useState<number>()
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
    // Same event id as the server's InitiateCheckout (/api/checkouts): counted once.
    trackPixel(
      'InitiateCheckout',
      cartItems.map(e => ({ path: e.product.path, quantity: e.quantity, price: e.price })),
      getCheckoutId(),
    )
  }, [])

  useCheckoutCapture(form, cartItems)
  const { submit, isLoading } = useOrderSubmit({ items: cartItems, onPlaced: clearCart })

  const onOrderConfirm = async (data: DeliveryFormData) => {
    if (!orderSummary.current) {
      toast({
        description: localization.fillTheForm,
        variant: 'destructive',
      })
      return
    }
    await submit(data)
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
            shipment={zones}
            onSubmit={onOrderConfirm}
            form={form}
            isLoading={isLoading}
            total={total}
          />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-2">
          <OrderSummary orderSummary={orderSummary} onTotalChange={setTotal} />
        </div>
      </div>
    </div>
  )
}
