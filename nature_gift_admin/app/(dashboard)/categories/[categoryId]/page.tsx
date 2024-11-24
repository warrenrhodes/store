import { CategoryForm } from "@/components/categories/CategoryForm";
import { notFound } from "next/navigation";

async function getCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`
  );
  if (!response.ok) {
    notFound();
  }
  const categories = await response.json();
  return categories;
}
async function getCategory(categoryId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/${categoryId}`
  );

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function EditCategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const [category, categories] = await Promise.all([
    getCategory(params.categoryId),
    getCategories(),
  ]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Category</h1>
        <p className="text-muted-foreground">Make changes to your category</p>
      </div>
      <CategoryForm initialData={category} categories={categories} />
    </div>
  );
}

export const dynamic = "force-dynamic";
