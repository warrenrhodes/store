"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Shield, Truck, RefreshCw } from "lucide-react";

const ProductCTA = ({
  price = 99.99,
  originalPrice = 129.99,
  stock = 12,
  freeShipping = true,
  hasWarranty = true,
  isDarkMode = false,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="relative w-full">
      {/* Background with gradient mesh - different for dark/light modes */}

      {/* Main content container */}
      <div
        className={`relative w-full max-w-4xl mx-auto ${
          isDarkMode ? "bg-gray-900/80" : "bg-white/80"
        } backdrop-blur-md rounded-lg shadow-lg transition-colors duration-300`}
      >
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 p-8">
          {/* Left Column - Price and Features */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`text-4xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ${price}
                </span>
                {originalPrice > price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>
              {stock < 20 && (
                <p className="text-sm text-red-500">
                  Only {stock} items left in stock!
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
                  <Truck size={20} />
                  <span>Free Shipping</span>
                </motion.div>
              )}
              {hasWarranty && (
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-base"
                >
                  <Shield size={20} />
                  <span>1 Year Warranty</span>
                </motion.div>
              )}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-base"
              >
                <RefreshCw size={20} />
                <span>30-Day Returns</span>
              </motion.div>
            </div>
          </div>

          {/* Right Column - CTA Buttons */}
          <div className="space-y-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors text-lg"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-colors text-lg ${
                isWishlisted
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Heart size={22} className={isWishlisted ? "fill-red-600" : ""} />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </motion.button>

            {/* Promotional Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${
                isDarkMode
                  ? "bg-blue-900/50 text-blue-200"
                  : "bg-blue-50 text-blue-800"
              } p-4 rounded-lg text-base text-center`}
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
              <p className="text-sm text-red-500">
                Only {stock} items left in stock!
              </p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                isWishlisted
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Heart size={20} className={isWishlisted ? "fill-red-600" : ""} />
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
                <Truck size={16} />
                <span>Free Shipping</span>
              </div>
            )}
            {hasWarranty && (
              <div className="flex items-center gap-2 text-sm">
                <Shield size={16} />
                <span>1 Year Warranty</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw size={16} />
              <span>30-Day Returns</span>
            </div>
          </div>

          {/* Mobile Promotional Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              isDarkMode
                ? "bg-blue-900/50 text-blue-200"
                : "bg-blue-50 text-blue-800"
            } p-3 rounded-lg text-sm text-center`}
          >
            🎉 Special offer! Get 10% off on your first purchase
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductCTA;
