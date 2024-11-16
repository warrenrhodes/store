"use client";

import { Button } from "@/components/ui/button";
import { getReviewByProductId } from "@/lib/actions/actions";
import { ProductType, ReviewType } from "@/lib/types";
import { MotionDiv } from "@/shared/Motion/MotionDiv";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export const RelatedProduct = ({ product }: { product: ProductType }) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getReviewByProductId(product._id);
      setReviews(fetchedReviews ?? []);
    };

    fetchReviews();
  }, [product._id]);

  const productReviews = reviews?.filter((review) => {
    return review.productId === product._id;
  });

  const ratings = productReviews
    ? calculateRating(
        productReviews.map((review) => ({
          rating: review.rating,
          count: 1,
        }))
      )
    : 0;
  const calculateDiscountInPercentage = (
    originalPrice: number,
    newPrice: number
  ): number => {
    const discountPercentage = (
      ((originalPrice - newPrice) / originalPrice) *
      100
    ).toFixed(2);
    return parseInt(discountPercentage);
  };

  function calculateRating(
    reviews: { rating: number; count: number }[]
  ): number {
    let totalRating = 0;
    let totalCount = 0;

    for (const review of reviews) {
      totalRating += review.rating * review.count;
      totalCount += review.count;
    }

    return totalCount > 0 ? totalRating / totalCount : 0; // Avoid division by zero
  }
  return (
    <motion.div
      key={product._id}
      className="flex-shrink-0 w-[280px] group cursor-pointer"
      whileHover={{ y: -4 }}
      style={{ scrollSnapAlign: "start" }}
      onClick={() => {
        window.location.href = `/products/${product._id}`;
      }}
    >
      <div className="bg-background rounded-xl border border-gray-200 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <Link href={`/products/${product._id}`}>
          <div className="relative aspect-square">
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.media[0].url}`}
              alt={product.title}
              fill
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {calculateDiscountInPercentage(product.expense, product.price) >
              0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                -{calculateDiscountInPercentage(product.expense, product.price)}
                %
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-4">
            <span className="text-sm text-gray-500">
              {product.categories
                .slice(0, 2)
                .map((category) => category.title)
                .join(", ")}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-gray-900 truncate">
              {product.title}
            </h3>

            {/* Rating */}
            {productReviews && productReviews.length > 0 && ratings > 0 && (
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(ratings)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({productReviews.length})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-3 flex items-center justify-between">
              <div>
                {product.price ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">FCF</span>
                    <span className="text-sm text-gray-500 line-through">
                      FCFA {product.expense}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    FCFA {product.expense}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
        <MotionDiv className="flex-1 m-3">
          <Button
            className="flex w-full rounded-xl py-6 text-secondary items-center gap-1 border-2 border-primary font-bold transition-all duration-300 hover:shadow-lg"
            // onClick={() => {
            //   if (!cartItem) {
            //     handleClickIncrement();
            //   }
            // }}
          >
            <Link href={`/checkout`}>Buy Now</Link>
          </Button>
        </MotionDiv>
      </div>
    </motion.div>
  );
};
