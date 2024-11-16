import type { FC } from "react";

import ProductInfoTab from "./ProductInfoTab";

interface SectionProductInfoProps {
  description: string;
  note?: string;
  shipment_details: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
}

const SectionProductInfo: FC<SectionProductInfoProps> = ({
  description,
  shipment_details,
  note,
}) => {
  return (
    <div className="grid gap-16 lg:grid-cols-2">
      <ProductInfoTab
        description={description}
        shipment_details={shipment_details}
        note={note}
      />
    </div>
  );
};

export default SectionProductInfo;
