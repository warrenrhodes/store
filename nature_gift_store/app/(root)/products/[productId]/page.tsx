import { pathOr } from "ramda";

import SectionProductHeader from "./SectionProductHeader";
import SectionProductInfo from "./SectionProductInfo";
import {
  getProductDetails,
  getRelatedProducts,
  getReviewByProductId,
} from "@/lib/actions/actions";
import { Spacer } from "@/shared/Spacer";
import SectionMoreRelatedProducts from "./SectionMoreRelatedProducts";
import ProductCTA from "./ProductCTA";
import GeneralCTAComponent from "@/components/Cta/GeneralCta";

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const SingleProductPage = async (props: Props) => {
  const selectedProduct = await getProductDetails(props.params.productId);
  const reviews = await getReviewByProductId(props.params.productId);
  const relatedProducts = await getRelatedProducts(props.params.productId);

  return !selectedProduct ? (
    <p>data not found</p>
  ) : (
    <div className="container">
      <Spacer size="lg" />
      <div className="p-4 overflow-y-auto">
        <SectionProductHeader
          media={pathOr([], ["media"], selectedProduct)}
          title={pathOr("", ["title"], selectedProduct)}
          expense={pathOr(0, ["expense"], selectedProduct)}
          price={pathOr(0, ["price"], selectedProduct)}
          sizes={pathOr([], ["sizes"], selectedProduct)}
          ratings={pathOr(4.8, ["rating"], selectedProduct)}
          description={pathOr("", ["description"], selectedProduct)}
          reviews={reviews || []}
          product={selectedProduct}
        />
      </div>

      <div className="mb-10">
        <SectionProductInfo product={selectedProduct} reviews={reviews || []} />
      </div>

      <div className="mb-10">
        <SectionMoreRelatedProducts relatedProducts={relatedProducts || []} />
      </div>
      <div className="mb-10">
        <ProductCTA product={selectedProduct} />
      </div>
      <div>
        <GeneralCTAComponent />
      </div>
    </div>
  );
};

export default SingleProductPage;
