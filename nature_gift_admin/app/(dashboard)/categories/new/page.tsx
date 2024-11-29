import { CategoryForm } from "@/components/categories/CategoryForm";
import { getCategories } from "@/lib/actions/actions";

export default async function NewCategoryPage() {
  const categories = await getCategories();
  console.log("categories", categories);
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Category</h1>
        <p className="text-muted-foreground">Add a new product category</p>
      </div>
      <CategoryForm categories={categories} />
    </div>
  );
}

export const dynamic = "force-dynamic";