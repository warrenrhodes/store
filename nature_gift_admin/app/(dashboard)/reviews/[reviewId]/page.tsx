import ReviewForm from "@/components/reviews/ReviewFrom";
import { getProducts } from "@/lib/actions/actions";
import { notFound } from "next/navigation";

async function getReview(reviewId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/reviews/${reviewId}`
  );

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function EditReviewPage({
  params,
}: {
  params: { reviewId: string };
}) {
  const [review, products] = await Promise.all([
    getReview(params.reviewId),
    getProducts(),
  ]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Review</h1>
        <p className="text-muted-foreground">Make changes to your review</p>
      </div>
      <ReviewForm initialData={review} products={products} />
    </div>
  );
}

export const dynamic = "force-dynamic";
