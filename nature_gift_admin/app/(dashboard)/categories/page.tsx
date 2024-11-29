import { CategoryList } from "@/components/categories/CategoryList";
import { getCategories } from "@/lib/actions/actions";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="container py-10">
      <CategoryList categories={categories} />
    </div>
  );
}

export const dynamic = "force-dynamic";
