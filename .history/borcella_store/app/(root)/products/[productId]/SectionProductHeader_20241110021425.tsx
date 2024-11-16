"use client";

import { useState, type FC } from "react";

import {
  BeneficeType,
  MediaType,
  ProductType,
  PromotionType,
  ReviewType,
} from "@/lib/types";
import ImageShowCase from "@/components/ImageShowCase/ImageShowCase";
import {
  Plus,
  Minus,
  ShoppingCart,
  Star,
  StarHalf,
  CheckSquare,
  Square,
} from "lucide-react";
import ProductSizeButton from "@/components/ProductSizeButton";
import { Button } from "@/components/ui/button";
import { useCart, useCartSideBar } from "@/lib/hooks/useCart";
import Ratings from "./Ratings";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";

interface SectionProductHeaderProps {
  media: MediaType[];
  sizes: string[];
  title: string;
  expense: number;
  price: number;
  description: string;
  ratings: number;
  product: ProductType;
  benefices: BeneficeType[];
  promotions: PromotionType[];
  reviews: ReviewType[];
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
  promotions,
  benefices,
}) => {
  const fullStars = Math.floor(ratings);
  const hasHalfStar = ratings % 1 >= 0.5;
  const cart = useCart();
  const cartSideBar = useCartSideBar();
  const cartItem = cart.cartItems.find((item) => item.item.title === title);
  const handleClickDecrement = () => {
    if (!cartItem) return;
    if (1 >= cartItem.quantity) return;
    cart.decreaseQuantity(cartItem.item._id);
  };
  const handleClickIncrement = () => {
    if (!cartItem) {
      cart.addItem({
        item: product,
        quantity: 1,
      });
      return;
    }

    if (99 <= cartItem.quantity) return;
    cart.increaseQuantity(cartItem.item._id);
  };

  return (
    <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
      <ImageShowCase
        medias={media.map(
          (_media) => `${process.env.NEXT_PUBLIC_SERVER_URL}${_media.url}`
        )}
      />

      <div>
        <div className="flex">
          <div className="relative">
            <div className="flex gap-1">
              {Array.from({ length: 5 }, () => (
                <Star fill="#111" strokeWidth={0} />
              ))}
            </div>
            <div className="flex gap-1 absolute top-0">
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
            </div>
          </div>
          <p>({reviews.length}) Reviews</p>
        </div>
        <div className="font-bold text-5xl">{title}</div>
        <Benefices benefices={benefices} />
        <div className="flex flex-wrap mt-4 gap-1 items-center">
          <p className="text-gray-400 text-sm line-through self-end">
            FCFA {expense}
          </p>
          <p className="text-gray-800 text-2xl font-bold">FCFA {price}</p>
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
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Quantity</h3>

          <div className="nc-NcInputNumber__content flex w-[104px] items-center justify-between sm:w-28 mt-5">
            <Minus
              size={13}
              className="flex h-8 w-8 items-center justify-center rounded-full p-2 border border-neutral-300 bg-white text-sm hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
              onClick={handleClickDecrement}
            />
            <p className="text-body-bold">{cartItem?.quantity || 1}</p>
            <Plus
              size={13}
              className="flex h-8 w-8 items-center justify-center p-2 rounded-full border border-neutral-300 bg-white text-sm hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
              onClick={handleClickIncrement}
            />
          </div>
        </div>
        <Promotions promotions={promotions} productPrice={price} />
        <div className="mt-5 flex items-center gap-5">
          <Button className="w-full">Buy Now</Button>
          <Button
            variant="outline"
            className="flex w-full items-center gap-1 border-2 border-primary text-primary"
            onClick={() => cartSideBar.onOpenChange(true)}
          >
            <ShoppingCart /> Add to cart
          </Button>
        </div>

        <Reviews reviews={reviews} />
        <Ratings rating={ratings} reviews={reviews.length || 20} />
      </div>
    </div>
  );
};

