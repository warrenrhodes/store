import { PromotionsList } from "@/components/promotions/PromotionsList";

async function getPromotions() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/promotions`
  );
  if (!response.ok) {
    console.error("Failed to fetch promotions");
    return [];
  }
  const promotions = await response.json();
  return promotions;
}

export default async function PromotionsPage() {
  const promotions = await getPromotions();
  return (
    <div className="container py-10">
      <PromotionsList promotions={promotions} />
    </div>
  );
}

export const dynamic = "force-dynamic";
