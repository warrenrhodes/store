'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
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
import { CartItem as CartItemType } from '@/lib/models/Cart'
import { useCart, useCartSideBar } from '@/hooks/useCart'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const sidebarVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
}

export function CartSidebar() {
  const cart = useCart()
  const router = useRouter()
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem, cartShipment } = cart

  const cartSideBar = useCartSideBar()

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
      <SheetContent className="w-full sm:max-w-lg">
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="h-full flex flex-col"
        >
          <SheetHeader className="space-y-2.5 pb-6">
            <div className="flex items-center justify-between">
              <SheetTitle>Shopping Cart ({cartItems.length})</SheetTitle>
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
                        key={item.product._id}
                        item={item}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>

              <div className="pt-6 space-y-6">
                <Separator />
                <PromotionSummary cartItems={cartItems} deliveryInfo={cartShipment} />
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
