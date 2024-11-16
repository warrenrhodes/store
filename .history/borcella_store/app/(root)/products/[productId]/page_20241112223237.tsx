import { pathOr } from "ramda";

import SectionProductHeader from "./SectionProductHeader";
import SectionProductInfo from "./SectionProductInfo";
import {
  getProductDetails,
  getPromotions,
  getRelatedProducts,
  getReviewByProductId,
} from "@/lib/actions/actions";
import { Spacer } from "@/shared/Spacer";
import SectionMoreRelatedProducts from "./SectionMoreRelatedProducts";

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const SingleProductPage = async (props: Props) => {
  const selectedProduct = await getProductDetails(props.params.productId);
  const reviews = await getReviewByProductId(props.params.productId);
  const relatedProducts = await getRelatedProducts(props.params.productId);
  const promotions = (await getPromotions())?.filter(
    (e) => e.product._id === props.params.productId && e.isActive
  );
  console.log(relatedProducts);
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
          promotions={promotions || []}
          reviews={reviews || []}
          product={selectedProduct}
        />
      </div>

      <div className="mb-28">
        <SectionProductInfo product={selectedProduct} reviews={reviews || []} />
      </div>

      <div className="mb-28">
        <SectionMoreRelatedProducts
          relatedProducts={relatedProducts || []}
          reviews={reviews || []}
        />
      </div>
      {/* <div className="mb-28">
        <ProductCTA />
      </div> */}
    </div>
  );
};

export default SingleProductPage;
