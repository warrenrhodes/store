"use client";

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
    <div className="space-y-3 rounded-2xl border border-neutral-300 p-2">
      <div className="relative overflow-hidden rounded-2xl md:h-[520px]">
        <Image
          src={pathOr("", [activeImageIndex], medias)}
          alt="image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {medias.map((media, index) => (
          <div
            key={media}
            className={`${
              activeImageIndex === index ? "border-2 border-primary" : ""
            } h-[100px] overflow-hidden rounded-lg`}
          >
            <button
              className="h-full w-full"
              type="button"
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                src={media}
                alt="image"
                className="h-full w-full object-cover object-center"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageShowCase;
