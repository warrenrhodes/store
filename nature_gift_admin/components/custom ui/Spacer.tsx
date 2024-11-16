import { cn } from "@/lib/utils";

type SpacingPros = {
  size?: "sm" | "md" | "lg";
  height?: number;
};

export const Spacer = ({ size, height }: SpacingPros) => {
  const classes = cn(
    {
      "h-8 lg:h-16": size === "sm",
      "h-16 lg:h-24": size === "md",
      "h-24 lg:h-32": size === "lg",
    },
    `h-[${height}px]`
  );

  return <div className={classes} />;
};
