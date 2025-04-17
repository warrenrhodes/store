const CategoryLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-24 mx-auto px-4 sm:px-6 lg:px-8 ">
      {[...Array(3)].map((_, i) => (
        <div key={`skeleton-${i}`} className="bg-muted rounded-2xl aspect-[4/5] animate-pulse" />
      ))}
    </div>
  )
}

const HeroLoading = () => {
  return <div key={`skeleton-hero`} className="bg-muted animate-pulse h-[80vh] w-full" />
}

const PromotionLoading = () => {
  return <div key={`skeleton-hero`} className="bg-muted animate-pulse h-[50vh] w-full" />
}

const ProductsLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-24 mx-auto px-4 sm:px-6 lg:px-8 ">
      {[...Array(4)].map((_, i) => (
        <div key={`skeleton-${i}`} className="bg-muted rounded-2xl aspect-[4/5] animate-pulse" />
      ))}
    </div>
  )
}
const BlogsLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-24 mx-auto px-4 sm:px-6 lg:px-8 ">
      {[...Array(4)].map((_, i) => (
        <div key={`skeleton-${i}`} className="bg-muted rounded-2xl aspect-[4/5] animate-pulse" />
      ))}
    </div>
  )
}

const ProductInfoLoading = () => {
  return <div key={`skeleton-hero`} className="bg-muted animate-pulse h-[70vh] w-full" />
}

const BlogSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Blog header skeleton */}
      <div className="space-y-4">
        {/* Featured badge skeleton (random display) */}
        {Math.random() > 0.5 && (
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-32 mb-4 animate-pulse" />
        )}

        {/* Title skeleton */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />

        {/* Excerpt skeleton */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />

        {/* Cover image skeleton */}
        <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />

        {/* Metadata skeleton */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
          </div>
        </div>

        {/* Categories skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map(i => (
            <div
              key={`category-${i}`}
              className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"
            />
          ))}
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={`tag-${i}`} className="flex items-center text-sm">
              <div className="w-4 h-4 mr-1 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Blog content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
      </div>

      {/* Product footer skeleton - conditionally rendered */}
      {Math.random() > 0.5 && (
        <>
          <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          <div className="sticky bottom-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b shadow-sm p-4">
            {/* Countdown timer skeleton */}
            <div className="flex justify-between items-center mb-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
            </div>

            {/* Cart item skeleton */}
            <div className="flex justify-between items-center py-2">
              <div className="flex gap-2 items-center">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="h-px bg-gray-200 dark:bg-gray-700 w-full" />

      {/* Related blogs skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={`related-${i}`} className="space-y-2">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogSkeleton
export {
  HeroLoading,
  CategoryLoading,
  ProductsLoading,
  PromotionLoading,
  BlogsLoading,
  ProductInfoLoading,
  BlogSkeleton,
}
