import type { FC } from "react";

import ProductInfoTab from "./ProductInfoTab";
import { ProductType, ReviewType } from "@/lib/types";

interface SectionProductInfoProps {
  product: ProductType;
  reviews: ReviewType[];
}

const SectionProductInfo: FC<SectionProductInfoProps> = ({
  product,
  reviews,
}) => {
  return (
    <div className="flex flex-col gap-10">
      <ProductInfoDetail product={product} />
      <ProductInfoTab description={product.description} reviews={reviews} />
    </div>
  );
};

const ProductInfoDetail = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <div>
        <h3 className="text-xl font-bold mb-2">
          The advantages of {product.title}
        </h3>
        <div className="w-7 h-[2px] bg-primary" />
      </div>

      <p className="text-gray-800 mb-6">{product.description}</p>
    </div>
  );
};

export default SectionProductInfo;
