import type { FC } from "react";

import { ProductType, ReviewType } from "@/lib/types";
import ProductInfoTab from "./ProductInfoTab";

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
          {/* Center Product Image */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center">
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <img
                src="/api/placeholder/200/200"
                alt="Product"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {product.benefices.length > 0 &&
            product.benefices.map((benefit, index) => (
              <div
                key={index}
                className={`absolute ${benefit.position} max-w-xs transform transition-all duration-300 hover:scale-105`}
              >
                <div
                  className={`relative ${benefit.textAlign} bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>

                  {/* Arrow Container */}
                  <div
                    className={`absolute ${
                      benefit.arrowPosition
                    } top-1/2 -translate-y-1/2 ${
                      benefit.arrowPosition === "right-0"
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

export default SectionProductInfo;
