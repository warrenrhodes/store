import ProductCard from "@/components/ProductCard";
import Heading from "@/shared/Heading/Heading";
import { getRelatedProducts } from "@/lib/actions/actions";

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
              <ProductCard
                key={product.title}
                product={product}
                className="border-neutral-300"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionMoreRelatedProducts;
