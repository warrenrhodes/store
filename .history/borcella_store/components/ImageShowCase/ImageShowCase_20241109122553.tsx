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
    <div className="flex flex-col sm:flex-row w-full gap-4 min-h-[400px] sm:min-h-[400px] bg-black p-4">
      <div className="flex sm:flex-col order-1 w-full sm:w-24 gap-2 overflow-x-auto sm:overflow-y-auto">
        {medias.map((media, index) => (
          <button
            key={media}
            onClick={() => setActiveImageIndex(index)}
            className={cn(
              "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden",
              "transition-all duration-200 hover:opacity-90",
              activeImageIndex === index
                ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                : "opacity-70"
            )}
          >
            <Image
              src={media}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      <div className="relative order-2 w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
        <Image
          src={pathOr("", [activeImageIndex], medias)}
          alt={`Main image ${activeImageIndex + 1}`}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 80vw"
        />
      </div>
    </div>
    // <div className="w-full sm:flex gap-2 h-full max-sm:h-64 bg-black">
    //   <div className="sm:space-y-3 sm:w-16 w-full max-sm:flex max-sm:mb-4 max-sm:gap-4 sm:h-full">
    //     {medias.map((media, index) => (
    //       <div
    //         key={media}
    //         className={cn({
    //           outline: activeImageIndex === index,
    //           "relative sm:w-full cursor-pointer rounded-md h-16 border-neutral-300 w-16":
    //             true,
    //         })}
    //         onClick={() => setActiveImageIndex(index)}
    //       >
    //         <Image
    //           src={media}
    //           alt="image"
    //           fill
    //           className="h-full w-full object-cover object-center rounded-md"
    //         />
    //       </div>
    //     ))}
    //   </div>
    //   <div className="relative w-4/5 rounded-md max-md:h-full">
    //     <Image
    //       src={pathOr("", [activeImageIndex], medias)}
    //       alt="image"
    //       fill
    //       className="h-full w-full object-contain"
    //     />
    //   </div>
    // </div>
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
