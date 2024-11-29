"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

import { useCart, useCartSideBar } from "@/lib/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { CartItemSideBarComponent } from "./CartItemSideBar";
import Link from "next/link";
import { Button } from "../ui/button";
import { CartItem } from "@/lib/types";
import { calculateTotalPriceOfItemCart } from "@/lib/utils";

export interface CartSideBarProps {}
const CartSideBar: React.FC<CartSideBarProps> = () => {
  const cart = useCart();
  const cartSideBar = useCartSideBar();

  const total = cart.cartItems.reduce(
    (acc: number, cartItem: CartItem) =>
      acc + calculateTotalPriceOfItemCart(cartItem),
    0,
  );

  const totalRounded = parseFloat(total.toFixed(2));

  return (
    <>
      <Sheet
        open={cartSideBar.isSideBarCartOpen}
        onOpenChange={cartSideBar.onOpenChange}
      >
        <SheetTrigger asChild>
          <button
            type="button"
            className="mx-5 flex items-center gap-1 rounded-full bg-neutral-100 p-1 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <div className="relative inline-flex p-1 items-center text-gray-800 hover:text-gray-600 focus:outline-none">
              {cart.cartItems.length > 0 && (
                <span className="absolute top-0 -right-1 -mr-2 -mt-1">
                  <div className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
                    {cart.cartItems.length}
                  </div>
                </span>
              )}
              <ShoppingCart className="text-2xl" />
            </div>
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>N.Gift Cart</SheetTitle>
          </SheetHeader>
          <div className="overflow-hidden">
            <div className="divide-y divide-neutral-300">
              {cart.cartItems.map((item) => (
                <CartItemSideBarComponent key={item.item._id} cartItem={item} />
              ))}
            </div>
          </div>
          <SheetFooter>
            <div className="absolute bottom-0 left-0 w-full bg-neutral-50 p-5">
              <p className="flex justify-between">
                <span>
                  <span className="font-medium">Subtotal</span>
                  <span className="block text-sm text-neutral-500">
                    Shipping and taxes calculated at checkout.
                  </span>
                </span>
                <span className="text-xl font-medium">FCFA {totalRounded}</span>
              </p>
              <div className="mt-5 flex items-center gap-5 w-full">
                <SheetClose asChild className="flex-1">
                  <Button className="w-full">
                    <Link href={"/checkout"}>Checkout</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild className="flex-1">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={"/cart"}>View cart</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartSideBar;