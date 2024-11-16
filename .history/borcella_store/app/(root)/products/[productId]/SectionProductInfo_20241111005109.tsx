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
        <h3 className="text-xl font-bold mb-2 text-center">
          The advantages of {product.title}
        </h3>
        <div className="w-10 h-1 bg-primary rounded-lg text-center" />
      </div>

      <p className="text-gray-800 mb-6">{product.description}</p>
    </div>
  );
};

export default SectionProductInfo;
