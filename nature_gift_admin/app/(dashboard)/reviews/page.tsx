import { ReviewList } from '@/components/reviews/ReviewList'
import { getReviewsCache } from '@/lib/actions/server'

export default async function ReviewsPage() {
  const reviews = await getReviewsCache()
  return (
    <div className="container py-10">
      <ReviewList reviews={reviews} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
