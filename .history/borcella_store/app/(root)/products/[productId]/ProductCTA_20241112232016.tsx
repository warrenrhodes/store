"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Shield, Truck, RefreshCw } from "lucide-react";
import { ProductType } from "@/lib/types";

const ProductCTA = ({ product }: { product: ProductType }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // random number between 1 and 20
  const randomRating = Math.floor(Math.random() * 20) + 1;

  return (
    <div className="relative w-full min-h-[500px] p-4 flex items-center justify-center">
      <div className="rounded-xl absolute inset-0 bg-gradient-to-r from-[#6626d9] via-[#a91079] to-[#e91e63]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Main content container */}
      <div
        className={
          "relative w-full max-w-4xl mx-auto backdrop-blur-md rounded-xl shadow-2xl transition-colors duration-300 border border-white/10"
        }
      >
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 p-8">
          {/* Left Column - Price and Features */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`text-4xl font-bold  "text-gray-900"
                  `}
                >
                  FCFA {price}
                </span>
                {originalPrice > price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>
              {stock < 20 && (
                <p className="text-sm font-medium text-[#e91e63]">
                  Only {randomRating} items left in stock!
                </p>
              )}
            </div>

            {/* Features Section */}
            <div
              className={`space-y-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {freeShipping && (
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-base"
                >
                  <Truck className="text-[#a91079]" size={20} />
                  <span>Free Shipping</span>
                </motion.div>
              )}
              {hasWarranty && (
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-base"
                >
                  <Shield className="text-[#6626d9]" size={20} />
                  <span>1 Year Warranty</span>
                </motion.div>
              )}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-base"
              >
                <RefreshCw className="text-[#e91e63]" size={20} />
                <span>30-Day Returns</span>
              </motion.div>
            </div>
          </div>

          {/* Right Column - CTA Buttons */}
          <div className="space-y-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#6626d9] to-[#a91079] text-white rounded-lg font-medium flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 text-lg"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-all duration-300 text-lg ${
                isWishlisted
                  ? "bg-[#e91e63]/10 text-[#e91e63] hover:bg-[#e91e63]/20"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Heart
                size={22}
                className={isWishlisted ? "fill-[#e91e63]" : ""}
              />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </motion.button>

            {/* Promotional Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${
                isDarkMode
                  ? "bg-[#6626d9]/20 text-white"
                  : "bg-[#6626d9]/10 text-[#6626d9]"
              } p-4 rounded-lg text-base text-center border border-[#6626d9]/20`}
            >
              🎉 Special offer! Get 10% off on your first purchase
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden p-6 space-y-6">
          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ${price}
              </span>
              {originalPrice > price && (
                <span className="text-lg text-gray-500 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
            {stock < 20 && (
              <p className="text-sm font-medium text-[#e91e63]">
                Only {stock} items left in stock!
              </p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#6626d9] to-[#a91079] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isWishlisted
                  ? "bg-[#e91e63]/10 text-[#e91e63] hover:bg-[#e91e63]/20"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Heart
                size={20}
                className={isWishlisted ? "fill-[#e91e63]" : ""}
              />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </motion.button>
          </div>

          {/* Features Section - Mobile */}
          <div
            className={`grid grid-cols-2 gap-3 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {freeShipping && (
              <div className="flex items-center gap-2 text-sm">
                <Truck className="text-[#a91079]" size={16} />
                <span>Free Shipping</span>
              </div>
            )}
            {hasWarranty && (
              <div className="flex items-center gap-2 text-sm">
                <Shield className="text-[#6626d9]" size={16} />
                <span>1 Year Warranty</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="text-[#e91e63]" size={16} />
              <span>30-Day Returns</span>
            </div>
          </div>

          {/* Mobile Promotional Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              isDarkMode
                ? "bg-[#6626d9]/20 text-white"
                : "bg-[#6626d9]/10 text-[#6626d9]"
            } p-3 rounded-lg text-sm text-center border border-[#6626d9]/20`}
          >
            🎉 Special offer! Get 10% off on your first purchase
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductCTA;
