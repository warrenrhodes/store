import { pathOr } from "ramda";

import SectionProductHeader from "./SectionProductHeader";
import SectionProductInfo from "./SectionProductInfo";
import { getProductDetails, getReviewByProductId } from "@/lib/actions/actions";
import SectionMoreRelatedProducts from "./SectionMoreRelatedProducts";
import { Spacer } from "@/shared/Spacer";

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const SingleProductPage = async (props: Props) => {
  const selectedProduct = await getProductDetails(props.params.productId);
  const reviews = await getReviewByProductId(props.params.productId);

  // const promotions = (await getPromotions())?.filter(
  //   (e) => e.product._id === props.params.productId && e.isActive
  // );

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
          promotions={[]}
          reviews={[]}
          product={selectedProduct}
        />
      </div>

      <div className="mb-28">
        <SectionProductInfo
          description={pathOr("", ["description"], selectedProduct)}
          shipment_details={pathOr([], ["shipment_details"], selectedProduct)}
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
