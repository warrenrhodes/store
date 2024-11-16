import React from "react";

import Link from "next/link";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

export interface ButtonSecondaryProps extends ButtonProps {
  href?: any;
  className?: string;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className,
  href,
  ...args
}) => {
  return (
    <Button asChild className={cn(className)} {...args} variant="secondary">
      <Link href={href}>Login</Link>
    </Button>
  );
};

export default ButtonSecondary;
