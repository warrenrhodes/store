import type { FC } from "react";

import { MediaType } from "@/lib/types";
import ImageShowCase from "@/components/ImageShowCase/ImageShowCase";
import Heading from "@/shared/Heading/Heading";
import { ShoppingCart, Star, StarHalf } from "lucide-react";
import ProductSizeButton from "@/components/ProductSizeButton";
import { Button } from "@/components/ui/button";

interface SectionProductHeaderProps {
  media: MediaType[];
  sizes: string[];
  title: string;
  expense: number;
  price: number;
  description: string;
  ratings: number;
  reviews: number;
}

const SectionProductHeader: FC<SectionProductHeaderProps> = ({
  media,
  title,
  expense,
  price,
  reviews,
  sizes,
  ratings,
  description,
}) => {
  return (
    <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
      <ImageShowCase
        medias={media.map(
          (_media) => `${process.env.NEXT_PUBLIC_SERVER_URL}${_media.url}`
        )}
      />

      <div className="basis-[45%]">
        <Heading className="mb-0" isMain title="new arrival!">
          {title}
        </Heading>
        <div className="flex items-center">
          {/* Render full stars */}
          {[...Array(fullStars)].map((_, index) => (
            <Star key={index} className="text-yellow-500 h-6 w-6" />
          ))}
          {/* Render half star if applicable */}
          {hasHalfStar && <StarHalf className="text-yellow-500 h-6 w-6" />}
          {/* Render empty stars */}
          {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
            (_, index) => (
              <Star
                key={index + fullStars + (hasHalfStar ? 1 : 0)}
                className="text-gray-300 h-6 w-6"
              />
            )
          )}
          {/* Optional: Display the numeric rating */}
          <span className="ml-2 text-gray-700">{rating.toFixed(1)}</span>
        </div>
        <div className="mb-10 flex items-center">
          <div className="star-rating">
            <div className="stars">
              {Array.from({ length: 5 }, () => (
                <Star fill="#111" strokeWidth={0} />
              ))}
            </div>
            <div className="stars rating">
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <StarHalf fill="yellow" strokeWidth={0} />
            </div>
          </div>
          {/* {ratings > 0 && (
              <p className="text-sm">
                {ratings}
                {reviews > 0 && (
                  <span className="text-neutral-500">{`(${reviews} Reviews)`}</span>
                )}
              </p>
            )} */}
        </div>

        <div className="mb-5 space-y-1 flex">
          <h1 className="text-3xl font-medium">FCFA {price}</h1>

          <p className="text-red-500 line-through">FCFA {expense}</p>
        </div>

        {description.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold">Short Description:</p>
            <p className="text-small-medium">{description}</p>
          </div>
        )}

        {sizes.length > 0 && (
          <div className="mb-5 flex items-end justify-between">
            <p className="text-xl">Available sizes</p>
          </div>
        )}

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
