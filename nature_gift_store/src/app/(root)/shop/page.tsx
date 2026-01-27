import { ShoppingWrapper } from '@/components/Shop/ShoppingWrapper'
import { getAllCollectionCache } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Category, Product, ProductStatus } from '@/lib/firebase/models'
import { getPrice } from '@/lib/utils/utils'
import { QueryFilter } from '@spreeloop/database'

interface ProductDescription {
  content: string
}

export default async function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const categoriesData = await getAllCollectionCache<Category>({
    collection: CollectionsName.Categories,
  })

  // Fetch all published products (cached)
  const allProducts = (await getAllCollectionCache<Product>({
    collection: CollectionsName.Products,
    filters: [
      new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      new QueryFilter('visibility', '==', true),
    ],
  })) || []

  // --- Server-Side Filtering ---
  let filteredProducts = [...allProducts]

  // 1. Search Filter
  const search = searchParams.search as string
  if (search) {
    const searchTerm = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        (product.description as ProductDescription).content.toLowerCase().includes(searchTerm)
    )
  }

  // 2. Category Filter
  const categoryParam = searchParams.category
  if (categoryParam) {
    const categories = Array.isArray(categoryParam) ? categoryParam : [categoryParam]
    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.categories.some((cat) => categories.includes(cat))
      )
    }
  }

  // 3. Price Filter
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : 0
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : 1000000

  filteredProducts = filteredProducts.filter(
    (product) => getPrice(product) >= minPrice && getPrice(product) <= maxPrice
  )

  // 4. Tags Filter
  const tagsParam = searchParams.tags
  if (tagsParam) {
    const tags = Array.isArray(tagsParam) ? tagsParam : [tagsParam]
    if (tags.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.tags?.some((tag) => tags.includes(tag))
      )
    }
  }

  // 5. Sorting
  const sortBy = (searchParams.sort as string) || 'newest'
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return getPrice(a) - getPrice(b)
      case 'price-desc':
        return getPrice(b) - getPrice(a)
      case 'newest':
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
      default:
        return 0
    }
  })

  return <ShoppingWrapper productList={filteredProducts} categories={categoriesData || []} />
}
