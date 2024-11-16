"use client";

import type { FC } from "react";
import { useState } from "react";

import { ReviewType } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, Verified } from "lucide-react";
import Image from "next/image";
import useReviewStore from "@/lib/hooks/reviewStart";

interface ProductInfoTabProps {
  description: string;
  reviews: ReviewType[];
}

const tabs = ["Description", "Reviews"];

const ProductInfoTab: FC<ProductInfoTabProps> = ({ description, reviews }) => {
  const [activeTab, setActiveTab] = useState("Description");

  const calculateAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 relative ${
                activeTab === tab
                  ? "text-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "Description" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </motion.div>
        )}

        {activeTab === "Reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {reviews.length === 0 && (
              <p className="text-gray-600">
                No reviews found. Be the first to review this product.
              </p>
            )}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">
                  {calculateAverageRating()}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(parseInt(calculateAverageRating()))
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on {reviews.length} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.slice(0, 3).map((review) => (
                <Review key={review._id} review={review} />
              ))}
              <button
                type="button"
                className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded"
              >
                Read all reviews
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const Review = ({ review }: { review: ReviewType }) => {
  const { getReviewInteraction, toggleHelpful, toggleNotHelpful } =
    useReviewStore();
  const interaction = getReviewInteraction(review._id);

  const handleHelpfulClick = () => {
    toggleHelpful(review._id);
  };

  const handleNotHelpfulClick = () => {
    toggleNotHelpful(review._id);
  };

  return (
    <div key={review._id} className="border-b border-gray-200 pb-6">
      <div className="flex items-start w-full">
        {review.imageUrl && (
          <Image
            src={review.imageUrl}
            alt={review.userName}
            width={12}
            height={12}
            loading="lazy"
            unoptimized
            className="w-12 h-12 border-2 border-white rounded-full object-cover "
          />
        )}
        <div className="p-3 w-full">
          <div className="flex items-center mb-2 mt-1">
            <h4 className="text-sm font-bold text-gray-800">
              {review.userName}
            </h4>
            {review.verify && (
              <span className=" px-2 py-1 rounded-full">
                <Verified className="w-4 h-4 text-primary" />
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mb-2 mt-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "text-primary fill-primary"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs !ml-2 font-semibold text-gray-800">
              {review.createdAt.toDateString()}
            </p>
          </div>
          <p className="text-sm mt-4 text-gray-800">{review.comment}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 underline">
              By {review.userName}
            </span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4" />
                {review.helpful && <span>{review.helpful}</span>}
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <ThumbsDown className="w-4 h-4" />
                {review.notHelpful && <span>{review.notHelpful}</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoTab;
