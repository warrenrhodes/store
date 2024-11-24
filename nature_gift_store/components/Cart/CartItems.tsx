"use client";

import { useCart } from "@/lib/hooks/useCart";
import { CartItemView } from "./CartItemView";

export const CartItems = () => {
  const cart = useCart();

  return (
    <div className="lg:col-span-3 space-y-6">
      {cart.cartItems.map((cartItem) => (
        <CartItemView
          key={cartItem.item._id}
          cartItem={cartItem}
          removeItem={cart.removeItem}
          increaseQuantity={cart.increaseQuantity}
          decreaseQuantity={cart.decreaseQuantity}
        />
      ))}
    </div>
  );
};
