import type { FC } from "react";

import { ProductType, ReviewType } from "@/lib/types";
import ProductInfoTab from "./ProductInfoTab";
import Image from "next/image";

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
  if (product.benefices.length < 1) {
    return null;
  }
  const benefits = [
    {
      position: "top-0 left-0",
      path: "M100,100 C150,100 200,150 250,200",
      textAlign: "text-right",
      arrowPosition: "right-0",
    },
    {
      position: "top-0 right-0",
      path: "M400,100 C350,100 300,150 250,200",
      textAlign: "text-left",
      arrowPosition: "left-0",
    },
    {
      position: "bottom-0 left-0",
      path: "M100,300 C150,300 200,250 250,200",
      textAlign: "text-right",
      arrowPosition: "right-0",
    },
    {
      position: "bottom-0 right-0",
      path: "M400,300 C350,300 300,250 250,200",
      textAlign: "text-left",
      arrowPosition: "left-0",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 mb-6 items-center justify-center ">
        <h3 className="text-3xl font-bold mb-2 text-center uppercase">
          The advantages of {product.title}
        </h3>
        <div className="w-36 h-1 bg-primary rounded-lg text-center" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto h-screen flex items-center justify-center p-4">
        <div className="relative w-full h-full max-h-[600px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 flex items-center justify-center">
            <div className="relative w-full h-full p-4 rounded-lg shadow-lg ">
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.media[0].url}`}
                alt={product.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 80vw"
              />
            </div>
          </div>

          {product.benefices.map((benefit, index) => (
            <div
              key={index}
              className={`absolute ${benefits[index].position} max-w-xs transform transition-all duration-300 hover:scale-105`}
            >
              <div
                className={`relative ${benefits[index].textAlign} bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>

                <div
                  className={`absolute ${
                    benefits[index].arrowPosition
                  } top-1/2 -translate-y-1/2 ${
                    benefits[index].arrowPosition === "right-0"
                      ? "translate-x-full"
                      : "-translate-x-full"
                  }`}
                >
                  <CurvedArrow
                    direction={
                      index === 0
                        ? "topLeft"
                        : index === 1
                        ? "topRight"
                        : index === 2
                        ? "bottomLeft"
                        : "bottomRight"
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CurvedArrow = ({ direction }: { direction: string }) => {
  const getPath = () => {
    switch (direction) {
      case "topLeft":
        return "M0,0 C20,0 50,30 70,50";
      case "topRight":
        return "M70,0 C50,0 20,30 0,50";
      case "bottomLeft":
        return "M0,50 C20,50 50,20 70,0";
      case "bottomRight":
        return "M70,50 C50,50 20,20 0,0";
      default:
        return "";
    }
  };

  return (
    <svg width="70" height="50" className="absolute">
      <path
        d={getPath()}
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        className="transform transition-all duration-300"
      />
    </svg>
  );
};

export default SectionProductInfo;
