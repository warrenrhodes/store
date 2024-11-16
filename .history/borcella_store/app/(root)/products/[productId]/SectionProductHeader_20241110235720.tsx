"use client";

import { useState, type FC, useCallback, useEffect } from "react";

import {
  BeneficeType,
  MediaType,
  ProductType,
  PromotionType,
  ReviewType,
  ShipmentDetailType,
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
  ChevronLeft,
  ChevronRight,
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
              {Array.from({ length: 5 }, (_, index) => (
                <Star fill="#111" strokeWidth={0} key={index} />
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
        <Benefices benefices={product.benefices} />
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
        <ShipmentDetails shipment_details={product.shipmentDetails} />
        <Ratings rating={ratings} reviews={reviews.length || 20} />
      </div>
    </div>
  );
};

const Reviews = ({ reviews }: { reviews: ReviewType[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const AUTO_PLAY_DELAY = 4000; // Delay before resuming auto-play

  const goToNext = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      setOpacity(1);
    }, 300);
  }, []);

  const goToPrevious = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
      setOpacity(1);
    }, 300);
  }, []);

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setOpacity(0);
    setTimeout(() => {
      setCurrentIndex(index);
      setOpacity(1);
    }, 300);
  };

  // Handle manual navigation
  const handleManualNavigation = (action: VoidFunction) => {
    setIsAutoPlaying(false);
    action();

    // Resume auto-play after delay
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, AUTO_PLAY_DELAY);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(goToNext, 7000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const currentReview = reviews[currentIndex];

  return (
    <div
      className="max-w-2xl mx-auto p-6 bg-primary/5 rounded-lg shadow-lg mt-3"
      key={currentIndex}
    >
      <div className="relative">
        <button
          onClick={() => {
            setIsAutoPlaying(false);
            goToPrevious();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 -ml-12 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <button
          onClick={() => handleManualNavigation(goToNext)}
          className="absolute right-3 top-1/2 -translate-y-1/2 -mr-12 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        <div
          className="flex items-start space-x-4 transition-opacity duration-600"
          style={{ opacity }}
        >
          {currentReview?.imageUrl && (
            <div className="relative h-14 w-14 rounded-full shadow-md">
              <Image
                src={currentReview.imageUrl}
                alt={currentReview.userName}
                fill
                sizes="80px"
                unoptimized
                className="h-full w-full rounded-full object-cover "
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-800">
                {currentReview.userName}
              </h3>
              <div className="flex items-center">
                <span className="text-yellow-500">
                  {"★".repeat(currentReview.rating)}
                </span>
                <span className="text-gray-600">
                  {"★".repeat(5 - currentReview.rating)}
                </span>
              </div>
            </div>

            <p className="mt-2 text-gray-600">{currentReview.comment}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-4">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualNavigation(goToPrevious)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-600 w-4"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ShipmentDetails = ({
  shipment_details,
}: {
  shipment_details: ShipmentDetailType[];
}) => {
  return (
    <div className="mt-4 bg-primary/5 rounded-lg h-30 p-3 flex items-center overflow-hidden">
      {shipment_details?.length > 0 &&
        shipment_details.slice(0, 3).map((shipment_detail) => (
          <div
            className="flex-1 p-3 flex flex-col items-center justify-center gap-2"
            key={shipment_detail.description}
          >
            <p className="text-primary text-3xl">{shipment_detail.icon}</p>
            <div
              className="prose prose-slate prose-sm sm:prose text-center"
              dangerouslySetInnerHTML={{
                __html: shipment_detail.description,
              }}
            />
          </div>
        ))}
    </div>
  );
};

const Benefices = ({ benefices }: { benefices: BeneficeType[] }) => {
  return (
    <div className="mt-4 bg-primary/5 gap-2">
      {benefices?.length > 0 &&
        benefices?.map((benefice) => (
          <div className="w-full rounded-lg h-30 p-1" key={benefice.title}>
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

  const [current, setCurrent] = useState<PromotionType | undefined>();
  const cart = useCart();
  const handlePromotionUpdated = (promo: PromotionType) => {
    const cartItems = cart.cartItems.find(
      (item) => item.item._id === promo.product._id
    );

    if ((cartItems?.quantity || 1) < promo.minProductsToApply) {
      toast.error(
        `Select at least ${promo.minProductsToApply} product to validate the promotion`
      );
      return;
    }
    cart.updatePromotion(promo, promo.product._id);
    setCurrent(promo);
  };

  return (
    <div>
      {verifyPromos.length > 0 && (
        <div>
          <div className="flex items-center">
            <div className="bg-primary/5 h-[1px] flex-1 mr-1" />
            <p className="text-sm font-bold m-1">Promotions</p>
            <div className="bg-primary/5 h-[1px] flex-1 ml-1" />
          </div>
          <div>
            {verifyPromos.map((promo) => (
              <div
                key={promo._id}
                className={cn(
                  {
                    "border border-primary": current?._id === promo._id,
                  },
                  "w-full bg-primary/5 rounded-lg p-3 mb-2 shadow-sm cursor-pointer"
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
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-bold"> Reduction</p>
                    <p className="text-red-500 text-sm font-bold">
                      - {promo.discountValue} FCFA
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
