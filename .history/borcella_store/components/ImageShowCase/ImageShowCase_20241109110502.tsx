"use client";

import type { FC } from "react";
import { useState } from "react";

interface ImageShowCaseProps {
  medias: string[];
}

const ImageShowCase: FC<ImageShowCaseProps> = ({ medias }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div class="w-full lg:sticky top-0 sm:flex gap-2">
      <div class="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4">
        <img
          src="https://readymadeui.com/images/product1.webp"
          alt="Product1"
          class="w-full cursor-pointer rounded-md outline"
        />
        <img
          src="https://readymadeui.com/images/product6.webp"
          alt="Product2"
          class="w-full cursor-pointer rounded-md"
        />
        <img
          src="https://readymadeui.com/images/product7.webp"
          alt="Product3"
          class="w-full cursor-pointer rounded-md"
        />
        <img
          src="https://readymadeui.com/images/product3.webp"
          alt="Product4"
          class="w-full cursor-pointer rounded-md"
        />
      </div>
      <img
        src="https://readymadeui.com/images/product2.webp"
        alt="Product"
        class="w-4/5 rounded-md object-cover"
      />
    </div>
    /**   <Card className="space-y-3 rounded-2xl border-neutral-300 p-2">
      <Card className="relative rounded-2xl md:h-[520px] bg-gray-100 h-72">
        <Image
          src={pathOr("", [activeImageIndex], medias)}
          alt="image"
          fill
          className="h-full w-full object-contain object-center"
        />
      </Card>
      <div className="grid grid-cols-3 gap-3">
        {medias.map((media, index) => (
          <div
            key={media}
            className={cn({
              "border-2 border-primary": activeImageIndex === index,
              "h-[140px] overflow-hidden rounded-2xl": true,
            })}
          >
            <button
              className="relative h-full w-full bg-gray-100"
              type="button"
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                src={media}
                alt="image"
                fill
                className="h-full w-full object-contain object-center"
              />
            </button>
          </div>
        ))}
      </div>
    </Card>*/
  );
};

export default ImageShowCase;
