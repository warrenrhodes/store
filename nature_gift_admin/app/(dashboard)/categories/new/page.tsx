import { CategoryForm } from "@/components/categories/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Category</h1>
        <p className="text-muted-foreground">Add a new product category</p>
      </div>
      <CategoryForm />
    </div>
  );
}
