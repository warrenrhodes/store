"use client";

import Image from "next/image";
import { pathOr } from "ramda";
import type { FC } from "react";
import { useState } from "react";
import { Card } from "../ui/card";

interface ImageShowCaseProps {
  medias: string[];
}

const ImageShowCase: FC<ImageShowCaseProps> = ({ medias }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <Card className="space-y-3 rounded-2xl border-neutral-300 p-2">
      <Card className="relative rounded-2xl md:h-[520px] bg-gray-100">
        <Image
          src={pathOr("", [activeImageIndex], medias)}
          alt="image"
          fill
          className="h-full w-full object-contain object-center"
        />
      </Card>
      <div className="grid grid-cols-4 gap-3">
        {medias.map((media, index) => (
          <Card
            key={media}
            className={`${
              activeImageIndex === index ? "border-2 border-primary" : ""
            } h-[100px] overflow-hidden rounded-2xl`}
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
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ImageShowCase;
