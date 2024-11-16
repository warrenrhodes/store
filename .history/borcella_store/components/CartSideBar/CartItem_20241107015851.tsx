"use client";

import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import useCart from "@/lib/hooks/useCart";
import { LucideTrash, MinusCircle, Star } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { CartItem } from "../../lib/types";

export const CartItemComponent = ({ cartItem }: { cartItem: CartItem }) => {
  const cart = useCart();
  const { item } = cartItem;
  const { _id, title, media, category, expense, price } = item;

  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div key={title} className="flex py-5 last:pb-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl ring-black">
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${media[0].url}`}
          alt={title}
          className="h-full w-full object-contain object-center"
        />
        <Link className="absolute inset-0" href={`/products/${_id}`} />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between gap-1">
        <div>
          <div className="flex justify-between ">
            <div>
              <h3 className="font-medium ">
                <Link href={`/products/${_id}`}>{title}</Link>
              </h3>
              <span className="my-1 text-sm text-neutral-500">{category}</span>
              <div className="flex items-center gap-1">
                <Star size={10} enableBackground={"red"} />
                <span className="text-sm">4.8</span>
              </div>
            </div>
            <div>
              <p className="line-through text-sm text-red-600">
                FCFA {expense}
              </p>
              <p className="text-body-bold">FCFA {price}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-end justify-between text-sm">
          <div className="flex items-center gap-3">
            {/* <HeartFavorite product={productInfo} /> */}
            <LucideTrash className="text-2xl" />
          </div>
          <div>
            <div className="flex gap-4 items-center">
              <MinusCircle
                className="hover:text-red-1 cursor-pointer"
                onClick={() =>
                  quantity > 1 && cart.decreaseQuantity(cartItem.item._id)
                }
              />
              <p className="text-body-bold">{cartItem.quantity}</p>
              <PlusCircle
                className="hover:text-red-1 cursor-pointer"
                onClick={() => cart.increaseQuantity(cartItem.item._id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
