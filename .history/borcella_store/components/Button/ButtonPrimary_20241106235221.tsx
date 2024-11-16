import React from "react";

import Link from "next/link";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

export interface ButtonPrimaryProps extends ButtonProps {
  href?: any;
  className?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className,
  href,
  ...args
}) => {
  return (
    <Button asChild className={cn(className)} variant="primary" {...args}>
      <Link href={href}>Login</Link>
    </Button>
  );
};

export default ButtonPrimary;
