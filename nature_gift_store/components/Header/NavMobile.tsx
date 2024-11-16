import Link from "next/link";
import React from "react";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Logo from "../Logo/Logo";

export interface NavMobileProps {
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ onClickClose }) => {
  return (
    <div className="h-screen w-full divide-y divide-neutral-300 overflow-y-auto bg-white py-2 shadow-lg ring-1 transition">
      <div className="px-5 py-2">
        <Logo />
        <span className="absolute right-2 top-2 p-1" onClick={onClickClose}>
          <XIcon />
        </span>
      </div>
    </div>
  );
};

export default NavMobile;
