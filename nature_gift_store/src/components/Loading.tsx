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
export {
  HeroLoading,
  CategoryLoading,
  ProductsLoading,
  PromotionLoading,
  BlogsLoading,
  ProductInfoLoading,
}
