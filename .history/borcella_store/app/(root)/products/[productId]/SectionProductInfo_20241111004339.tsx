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
    <div className="grid gap-16 lg:grid-cols-2">
      <ProductInfoDetail product={product} />
      <ProductInfoTab description={product.description} reviews={reviews} />
    </div>
  );
};

const ProductInfoDetail = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        The advantages of {product.title}
      </h3>
      <p className="text-gray-800 mb-6">{product.description}</p>
    </div>
  );
};

export default SectionProductInfo;
