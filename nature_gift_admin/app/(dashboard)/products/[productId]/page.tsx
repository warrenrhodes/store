import { ProductFormV2 } from "@/components/products/ProductFormV2";
import { notFound } from "next/navigation";
async function getProduct(productId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`
  );

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

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

export default async function EditProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const [product, categories] = await Promise.all([
    getProduct(params.productId),
    getCategories(),
  ]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground">Make changes to your product</p>
      </div>
      <ProductFormV2 initialData={product} categories={categories} />
    </div>
  );
}

export const dynamic = "force-dynamic";
