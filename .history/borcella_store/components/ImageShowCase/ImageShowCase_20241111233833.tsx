"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { pathOr } from "ramda";
import type { FC } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // Import motion from framer-motion
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageShowCaseProps {
  medias: string[];
}

const ImageShowCase: FC<ImageShowCaseProps> = ({ medias }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="flex flex-col sm:flex-row w-full gap-1 max-md:min-h-[400px] h-full">
      <div className="flex sm:flex-col order-1 w-full sm:w-28 gap-2 overflow-x-hidden sm:overflow-y-auto p-2">
        {medias.length > 1 &&
          medias.map((media, index) => (
            <motion.button
              key={media}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                {
                  "ring-2 ring-white ring-offset-2 ring-offset-black/50":
                    activeImageIndex === index,
                },
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden",
                "transition-all duration-200 hover:opacity-90"
              )}
              whileHover={{ scale: 1.1 }} // Scale effect on hover
              whileTap={{ scale: 0.95 }} // Scale effect on tap
            >
              <Image
                src={media}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.button>
          ))}
      </div>

      <motion.div
        className="relative order-2 w-full h-[300px] md:h-full rounded-lg overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-blue/50 bg-muted/10"
        key={activeImageIndex} // Key to trigger re-render on image change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }} // Fade-in effect for main image
      >
        <Image
          src={pathOr("", [activeImageIndex], medias)}
          alt={`Main image ${activeImageIndex + 1}`}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 80vw"
        />
      </motion.div>
    </div>
  );
};

export { ImageShowCase, ProductGallery };

const ProductGallery: FC<ImageShowCaseProps> = ({ medias }) => {
  // Sample product images - replace with your actual images

  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImage(
      (prev) => (prev + newDirection + medias.length) % medias.length
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative h-96 md:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentImage}
            src={medias[currentImage]}
            alt={`Main image ${1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full object-contain"
          />
        </AnimatePresence>

        <button
          className="absolute z-10 left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {medias.map((image, index) => (
          <button
            key={image}
            onClick={() => {
              setDirection(index > currentImage ? 1 : -1);
              setCurrentImage(index);
            }}
            className={`flex-shrink-0 relative ${
              currentImage === index
                ? "ring-2 ring-blue-500"
                : "hover:opacity-75"
            }`}
          >
            <motion.img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
