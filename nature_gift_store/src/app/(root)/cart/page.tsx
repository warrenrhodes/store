'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Lock, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/components/Cart/CartItem'
import { PromotionSummary } from '@/components/Cart/PromotionSummary'
import { useCart, useCartDeliveryInfo } from '@/hooks/useCart'
import { useShallow } from 'zustand/react/shallow'
import { useLocalization } from '@/hooks/useLocalization'
import { useEffect } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'

export default function CartPage() {
  const cartItems = useCart(e => e.cartItems)
  const { cartDeliveryInfo } = useCartDeliveryInfo()
  const { localization } = useLocalization()

  const { decreaseQuantity, increaseQuantity, removeCartItem } = useCart(
    useShallow(s => ({
      increaseQuantity: s.increaseQuantity,
      decreaseQuantity: s.decreaseQuantity,
      removeCartItem: s.removeItem,
    })),
  )

  useEffect(() => {
    sendGTMEvent({
      event: 'view_cart',
      currency: 'XAF',
      value: cartItems.reduce((acc, e) => acc + e.price * e.quantity, 0),
      items: cartItems.map(e => {
        return { item_id: e.product.path, item_name: e.product.title, quantity: e.quantity }
      }),
    })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col gap-8">
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {localization.continueShopping}
            </Link>
            <h1 className="mt-3 text-3xl font-semibold">{localization.shoppingCart}</h1>
          </div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">{localization.cartEmpty}</h2>
              <p className="mt-2 text-muted-foreground">{localization.addItemsToCart}</p>
              <Button asChild className="mt-8">
                <Link href="/shop">{localization.startShopping}</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cartItems.map(item => (
                      <CartItem
                        key={`${item.product.path}`}
                        item={item}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        onRemove={removeCartItem}
                        canRemoveItem={true}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24 lg:self-start">
                <PromotionSummary cartItems={cartItems} deliveryInfo={cartDeliveryInfo} />
                <p className="text-xs text-muted-foreground">{localization.taxesAtCheckout}</p>
                <Button size="lg" className="h-12 w-full text-base" asChild>
                  <Link href="/checkout">
                    <Lock className="mr-2 h-4 w-4" aria-hidden />
                    {localization.proceedToCheckout}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
