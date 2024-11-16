import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";
import { ProductType } from "@/lib/types";
import Image from "next/image";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductDetails(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  console.log("product.longDescription", productDetails);

  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />
      </div>
      {productDetails?.longDescription && (
        <div className="mb-4">
          <div>
            <p className="text-heading3-bold">Description</p>
          </div>
          {productDetails.longDescription.map((element, index) => (
            <div key={index} className="mb-4">
              {element.type === "text" && (
                <div
                  className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl"
                  dangerouslySetInnerHTML={{
                    __html: element.content as string,
                  }}
                />
              )}
              {/* {element.type === "image" && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}${
                    (element.mediaIds || [])[0] as string
                  }`}
                  width={500}
                  height={500}
                  alt="product"
                  className="max-w-full h-auto rounded"
                />
              )} */}
              {/* {element.type === "video" && (
                <video controls className="max-w-full h-auto rounded">
                  <source src={element.content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )} */}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="text-heading3-bold">Related Products</p>
        <div className="flex flex-wrap gap-16 mx-auto mt-8">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default ProductDetails;
