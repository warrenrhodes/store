"use client";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { CartItems } from "@/components/Cart/CartItems";
import { CartForms } from "@/components/Cart/CartForms";
import { useCart } from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();

  if (cart.cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Button onClick={() => router.push("/products")} className="mt-4">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cart.cartItems.length} items in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <CartItems />

        <CartForms />
      </div>
    </div>
  );
};

export default Cart;
