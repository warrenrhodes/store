import type { FC } from "react";
import React from "react";

import MainNav from "./MainNav";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div>
      <MainNav />
    </div>
  );
};

export default Header;
