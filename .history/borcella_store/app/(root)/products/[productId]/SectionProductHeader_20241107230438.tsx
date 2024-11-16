import type { FC } from "react";

import { MediaType } from "@/lib/types";
import ImageShowCase from "@/components/ImageShowCase/ImageShowCase";
import Heading from "@/shared/Heading/Heading";
import { ShoppingCart, Star } from "lucide-react";
import ProductSizeButton from "@/components/ProductSizeButton";
import { Button } from "@/components/ui/button";

interface SectionProductHeaderProps {
  medias: MediaType[];
  sizes: string[];
  title: string;
  expense: number;
  price: number;
  rating: number;
  pieces_sold: number;
  reviews: number;
}

const SectionProductHeader: FC<SectionProductHeaderProps> = ({
  medias,
  title,
  expense,
  price,
  rating,
  reviews,
  sizes,
}) => {
  return (
    <div className="items-stretch justify-between space-y-10 lg:flex lg:space-y-0">
      <div className="basis-[50%]">
        <ImageShowCase
          medias={medias.map(
            (media) => `${process.env.NEXT_PUBLIC_SERVER_URL}${media.url}`
          )}
        />
      </div>

      <div className="basis-[45%]">
        <Heading className="mb-0" isMain title="new arrival!">
          {title}
        </Heading>

        <div className="mb-10 flex items-center">
          <div className="flex items-center gap-1">
            <Star size={16} fill="#eab308" color="#eab308" />
            <p className="text-sm">
              {4.8} <span className="text-neutral-500">{`(56 Reviews)`}</span>
            </p>
          </div>
        </div>

        <div className="mb-5 space-y-1">
          <p className="text-red-500 line-through">${expense}</p>
          <h1 className="text-3xl font-medium">${price}</h1>
        </div>

        <div className="mb-5 flex items-end justify-between">
          <p className="text-xl">Available sizes</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {sizes.map((size) => (
            <ProductSizeButton key={size} size={size} />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-5">
          <Button className="w-full">Buy Now</Button>
          <Button
            variant="outline"
            className="flex w-full items-center gap-1 border-2 border-primary text-primary"
          >
            <ShoppingCart /> Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionProductHeader;
