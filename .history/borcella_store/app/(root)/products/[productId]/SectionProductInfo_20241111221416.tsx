"use client";
import { useEffect, useState, type FC } from "react";

import { ProductType, ReviewType } from "@/lib/types";
import ProductInfoTab from "./ProductInfoTab";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  if (product.benefices.length < 1) {
    return null;
  }
  const desktopPositions = [
    "-top-150 left-0 z-10",
    "top-32 right-0 z-10",
    "bottom-0 left-0 z-10",
    "bottom-0 right-0 z-10",
  ];

  // Custom color scheme
  const colors: Record<string, string> = {
    primary: "from-blue-600 to-purple-600",
    secondary: "from-purple-600 to-pink-600",
    accent: "from-pink-600 to-red-600",
  };

  return (
    <div className="w-full px-4 py-8 md:py-16">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-12 items-center justify-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center uppercase tracking-tight">
          The advantages of {product.title}
        </h3>
        <div className="w-24 md:w-36 h-1 bg-primary rounded-lg" />
      </div>

      {/* Main Content Section */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Product Image - Desktop */}
        <div className="hidden md:block relative w-full h-[400px] mb-8">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[250px]">
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.media[0].url}`}
                alt={product.title}
                className="object-cover w-full h-full rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* Benefits - Desktop Layout */}
          {product.benefices.slice(0, 4).map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`absolute ${desktopPositions[index]} max-w-xs hidden md:block`}
            >
              <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-4">
                  <div className="flex gap-3 items-start mb-2">
                    <span className="text-2xl text-primary">
                      {benefit.icon}
                    </span>
                    <div
                      className="prose prose-slate font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: benefit.title,
                      }}
                    />
                  </div>
                  {benefit.description && (
                    <div
                      className="prose prose-slate prose-sm text-gray-600"
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

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {/* Product Image - Mobile */}
          <div className="relative w-full h-[200px] mb-8">
            <img
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.media[0].url}`}
              alt={product.title}
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
          </div>

          {/* Benefits - Mobile Layout */}
          {product.benefices.slice(0, 4).map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.5 }}
            >
              <Card className="transform transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex gap-3 items-start mb-2">
                    <span className="text-xl text-primary">{benefit.icon}</span>
                    <div
                      className="prose prose-slate font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: benefit.title,
                      }}
                    />
                  </div>
                  {benefit.description && (
                    <div
                      className="prose prose-slate prose-sm text-gray-600"
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
    </div>
  );
};

const Motion = ({
  children,
  initial,
  animate,
  transition,
  className,
}: {
  children: React.ReactNode;
  initial: any;
  animate: any;
  transition: any;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const style = {
    opacity: isVisible ? animate.opacity : initial.opacity,
    transform: `
      translate(${isVisible ? animate.x || 0 : initial.x || 0}px, 
      ${isVisible ? animate.y || 0 : initial.y || 0}px) 
      scale(${isVisible ? animate.scale || 1 : initial.scale || 1})
    `,
    transition: `all ${transition.duration || 0.5}s ${
      transition.ease || "ease-out"
    }`,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

// "bottom-48 -right-14"

const BenefitArrow = ({ transform }: { transform: string }) => (
  <svg
    width="80"
    height="160"
    viewBox="0 0 512 512"
    className="absolute top-1/2 -translate-y-1/2"
    style={{ transform }}
  >
    <path
      fill="#22C55E"
      d="M398.929,111.802c-0.007-0.005-0.01-0.008-0.014-0.014c-0.604-0.599-1.233-1.17-1.889-1.706
      c-0.323-0.264-0.664-0.49-0.994-0.735c-0.326-0.24-0.641-0.494-0.977-0.719c-0.482-0.321-0.981-0.604-1.479-0.889
      c-0.211-0.122-0.416-0.257-0.631-0.372c-0.475-0.255-0.967-0.475-1.459-0.698c-0.26-0.118-0.516-0.254-0.779-0.364
      c-0.426-0.176-0.862-0.318-1.292-0.47c-0.353-0.125-0.703-0.26-1.06-0.37c-0.347-0.105-0.697-0.181-1.047-0.269
      c-0.457-0.118-0.911-0.245-1.376-0.336c-0.264-0.052-0.531-0.079-0.793-0.123c-0.551-0.091-1.102-0.184-1.66-0.24
      c-0.215-0.022-0.433-0.02-0.651-0.036c-0.599-0.044-1.195-0.086-1.802-0.086c-0.333,0-0.668,0.032-1.001,0.046
      c-0.482,0.019-0.96,0.022-1.446,0.069c-0.839,0.079-1.677,0.206-2.506,0.369c-0.007,0.002-0.017,0.002-0.024,0.003
      c-0.103,0.02-0.194,0.054-0.298,0.074c-0.717,0.15-1.43,0.325-2.134,0.538c-0.26,0.078-0.509,0.181-0.766,0.267
      c-0.529,0.179-1.057,0.357-1.576,0.571c-0.347,0.144-0.68,0.314-1.021,0.473c-0.406,0.189-0.812,0.37-1.212,0.583
      c-0.413,0.22-0.807,0.47-1.202,0.71c-0.308,0.186-0.617,0.358-0.918,0.558c-0.482,0.323-0.942,0.676-1.4,1.031
      c-0.198,0.152-0.402,0.289-0.599,0.45c-0.599,0.49-1.165,1.009-1.714,1.55c-0.049,0.047-0.103,0.086-0.149,0.135l-0.024,0.024
      c-0.034,0.032-0.063,0.063-0.096,0.093L257.409,217.451c-9.905,9.903-9.905,25.962,0,35.867c4.952,4.954,11.442,7.428,17.934,7.428
      c6.489,0,12.982-2.477,17.931-7.428l65.664-65.662c-7.265,79.976-66.287,149.227-148.908,165.662
      c-60.48,12.03-122.865-6.657-166.873-49.988c-9.984-9.829-26.04-9.703-35.867,0.277c-9.829,9.981-9.702,26.038,0.277,35.867
      c44.808,44.118,104.584,68.154,166.13,68.152h0.002l0,0c15.364-0.002,30.848-1.5,46.228-4.558
      c104.643-20.815,179.471-108.065,189.377-209.151l59.399,59.397c9.903,9.905,25.962,9.905,35.867,0
      c9.906-9.905,9.906-25.962,0-35.867L398.929,111.802z"
    />
  </svg>
);

export default SectionProductInfo;
