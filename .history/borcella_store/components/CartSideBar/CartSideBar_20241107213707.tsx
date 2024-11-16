"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { Fragment, useState } from "react";

import ButtonCircle3 from "../Button/ButtonCircle3";
import ButtonPrimary from "../Button/ButtonPrimary";
import ButtonSecondary from "../Button/ButtonSecondary";
import useCart from "@/lib/hooks/useCart";
import { MinusCircle, ShoppingCart, Star, Trash2, X } from "lucide-react";
import { CartItemComponent } from "./CartItem";
import { Button } from "../ui/button";

export interface CartSideBarProps {}
const CartSideBar: React.FC<CartSideBarProps> = () => {
  const cart = useCart();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="mx-5 flex items-center gap-1 rounded-full bg-neutral-100 p-2 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <div className="relative inline-flex items-center p-2 text-gray-800 hover:text-gray-600 focus:outline-none">
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
                <CartItemComponent key={item.item._id} cartItem={item} />
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
                <span className="text-xl font-medium">FCFA {cart.total}</span>
              </p>
              <div className="mt-5 flex items-center gap-5">
                <ButtonPrimary
                  href={"/checkout"}
                  onClick={handleCloseMenu}
                  className="w-full flex-1"
                >
                  Checkout
                </ButtonPrimary>
                <ButtonSecondary
                  href="/cart"
                  onClick={handleCloseMenu}
                  className="w-full flex-1 border-2 border-primary text-primary"
                >
                  View cart
                </ButtonSecondary>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartSideBar;
