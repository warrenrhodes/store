import { ReviewList } from "@/components/reviews/ReviewList";

async function getReviews() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews`
  );
  if (!response.ok) {
    console.error("Failed to fetch reviews");
    return [];
  }
  const reviews = await response.json();
  return reviews;
}

export default async function ReviewsPage() {
  const reviews = await getReviews();
  return (
    <div className="container py-10">
      <ReviewList reviews={reviews} />
    </div>
  );
}

export const dynamic = "force-dynamic";
