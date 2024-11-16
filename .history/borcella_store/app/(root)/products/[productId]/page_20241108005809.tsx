import { pathOr } from "ramda";

import SectionProductHeader from "./SectionProductHeader";
import SectionProductInfo from "./SectionProductInfo";
import { getProductDetails } from "@/lib/actions/actions";
import SectionMoreRelatedProducts from "./SectionMoreRelatedProducts";
import { Spacer } from "@/shared/Spacer";
import { Calendar, LucideIcon, Package, Percent, Truck } from "lucide-react";
const shipment_details: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: <Percent className="text-xl text-secondary" />,
    title: "Discount",
    description: "> $100 Disc 10%",
  },
  {
    icon: <Calendar className="text-xl text-secondary" />,
    title: "Delivery Time",
    description: "......",
  },
  {
    icon: <Package className="text-xl text-secondary" />,
    title: "Package",
    description: "Reagular Premium Box",
  },
  {
    icon: <Truck className="text-xl text-secondary" />,
    title: "Estimated Arrival",
    description: "......",
  },
];
type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const SingleProductPage = async (props: Props) => {
  const selectedProduct = await getProductDetails(props.params.productId);

  return (
    <div className="container">
      <Spacer size="lg" />
      <div className="mb-20">
        <SectionProductHeader
          media={pathOr([], ["media"], selectedProduct)}
          title={pathOr("", ["title"], selectedProduct)}
          expense={pathOr(0, ["expense"], selectedProduct)}
          price={pathOr(0, ["price"], selectedProduct)}
          sizes={pathOr([], ["sizes"], selectedProduct)}
          ratings={pathOr(4.8, ["rating"], selectedProduct)}
          reviews={pathOr(56, ["reviews"], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionProductInfo
          overview={pathOr("", ["overview"], selectedProduct)}
          shipment_details={pathOr(
            shipment_details,
            ["shipment_details"],
            selectedProduct
          )}
          ratings={pathOr(4.8, ["rating"], selectedProduct)}
          reviews={pathOr(56, ["reviews"], selectedProduct)}
          note={pathOr(
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!",
            ["notes"],
            selectedProduct
          )}
        />
      </div>

      <div className="mb-28">
        <SectionMoreRelatedProducts productId={props.params.productId} />
      </div>
    </div>
  );
};

export default SingleProductPage;
