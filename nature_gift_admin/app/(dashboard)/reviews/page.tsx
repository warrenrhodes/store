import { ReviewList } from '@/components/reviews/ReviewList'
import { getReviewsCache } from '@/lib/actions/server'

export default async function ReviewsPage() {
  const reviews = await getReviewsCache()
  return (
    <div className="mx-auto w-full max-w-6xl">
      <ReviewList reviews={reviews} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
