import type { FC } from "react";

import { MediaType } from "@/lib/types";
import ImageShowCase from "@/components/ImageShowCase/ImageShowCase";
import Heading from "@/shared/Heading/Heading";
import { Plus, Minus, ShoppingCart, Star, StarHalf } from "lucide-react";
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
  product;
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
  product,
}) => {
  const totalStars = 5;
  const fullStars = Math.floor(ratings);
  const hasHalfStar = ratings % 1 >= 0.5;
  const cart = useCart();
  const cartItem = cart.cartItems.find((item) => item.item.title === title);
  const handleClickDecrement = () => {
    if (!cartItem) return;
    if (1 >= cartItem.quantity) return;
    cart.decreaseQuantity(cartItem.item._id);
  };
  const handleClickIncrement = () => {
    if (!cartItem) {
      cart.addItem();
    }

    if (99 <= (cartItem?.quantity || 0)) return;
    cart.increaseQuantity(cartItem?.item._id);
  };

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
          <h3 className="text-lg font-semibold">Quantity</h3>

          <div className="nc-NcInputNumber__content flex w-[104px] items-center justify-between sm:w-28">
            <Minus
              size={13}
              className="flex h-8 w-8 items-center justify-center rounded-full p-2 border border-neutral-300 bg-white text-sm hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
              onClick={handleClickDecrement}
            />
            <p className="text-body-bold">{cartItem.quantity}</p>
            <Plus
              size={13}
              className="flex h-8 w-8 items-center justify-center p-2 rounded-full border border-neutral-300 bg-white text-sm hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
              onClick={handleClickIncrement}
            />
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
