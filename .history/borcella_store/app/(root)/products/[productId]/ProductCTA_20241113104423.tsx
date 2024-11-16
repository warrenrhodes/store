"use client";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart, useCartSideBar } from "@/lib/hooks/useCart";
import { title } from "process";
import { ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MotionDiv } from "@/shared/Motion/MotionDiv";
import { Button } from "@/components/ui/button";

const ProductCTA = ({ product }: { product: ProductType }) => {
  // random number between 1 and 20
  const randomRating = Math.floor(Math.random() * 20) + 1;
  const cart = useCart();
  const cartSideBar = useCartSideBar();
  const cartItem = cart.cartItems.find((item) => item.item.title === title);

  return (
    <div className="relative w-full  p-8 flex items-center justify-center">
      <div className="rounded-xl absolute inset-0 bg-primary">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Main content container */}
      <div
        className={
          "relative w-full max-w-4xl bg-background mx-auto backdrop-blur-md rounded-xl shadow-2xl transition-colors duration-300 border border-white/10"
        }
      >
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 p-5">
          {/* Left Column - Price and Features */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={"text-4xl font-bold text-gray-900"}>
                  FCFA {product.price}
                </span>
                {product.expense > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    FCFA {product.expense}
                  </span>
                )}
              </div>
              {randomRating < 20 && (
                <p className="text-sm font-medium text-[#e91e63]">
                  Only {randomRating} items left in stock!
                </p>
              )}
            </div>

            {/* Features Section */}
            <div className={"space-y-4 text-gray-600"}>
              {product.shipmentDetails?.length > 0 &&
                product.shipmentDetails.map((detail, index) => (
                  <motion.div
                    whileHover={{ x: 5 }}
                    key={index}
                    className="flex items-center gap-3 text-base"
                  >
                    <span
                      className={cn(
                        {
                          "bg-gradient-to-r from-[#a91079] to-[#a91079] bg-clip-text  text-transparent":
                            index === 0,
                          "bg-gradient-to-r from-[#6626d9] to-[#6626d9] bg-clip-text  text-transparent":
                            index === 1,
                          "bg-gradient-to-r from-[#e91e63] to-[#e91e63] bg-clip-text  text-transparent":
                            index === 2,
                        },
                        "text-lg"
                      )}
                    >
                      {detail.icon}
                    </span>
                    <div
                      className="prose prose-slate prose-sm sm:prose text-center"
                      dangerouslySetInnerHTML={{
                        __html: detail.description,
                      }}
                    />
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Right Column - CTA Buttons */}
          <div className="space-y-4">
            <MotionDiv className="flex-1">
              <Button
                className="flex w-full  py-6 bg-primary text-secondary items-center gap-1 border-2 border-primary font-bold transition-all duration-300 hover:shadow-lg"
                onClick={() => {
                  if (!cartItem) {
                    cart.addItem({
                      item: product,
                      quantity: 1,
                    });
                  }
                  cartSideBar.onOpenChange(true);
                  return;
                }}
              >
                <ShoppingCart /> Add to cart
              </Button>
            </MotionDiv>
            {/* <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full py-4 px-6 bg-primary text-secondary rounded-lg font-bold flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 text-lg"
              onClick={() => {
                if (!cartItem) {
                  cart.addItem({
                    item: product,
                    quantity: 1,
                  });
                }
                cartSideBar.onOpenChange(true);
                return;
              }}
            >
              <ShoppingCart size={22} />
              Add to Cart
            </motion.button> */}

            {/* Promotional Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${"bg-[#6626d9]/10 text-[#6626d9]"} p-4 rounded-lg text-base text-center border border-[#6626d9]/20`}
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
              <span className={"text-3xl font-bold text-gray-900"}>
                FCFA {product.price}
              </span>
              {product.expense > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  FCFA {product.expense}
                </span>
              )}
            </div>
            {randomRating < 20 && (
              <p className="text-sm font-medium text-[#e91e63]">
                Only {randomRating} items left in stock!
              </p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#6626d9] to-[#a91079] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
              onClick={() => {
                if (!cartItem) {
                  cart.addItem({
                    item: product,
                    quantity: 1,
                  });
                }
                cartSideBar.onOpenChange(true);
                return;
              }}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>
          </div>

          {/* Features Section - Mobile */}
          <div className={`grid grid-cols-2 gap-3 ${"text-gray-600"}`}>
            {product.shipmentDetails?.length > 0 &&
              product.shipmentDetails.map((detail, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span
                    className={cn({
                      "bg-gradient-to-r from-[#a91079] to-[#a91079] bg-clip-text  text-transparent":
                        index === 0,
                      "bg-gradient-to-r from-[#6626d9] to-[#6626d9] bg-clip-text  text-transparent":
                        index === 1,
                      "bg-gradient-to-r from-[#e91e63] to-[#e91e63] bg-clip-text  text-transparent":
                        index === 2,
                    })}
                  >
                    {detail.icon}
                  </span>
                  <div
                    className="prose prose-slate prose-sm sm:prose text-center"
                    dangerouslySetInnerHTML={{
                      __html: detail.description,
                    }}
                  />
                </div>
              ))}
          </div>

          {/* Mobile Promotional Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${"bg-[#6626d9]/20 text-white"} p-3 rounded-lg text-sm text-center border border-[#6626d9]/20`}
          >
            🎉 Special offer! Get 10% off on your first purchase
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductCTA;
