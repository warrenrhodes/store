"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";

import { ProductType } from "@/lib/types";
import ButtonCircle3 from "../Button/ButtonCircle3";
import ButtonPrimary from "../Button/ButtonPrimary";
import ButtonSecondary from "../Button/ButtonSecondary";
import useCart from "@/lib/hooks/useCart";
import { MinusCircle, ShoppingCart, Star, Trash2, X } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { CartItem } from "../../lib/types";

export interface CartSideBarProps {}
const CartSideBar: React.FC<CartSideBarProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cart = useCart();

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  const renderContent = () => {
    const cart = useCart();
    return (
      <Transition appear show={isVisible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={handleCloseMenu}
        >
          <div className="z-max fixed inset-y-0 right-0 w-full max-w-md outline-none focus:outline-none md:max-w-md">
            <TransitionChild
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <div className="relative z-20">
                <div className="overflow-hidden shadow-lg ring-1 ring-black/5">
                  <div className="relative h-screen bg-white">
                    <div className="hiddenScrollbar h-screen overflow-y-auto p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">N.Gift Cart</h3>
                        <ButtonCircle3 onClick={handleCloseMenu}>
                          <X className="text-2xl" />
                        </ButtonCircle3>
                      </div>
                      <div className="divide-y divide-neutral-300">
                        {cart.cartItems.map((item) => (
                          <CartItemComponent key={item.item._id} item={item} />
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-neutral-50 p-5">
                      <p className="flex justify-between">
                        <span>
                          <span className="font-medium">Subtotal</span>
                          <span className="block text-sm text-neutral-500">
                            Shipping and taxes calculated at checkout.
                          </span>
                        </span>
                        <span className="text-xl font-medium">
                          {cart.total}
                        </span>
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
                  </div>
                </div>
              </div>
            </TransitionChild>

            <TransitionChild
              as={Fragment}
              enter=" duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave=" duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogPanel className="fixed inset-0 bg-neutral-900/60" />
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenMenu}
        className="mx-5 flex items-center gap-1 rounded-full bg-neutral-100 p-2 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <ShoppingCart className="text-2xl" />
        {cart.cartItems.length > 0 && (
          <span className="hidden text-sm lg:block">
            {cart.cartItems.length}
          </span>
        )}
      </button>

      {renderContent()}
    </>
  );
};

export default CartSideBar;
