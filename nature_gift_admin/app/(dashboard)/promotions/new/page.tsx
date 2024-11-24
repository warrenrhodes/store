import { PromotionFormV2 } from "@/components/promotions/PromotionsFormV2";
import { getProducts } from "@/lib/actions/actions";

export default async function NewPromotionPage() {
  const [products] = await Promise.all([getProducts()]);
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Promotion</h1>
        <p className="text-muted-foreground">
          Add a new promotion to your store
        </p>
      </div>
      <PromotionFormV2 products={products} />
    </div>
  );
}

export const dynamic = "force-dynamic";
