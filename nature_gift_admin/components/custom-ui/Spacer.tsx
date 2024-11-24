import { cn } from "@/lib/utils";

type SpacingPros = {
  size?: "sm" | "md" | "lg";
};

export const Spacer = ({ size = "sm" }: SpacingPros) => {
  const classes = cn({
    "h-8": size === "sm",
    "h-16": size === "md",
    "h-24": size === "lg",
  });

  return <div className={classes} />;
};
