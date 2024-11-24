import { CategoryList } from "@/components/categories/CategoryList";

async function getCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`
  );
  if (!response.ok) {
    console.error("Failed to fetch categories");
    return [];
  }
  const categories = await response.json();
  return categories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="container py-10">
      <CategoryList categories={categories} />
    </div>
  );
}

export const dynamic = "force-dynamic";
