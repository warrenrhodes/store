"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Logo from "../Logo/Logo";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
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
        <div className="flex items-center divide-x divide-neutral-300">
          <CartSideBar />
          <div className="flex items-center gap-2 pl-5">
            <Link
              href="/signup"
              className="relative flex items-center gap-2 text-sm"
            >
              <Image
                src={"/avatar.png"}
                alt="avatar"
                width={50}
                height={50}
                className="h-full w-full object-cover object-center"
              />
              <span className="hidden text-sm lg:block"> Guest </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
