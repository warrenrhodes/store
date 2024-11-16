import type { FC } from "react";

import { MediaType } from "@/lib/types";
import ImageShowCase from "@/components/ImageShowCase/ImageShowCase";
import Heading from "@/shared/Heading/Heading";
import { ShoppingCart, Star, StarHalf } from "lucide-react";
import ProductSizeButton from "@/components/ProductSizeButton";
import { Button } from "@/components/ui/button";
import useCart from "@/lib/hooks/useCart";

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
  const totalStars = 5;
  const fullStars = Math.floor(ratings);
  const hasHalfStar = ratings % 1 >= 0.5;
  const cart = useCart();
  const cartItem = cart.cartItems.find((item) => item.item.title === title);

  return (
    <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
      <ImageShowCase
        medias={media.map(
          (_media) => `${process.env.NEXT_PUBLIC_SERVER_URL}${_media.url}`
        )}
      />

      <div>
        <Heading className="mb-0" isMain title="new arrival!">
          {title}
        </Heading>
        <div className="flex items-center">
          {[...Array(fullStars)].map((_, index) => (
            <Star
              strokeWidth={0}
              fill="blue"
              key={index}
              className="text-blue-600 h-6 w-6"
            />
          ))}
          {hasHalfStar && (
            <StarHalf
              fill="blue"
              className="text-blue-600 h-6 w-6"
              strokeWidth={0}
            />
          )}
          {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
            (_, index) => (
              <Star
                key={index + fullStars + (hasHalfStar ? 1 : 0)}
                className="h-6 w-6"
                strokeWidth={0}
                fill="#111"
              />
            )
          )}
          <span className="ml-2 text-gray-700">{ratings.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <p className="text-gray-800 text-xl font-bold">FCFA {price}</p>
          <p className="text-gray-400 text-xl line-through">FCFA {expense}</p>
        </div>
        {sizes.length > 0 && (
          <div className="mb-5 flex items-end justify-between">
            <h3 className="text-xl font-bold text-gray-800">Sizes</h3>
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-4">
          {sizes.map((size) => (
            <ProductSizeButton key={size} size={size} />
          ))}
        </div>
        {description.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold">Short Description:</p>
            <p className="text-small-medium">{description}</p>
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white">Quantity</h3>

          <div className="flex mt-4 rounded-full overflow-hidden bg-gray-800 py-2.5 px-4 w-32">
            <button
              type="button"
              className="bg-transparent w-full text-white font-semibold flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-current inline"
                viewBox="0 0 124 124"
              >
                <path
                  d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
            <span className="bg-transparent w-full px-4 font-semibold flex items-center justify-center text-white text-base">
              1
            </span>
            <button
              type="button"
              className="bg-transparent w-full text-white font-semibold flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-current inline"
                viewBox="0 0 42 42"
              >
                <path
                  d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
          </div>
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
