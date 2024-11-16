import { pathOr } from "ramda";

import SectionMoreProducts from "./SectionMoreProducts";
import SectionProductHeader from "./SectionProductHeader";
import SectionProductInfo from "./SectionProductInfo";
import { getProductDetails } from "@/lib/actions/actions";

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const SingleProductPage = async (props: Props) => {
  const selectedProduct = await getProductDetails(props.params.productId);

  return (
    <div className="container">
      <div className="mb-20">
        <SectionProductHeader
          media={pathOr([], ["media"], selectedProduct)}
          title={pathOr("", ["title"], selectedProduct)}
          expense={pathOr(0, ["expense"], selectedProduct)}
          price={pathOr(0, ["price"], selectedProduct)}
          sizes={pathOr([], ["sizes"], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionProductInfo
          overview={pathOr("", ["overview"], selectedProduct)}
          shipment_details={pathOr([], ["shipment_details"], selectedProduct)}
          ratings={pathOr(0, ["rating"], selectedProduct)}
          reviews={pathOr(0, ["reviews"], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionMoreProducts />
      </div>
    </div>
  );
};

export default SingleProductPage;
