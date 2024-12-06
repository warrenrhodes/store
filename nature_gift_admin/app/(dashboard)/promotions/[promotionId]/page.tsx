import { PromotionFormV2 } from "@/components/promotions/PromotionsFormV2";
import { getProducts } from "@/lib/actions/actions";
import { notFound } from "next/navigation";

async function getPromotion(promotionId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/promotions/${promotionId}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function EditPromotionPage({
  params,
}: {
  params: { promotionId: string };
}) {
  const [promotion, products] = await Promise.all([
    getPromotion(params.promotionId),
    getProducts(),
  ]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Promotion</h1>
        <p className="text-muted-foreground">Make changes to your promotion</p>
      </div>
      <PromotionFormV2 initialData={promotion} products={products} />
    </div>
  );
}

export const dynamic = "force-dynamic";
