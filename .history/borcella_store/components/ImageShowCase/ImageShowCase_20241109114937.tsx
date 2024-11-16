"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { pathOr } from "ramda";
import type { FC } from "react";
import { useState } from "react";

interface ImageShowCaseProps {
  medias: string[];
}

const ImageShowCase: FC<ImageShowCaseProps> = ({ medias }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="w-full sm:flex gap-2 h-full">
      <div className="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4 sm:h-full">
        {medias.map((media, index) => (
          <div
            key={media}
            className={cn({
              outline: activeImageIndex === index,
              "relative sm:w-full cursor-pointer rounded-md h-16 border-neutral-300 w-16":
                true,
            })}
            onClick={() => setActiveImageIndex(index)}
          >
            <Image
              src={media}
              alt="image"
              fill
              className="h-full w-full object-cover object-center rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="relative w-4/5 rounded-md">
        <Image
          src={pathOr("", [activeImageIndex], medias)}
          alt="image"
          fill
          className="h-full w-full object-contain"
        />
      </div>
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
        
      </div>
    </Card>*/
  );
};

export default ImageShowCase;
