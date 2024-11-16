"use client";

import type { FC } from "react";
import { useState } from "react";

import { ReviewType } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

interface ProductInfoTabProps {
  description: string;
  reviews: ReviewType[];
}

const tabs = ["Description", "Review"];

const ProductInfoTab: FC<ProductInfoTabProps> = ({ description, reviews }) => {
  const [activeTab, setActiveTab] = useState("Description");

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
                          i < Math.round(calculateAverageRating())
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on {productData.reviews.length} reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {productData.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-2">
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
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      By {review.user}
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
                  </div>
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
