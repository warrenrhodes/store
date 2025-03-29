'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { CartItem } from './CartItem'
import { PromotionSummary } from './PromotionSummary'
import { useCart, useCartDeliveryInfo, useCartSideBar } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useLocalization } from '@/hooks/useLocalization'
import { useEffect } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'

const sidebarVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
}

export function CartSidebar() {
  const cart = useCart()
  const router = useRouter()
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } = cart
  const { cartDeliveryInfo } = useCartDeliveryInfo()
  const { localization } = useLocalization()
  const cartSideBar = useCartSideBar()

  useEffect(() => {
    sendGTMEvent({
      event: 'view_cart',
      currency: 'XAF',
      value: cart.cartItems.reduce((acc, e) => acc + e.price * e.quantity, 0),
      items: cart.cartItems.map(e => {
        return { item_id: e.product.path, item_name: e.product.title, quantity: e.quantity }
      }),
    })
  }, [])

  return (
    <Sheet open={cartSideBar.isSideBarCartOpen} onOpenChange={cartSideBar.onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-semibold flex items-center justify-center text-primary-foreground"
            >
              {cartItems.length}
            </motion.span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-hidden">
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="h-full flex flex-col"
        >
          <SheetHeader className="space-y-2.5 pb-6">
            <div className="flex items-center justify-between">
              <SheetTitle>
                {localization.shoppingCart} ({cartItems.length})
              </SheetTitle>
              <SheetDescription />
            </div>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Your cart is empty</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add items to your cart to see them here
                </p>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cartItems.map(item => (
                      <CartItem
                        key={`${item.product.path}`}
                        item={item}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        onRemove={removeItem}
                        canRemoveItem={true}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>

              <div className="pt-6 space-y-6">
                <Separator />
                <PromotionSummary cartItems={cartItems} deliveryInfo={cartDeliveryInfo} />
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    cartSideBar.onOpenChange(false)
                    router.push('/checkout')
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}
