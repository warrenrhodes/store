"use client";

import Image from "next/image";
import Link from "next/link";
import useCart from "@/lib/hooks/useCart";
import { LucideTrash, Minus, Star } from "lucide-react";
import { Plus } from "lucide-react";
import { CartItem } from "../../lib/types";
import { Button } from "../ui/button";

export const CartItemComponent = ({ cartItem }: { cartItem: CartItem }) => {
  const cart = useCart();
  const min = 1;
  const max = 99;
  const { item } = cartItem;
  const { _id, title, media, category, expense, price } = item;

  const handleClickDecrement = () => {
    if (min >= cartItem.quantity) return;
    cart.decreaseQuantity(cartItem.item._id);
  };
  const handleClickIncrement = () => {
    if (max && max <= cartItem.quantity) return;
    cart.increaseQuantity(cartItem.item._id);
  };

  return (
    <div className="flex py-5 last:pb-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${media[0].url}`}
          alt={title}
          className="h-full w-full object-contain object-center"
        />
        <Link className="absolute inset-0" href={`/products/${_id}`} />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between gap-2">
        <div>
          <div className="flex justify-between ">
            <div>
              <h3 className="font-medium ">
                <Link href={`/products/${_id}`}>{title}</Link>
              </h3>
              <span className="my-1 text-sm text-neutral-500">{category}</span>
              <div className="flex items-center gap-1 stars rating">
                <Star size={16} fill="#eab308" color="#eab308" />
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
            <Button
              variant="destructive"
              size="sm"
              onClick={() => cart.removeItem(cartItem.item._id)}
              className=" hover:bg-red-500/15 text-red-500 bg-red-500/10"
            >
              <LucideTrash size={16} />
            </Button>
          </div>
          <div className="nc-NcInputNumber__content flex w-[104px] items-center justify-between sm:w-28">
            <Minus
              size={13}
              className="flex h-8 w-8 items-center justify-center rounded-full p-2 border border-neutral-300 bg-white text-sm hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
              onClick={handleClickDecrement}
            />
            <p className="text-body-bold">{cartItem.quantity}</p>
            <Plus
              size={13}
              className="flex h-8 w-8 items-center justify-center p-2 rounded-full border border-neutral-300 bg-white text-sm hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
              onClick={handleClickIncrement}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