const Reviews = ({ reviews }: { reviews: ReviewType[] }) => {
  console.log(reviews);
  return (
    <div
      id="default-carousel"
      className="relative w-full max-w-4xl mx-auto bg-primary/15 rounded-xl shadow-lg  mt-4"
      data-carousel="slide"
    >
      <div className="relative h-32 md:h-36  rounded-lg">
        {reviews.map((review, index) => (
          <div className="relative w-full h-full duration-700 ease-in-out data-carousel-item">
            <div className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1.5 left-0">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <Image
                    src={review.imageUrl || ""}
                    alt={review.userName}
                    width={80}
                    height={80}
                    unoptimized
                    className="h-20 w-20 rounded-full object-cover shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {review.userName}
                  </h3>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {reviews.map((review, index) => (
          <button
            type="button"
            className="w-3 h-3 rounded-full transition-all duration-300 bg-gray-300 hover:bg-gray-400"
            aria-current={index === 1 ? "true" : "false"}
            aria-label={`Slide ${index}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

const Benefices = ({ benefices }: { benefices: BeneficeType[] }) => {
  return (
    <div className="mt-4">
      {benefices?.length > 0 &&
        benefices?.map((benefice) => (
          <div className="w-full bg-primary/10 rounded-lg h-30 p-1 mb-2">
            <div className="flex items-center gap-2">
              <CheckSquare size={16} className="text-primary" />
              <div
                className="prose prose-slate prose-sm sm:prose"
                dangerouslySetInnerHTML={{
                  __html: benefice.title,
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
const Promotions = ({
  promotions,
  productPrice,
}: {
  promotions: PromotionType[];
  productPrice: number;
}) => {
  const verifyPromos = promotions.filter((e) => e.discountValue < productPrice);

  const [current, setCurrent] = useState<PromotionType | undefined>(
    verifyPromos[0]
  );
  const cart = useCart();
  const handlePromotionUpdated = (promo: PromotionType) => {
    const cartItems = cart.cartItems.find(
      (item) => item.item._id === promo.productId
    );

    if ((cartItems?.quantity || 1) < promo.minProducts) {
      toast.error(
        `Select at least ${promo.minProducts} product to validate the promotion`
      );
      return;
    }
    cart.updatePromotion(promo, promo.productId);
    setCurrent(promo);
  };

  const subtract_and_check = (value1: number, value2: number) =>
    value1 >= value2 ? value1 - value2 : 0;

  return (
    <div>
      {verifyPromos.length > 0 && (
        <div>
          <div className="flex items-center">
            <div className="bg-primary/10 h-[1px] flex-1 mr-1" />
            <p className="text-sm font-bold m-1">Promotions</p>
            <div className="bg-primary/10 h-[1px] flex-1 ml-1" />
          </div>
          <div>
            {verifyPromos.map((promo) => (
              <div
                className={cn(
                  {
                    "border border-primary": current?._id === promo._id,
                  },
                  "w-full bg-primary/10 rounded-lg p-3 mb-2 shadow-sm cursor-pointer"
                )}
                onClick={() => handlePromotionUpdated(promo)}
              >
                <div className="flex items-center gap-2">
                  {current?._id === promo._id ? (
                    <CheckSquare size={16} className="text-primary" />
                  ) : (
                    <Square size={16} className="text-primary/50" />
                  )}
                  <div className="flex-col flex-1">
                    <p className="text-sm font-bold">{promo.promotionName}</p>
                    <p className="text-gray-400 text-sm">
                      {((promo.discountValue * 100) / productPrice).toFixed(1)}%
                      savings
                    </p>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-bold">
                      FCFA{" "}
                      {subtract_and_check(productPrice, promo.discountValue)}
                    </p>
                    <p className="text-gray-400 text-sm line-through">
                      FCFA {productPrice * promo.minProducts}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionProductHeader;
