"use client";
import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";
import { MediaType, ProductType, StoredProductDescription } from "@/lib/types";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
            <DescriptionDetail description={element} key={element.id} />
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

const DescriptionDetail = ({
  description,
}: {
  description: StoredProductDescription;
}) => {
  return (
    <div key={description.id} className="mb-4">
      {description.type === "text" && (
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl"
          dangerouslySetInnerHTML={{
            __html: description.content as string,
          }}
        />
      )}
      {description.type === "image" &&
        description.mediaIds &&
        description.mediaIds.map((mediaId) => (
          <DescriptionMedia key={mediaId} mediaId={mediaId} />
        ))}
      {/* {element.type === "video" && (
    <video controls className="max-w-full h-auto rounded">
      <source src={element.content} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )} */}
    </div>
  );
};

const DescriptionMedia = ({ mediaId }: { mediaId: string }) => {
  const [media, setMedia] = useState<MediaType | null>();

  const fetchImage = useCallback(async () => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${mediaId}`
    );
    if (result.ok) {
      const data = await result.json();
      setMedia(data);
    }
  }, []);

  useEffect(() => {
    fetchImage();
  });

  return (
    media && (
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${mediaId}`}
        width={500}
        height={500}
        alt="product"
        className="max-w-full h-auto rounded"
      />
    )
  );
};

export const dynamic = "force-dynamic";

export default ProductDetails;
