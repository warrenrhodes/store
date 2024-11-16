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
      <ProductInfoTab description={product.description} reviews={reviews} />
    </div>
  );
};

export default SectionProductInfo;
