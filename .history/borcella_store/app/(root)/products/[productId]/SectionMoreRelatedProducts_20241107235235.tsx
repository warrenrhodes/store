import Heading from "@/shared/Heading/Heading";
import { getRelatedProducts } from "@/lib/actions/actions";
import ProductCardV2 from "@/components/ProductCartV2";

const SectionMoreRelatedProducts = async ({
  productId,
}: {
  productId: string;
}) => {
  const relatedProducts = await getRelatedProducts(productId);
  return (
    <div>
      {relatedProducts && (
        <div>
          <Heading className="mb-0">Explore more products</Heading>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.slice(0, 8).map((product) => (
              <ProductCardV2
                key={product.title}
                product={product}
                className="border-neutral-300"
                showPrevPrice={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionMoreRelatedProducts;
