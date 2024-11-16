import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import avatar from "@/images/avatar.png";

import MenuBar from "./MenuBar";
import Logo from "../Logo/Logo";
import ButtonCircle3 from "../Button/ButtonCircle3";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import useCart from "@/lib/hooks/useCart";
import { Search } from "lucide-react";

const MainNav = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();
  const [query, setQuery] = useState("");
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex-1 lg:hidden">
        <MenuBar />
      </div>
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
          <span className="absolute -top-1/4 left-3/4 aspect-square w-3 rounded-full bg-red-600" />
          <FaRegBell className="text-2xl" />
        </div>

        <div className="flex items-center divide-x divide-neutral-300">
          <CartSideBar />
          <div className="flex items-center gap-2 pl-5">
            <ButtonCircle3 className="overflow-hidden bg-gray" size="w-10 h-10">
              <Image
                src={avatar}
                alt="avatar"
                className="h-full w-full object-cover object-center"
              />
            </ButtonCircle3>
            <Link href="/signup" className="hidden text-sm lg:block">
              Clark Kent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
