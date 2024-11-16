import type { FC } from "react";

import ProductInfoTab from "./ProductInfoTab";
import { ProductType } from "@/lib/types";

interface SectionProductInfoProps {
  product: ProductType;
}

const SectionProductInfo: FC<SectionProductInfoProps> = ({ product }) => {
  return (
    <div className="grid gap-16 lg:grid-cols-2">
      <ProductInfoTab
        description={product.description}
        shipment_details={shipment_details}
      />
    </div>
  );
};

export default SectionProductInfo;
