"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import avatar from "@/images/avatar.png";

import MenuBar from "./MenuBar";
import Logo from "../Logo/Logo";
import ButtonCircle3 from "../Button/ButtonCircle3";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";
import CartSideBar from "../CartSideBar/CartSideBar";
import useCart from "@/lib/hooks/useCart";

const MainNav = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const cart = useCart();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 shadow-xl backdrop-blur-lg">
      {/* <div className="flex-1 lg:hidden sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 shadow-xl backdrop-blur-lg">
        <MenuBar />
      </div> */}
      <div className="flex items-center gap-5 lg:basis-[60%]">
        <Logo />
        <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
          <input
            className="outline-none max-sm:max-w-[120px]"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            disabled={query === ""}
            onClick={() => router.push(`/search/${query}`)}
          >
            <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-5">
        <div className="relative hidden lg:block">
          {cart.cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 aspect-square p-2 size-4 rounded-full bg-red-500 text-white">
              {cart.cartItems.length}
            </span>
          )}
          <ShoppingCart className="text-2xl" />
        </div>

        <div className="flex items-center divide-x divide-neutral-300">
          <CartSideBar />
          <div className="flex items-center gap-2 pl-5">
            <ButtonCircle3 className="overflow-hidden bg-gray" size="w-10 h-10">
              <Image
                src={"/avatar.png"}
                alt="avatar"
                width={70}
                height={70}
                className="h-full w-full object-cover object-center"
              />
            </ButtonCircle3>
            <Link href="/signup" className="hidden text-sm lg:block">
              Guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
