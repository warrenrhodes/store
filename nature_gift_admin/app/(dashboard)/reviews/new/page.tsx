import ReviewForm from '@/components/reviews/ReviewFrom'
import { getProductsCache } from '@/lib/actions/server'

export default async function NewReviewPage() {
  const [products] = await Promise.all([getProductsCache()])
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Create New Review</h1>
        <p className="text-muted-foreground">Add a new review to your store</p>
      </div>
      <ReviewForm products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
