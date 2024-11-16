"use client";
import { useState, type FC } from "react";

import { ProductType, ReviewType } from "@/lib/types";
import ProductInfoTab from "./ProductInfoTab";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { MotionDiv } from "@/shared/Motion/MotionDiv";
import { ChevronRight } from "lucide-react";

interface SectionProductInfoProps {
  product: ProductType;
  reviews: ReviewType[];
}

const SectionProductInfo: FC<SectionProductInfoProps> = ({
  product,
  reviews,
}) => {
  return (
    <div className="flex flex-col gap-10 mt-10">
      <ProductInfoDetail product={product} />
      <ProductInfoTab description={product.description} reviews={reviews} />
    </div>
  );
};

const ProductInfoDetail = ({ product }: { product: ProductType }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (product.benefices.length < 1) {
    return null;
  }
  const desktopPositions = [
    "top-0 left-0 z-10",
    "top-0 right-0 z-10",
    "bottom-0 left-0 z-10",
    "bottom-0 right-0 z-10",
  ];

  const gradients = {
    primary: "from-primary to-indigo-600",
    secondary: "from-fuchsia-600 to-pink-600",
    accent: "from-blue-600 to-cyan-600",
  };

  return (
    <div className="w-full min-h-[80vh] px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-3 mb-16 items-center justify-center"
      >
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center uppercase tracking-tight bg-clip-text">
          The advantages of {product.title}
        </h3>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "9rem" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1.5 bg-gradient-to-r from-primary to-black rounded-full"
        />
      </motion.div>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="hidden md:block relative w-full h-[700px] mb-8">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-[400px] h-[300px] group">
                <div className="absolute inset-0  rounded-lg group-hover:opacity-0 transition-opacity duration-300" />
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.media[0].url}`}
                  alt={product.title}
                  onLoad={() => setIsImageLoaded(true)}
                  className={`object-c w-full h-full rounded-lg shadow-xl transform transition-all duration-700 ${
                    isImageLoaded ? "scale-100" : "scale-110"
                  } group-hover:scale-105`}
                />
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {product.benefices.slice(0, 4).map((benefit, index) => (
              <MotionDiv
                key={benefit.title}
                className={`absolute ${desktopPositions[index]} max-w-xs`}
              >
                <Card className="backdrop-blur-sm transform transition-all duration-300 hover:shadow-2xl h-[220px] overflow-auto">
                  <CardContent className="p-6">
                    <motion.div
                      className="flex gap-4 items-start mb-3"
                      animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                    >
                      <span
                        className={`text-3xl bg-gradient-to-r ${
                          Object.values(gradients)[index % 3]
                        } bg-clip-text text-transparent`}
                      >
                        {benefit.icon}
                      </span>
                      <div
                        className="prose prose-slate font-bold text-md text-gray-600 dark:text-gray-400"
                        dangerouslySetInnerHTML={{
                          __html: benefit.title,
                        }}
                      />
                    </motion.div>
                    {benefit.description && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-slate prose-sm text-gray-600 dark:text-gray-400"
                        dangerouslySetInnerHTML={{
                          __html: benefit.description,
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>

        <div className="md:hidden space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full h-[250px] mb-12"
          >
            <div className="relative w-full h-full group">
              <div className="absolute inset-0 rounded-lg group-hover:opacity-0 transition-opacity duration-300" />
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.media[0].url}`}
                alt={product.title}
                className="object-cover w-full h-full rounded-lg shadow-xl"
              />
            </div>
          </motion.div>

          {product.benefices.slice(0, 4).map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="backdrop-blur-sm  transform transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-5">
                  <div className="flex gap-3 items-start mb-3">
                    <span
                      className={`text-2xl bg-gradient-to-r ${
                        Object.values(gradients)[index % 3]
                      } bg-clip-text text-transparent`}
                    >
                      {benefit.icon}
                    </span>
                    <div
                      className="prose prose-slate font-semibold text-gray-600 dark:text-gray-400"
                      dangerouslySetInnerHTML={{
                        __html: benefit.title,
                      }}
                    />
                  </div>
                  {benefit.description && (
                    <div
                      className="prose prose-slate prose-sm text-gray-600 dark:text-gray-400"
                      dangerouslySetInnerHTML={{
                        __html: benefit.description,
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <SeeMoreButton />
    </div>
  );
};

const SeeMoreButton = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative group">
        <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

          <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
            <div className="relative z-10 flex items-center space-x-2">
              <span className="transition-all duration-500 group-hover:translate-x-1">
                See More
              </span>
              <ChevronRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" />
            </div>
          </span>
        </button>
      </div>
    </div>
  );
};

export default SectionProductInfo;
