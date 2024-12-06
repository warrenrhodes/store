import { ProductFormV2 } from "@/components/products/ProductFormV2";

async function getCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/categories`
  );
  if (!response.ok) {
    console.error("Failed to fetch categories");
    return [];
  }
  const categories = await response.json();
  return categories;
}

export default async function NewProductPage() {
  const [categories] = await Promise.all([getCategories()]);
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Product</h1>
        <p className="text-muted-foreground">Add a new product to your store</p>
      </div>
      <ProductFormV2 categories={categories} />
    </div>
  );
}

export const dynamic = "force-dynamic";
