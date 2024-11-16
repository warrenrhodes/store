"use client";

import { CheckCircle } from "lucide-react";
import type { FC } from "react";
import { useState } from "react";

interface ProductSizeButtonProps {
  disabled?: boolean;
  size: string;
}

const ProductSizeButton: FC<ProductSizeButtonProps> = ({ disabled, size }) => {
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [selected, setSelected] = useState(false);

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => setSelected(!selected)}
      className={`relative w-full rounded-xl py-10 font-medium disabled:bg-gray disabled:text-neutral-500 ${
        selected ? "bg-primary text-white" : "bg-gray text-black"
      }`}
    >
      <CheckCircle
        className={`absolute right-2 top-2 text-white ${
          selected ? "block" : "hidden"
        }`}
      />
      {size}
    </button>
  );
};

export default ProductSizeButton;
