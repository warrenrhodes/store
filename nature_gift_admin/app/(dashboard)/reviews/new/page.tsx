import ReviewForm from "@/components/reviews/ReviewFrom";
import { getProducts } from "@/lib/actions/actions";



export default async function NewReviewPage() {
  const [products] = await Promise.all([getProducts()]);
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Review</h1>
        <p className="text-muted-foreground">Add a new review to your store</p>
      </div>
      <ReviewForm products={products} />
    </div>
  );
}

export const dynamic = "force-dynamic";
