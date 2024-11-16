"use client";

import type { FC } from "react";
import { useState } from "react";

import { ReviewType } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, Verified } from "lucide-react";
import Image from "next/image";

interface ProductInfoTabProps {
  description: string;
  reviews: ReviewType[];
}

const tabs = ["Description", "Review"];

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

      {/* Tab Content */}
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
            {/* Reviews Summary */}
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

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start">
                    {review.imageUrl && (
                      <Image
                        src={review.imageUrl}
                        alt={review.userName}
                        width={12}
                        height={12}
                        className="w-12 h-12 border-2 border-white rounded-full object-cover "
                      />
                    )}
                    <div className="ml-3">
                      <h4 className="text-sm font-bold text-gray-800">
                        {review.userName}
                      </h4>
                      <div className="flex space-x-1 mt-1">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            <Verified className="w-4 h-4" />
                          </span>
                        </div>
                        <svg
                          className="w-4 fill-blue-600"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg
                          className="w-4 fill-blue-600"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg
                          className="w-4 fill-blue-600"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg
                          className="w-4 fill-[#CED5D8]"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg
                          className="w-4 fill-[#CED5D8]"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <p className="text-xs !ml-2 font-semibold text-gray-800">
                          2 mins ago
                        </p>
                      </div>
                      <p className="text-sm mt-4 text-gray-800">
                        Lorem ipsum dolor sit amet, consectetur adipisci elit,
                        sed eiusmod tempor incidunt ut labore et dolore magna
                        aliqua.
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          <Verified className="w-4 h-4" />
                        </span>
                    </div>
                    <span className="text-sm text-gray-500">{review.createdAt.toDateString()}</span>
                  </div>
                  <h4 className="font-medium mb-2">title</h4>
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      By {review.}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpful}</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductInfoTab;
