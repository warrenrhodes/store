"use client";

import { ProductType } from "@/lib/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const SectionMoreRelatedProducts = async ({
  relatedProducts,
}: {
  relatedProducts: ProductType[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 280;
      const scrollPosition =
        containerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-16 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Related Products
          </h2>
          <p className="text-gray-500 mt-1">Products you might also like</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Products Slider */}
      <div
        ref={containerRef}
        className="overflow-x-auto hide-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex gap-6">
          {relatedProducts.map((product) => (
            <motion.div
              key={product._id}
              className="flex-shrink-0 w-[280px] group"
              whileHover={{ y: -4 }}
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-square">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.media[0].url}`}
                    alt={product.title}
                    fill
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.expense && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      -{product.expense}%
                    </span>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <span className="text-sm text-gray-500">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-lg font-medium text-gray-900 truncate">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      {product.price ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            $
                            {(
                              product.price *
                              (1 - product.price / 100)
                            ).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </span>
                      )}
                    </div>

                    {/* Quick Add Button */}
                    <button
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                      aria-label="Quick add"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SectionMoreRelatedProducts;
