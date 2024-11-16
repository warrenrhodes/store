import type { FC } from "react";

import ProductInfoTab from "./ProductInfoTab";
import Ratings from "./Ratings";
import { LucideIcon } from "lucide-react";

interface SectionProductInfoProps {
  overview: string;
  shipment_details: {
    icon: LucideIcon;
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
