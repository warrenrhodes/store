import type { FC } from "react";

import ProductInfoTab from "./ProductInfoTab";
import Ratings from "./Ratings";

interface SectionProductInfoProps {
  overview: string;
  note?: string;
  shipment_details: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
  ratings: number;
  reviews: number;
}

const SectionProductInfo: FC<SectionProductInfoProps> = ({
  overview,
  shipment_details,
  ratings,
  reviews,
  note,
}) => {
  return (
    <div className="grid gap-16 lg:grid-cols-2">
      <ProductInfoTab
        overview={overview}
        shipment_details={shipment_details}
        note={note}
      />
      <Ratings rating={ratings} reviews={reviews} />
    </div>
  );
};

export default SectionProductInfo;
