import type { FC } from "react";
import React from "react";

import MainNav from "./MainNav";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 shadow-xl lg:hidden backdrop-blur-lg">
      <MainNav />
    </div>
  );
};

export default Header;
