import type { FC } from "react";
import { BsBag } from "react-icons/bs";
import { LuInfo } from "react-icons/lu";

import ShoeSizeButton from "@/components/ShoeSizeButton";
import { shoeSizes } from "@/data/content";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { MediaType } from "@/lib/types";
import ImageShowCase from "@/components/ImageShowCase/ImageShowCase";
import Heading from "@/shared/Heading/Heading";
import { Star } from "lucide-react";

interface SectionProductHeaderProps {
  medias: MediaType[];
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
          <p className="flex items-center gap-1 text-sm text-neutral-500">
            Size guide <LuInfo />
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {shoeSizes.map((size) => (
            <ShoeSizeButton key={size} size={size} />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-5">
          <ButtonPrimary className="w-full">Buy Now</ButtonPrimary>
          <ButtonSecondary className="flex w-full items-center gap-1 border-2 border-primary text-primary">
            <BsBag /> Add to cart
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default SectionProductHeader;
