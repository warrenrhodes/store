'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CartItem } from '@/components/Cart/CartItem'
import { PromotionSummary } from '@/components/Cart/PromotionSummary'
import { useCart } from '@/hooks/useCart'

export default function CartPage() {
  const cart = useCart()
  const { cartItems, cartShipment } = cart

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/shop" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          </div>

          {cart.cartItems.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cart.cartItems.map(item => (
                      <CartItem
                        key={item.product._id}
                        item={item}
                        increaseQuantity={cart.increaseQuantity}
                        decreaseQuantity={cart.decreaseQuantity}
                        onRemove={cart.removeItem}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <PromotionSummary cartItems={cartItems} deliveryInfo={cartShipment} />
                <Separator />
                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
