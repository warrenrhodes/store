'use client'

import { AnimatePresence } from 'framer-motion'
import { Lock, ShoppingBag } from 'lucide-react'
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
import { CartItem } from './CartItem'
import { PromotionSummary } from './PromotionSummary'
import { useCart, useCartDeliveryInfo, useCartSideBar } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useLocalization } from '@/hooks/useLocalization'
import { useEffect } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'

export function CartSidebar() {
  const cart = useCart()
  const router = useRouter()
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } = cart
  const { cartDeliveryInfo } = useCartDeliveryInfo()
  const { localization } = useLocalization()
  const cartSideBar = useCartSideBar()
  const itemCount = cartItems.reduce((acc, e) => acc + e.quantity, 0)

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

  const goTo = (href: string) => {
    cartSideBar.onOpenChange(false)
    router.push(href)
  }

  return (
    <Sheet open={cartSideBar.isSideBarCartOpen} onOpenChange={cartSideBar.onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`${localization.openCart} (${itemCount})`}
        >
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-1 rounded-full bg-primary text-[11px] font-semibold flex items-center justify-center text-primary-foreground"
            >
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 py-5 border-b">
          <SheetTitle className="font-heading text-xl">
            {localization.shoppingCart} ({itemCount})
          </SheetTitle>
          <SheetDescription className="sr-only">{localization.shoppingCart}</SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" aria-hidden />
            <h3 className="mt-4 text-lg font-medium">{localization.cartEmpty}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{localization.addItemsToCart}</p>
            <Button className="mt-6" onClick={() => goTo('/shop')}>
              {localization.continueShopping}
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-3 py-4">
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

            <div className="border-t px-6 py-5 space-y-4 bg-muted/40">
              <PromotionSummary cartItems={cartItems} deliveryInfo={cartDeliveryInfo} />
              <p className="text-xs text-muted-foreground">{localization.taxesAtCheckout}</p>
              <Button className="w-full h-12 text-base" onClick={() => goTo('/checkout')}>
                <Lock className="mr-2 h-4 w-4" aria-hidden />
                {localization.proceedToCheckout}
              </Button>
              <Button variant="link" className="w-full" onClick={() => goTo('/cart')}>
                {localization.cart}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
