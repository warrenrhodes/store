'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
        return { item_id: e.product.id, item_name: e.product.title, quantity: e.quantity }
      }),
    })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/shop" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {localization.continueShopping}
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{localization.shoppingCart}</h1>
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
                        key={`${item.product.id}`}
                        item={item}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        onRemove={removeCartItem}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <PromotionSummary cartItems={cartItems} deliveryInfo={cartDeliveryInfo} />
                <Separator />
                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">{localization.proceedToCheckout}</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
