import { ProductList } from "@/components/products/ProductList";

async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/products`
  );
  if (!response.ok) {
    console.error("Failed to fetch products");
    return [];
  }
  const products = await response.json();
  return products;
}
export default async function Products() {
  const products = await getProducts();

  return (
    <div className="px-10 py-5">
      <ProductList products={products} />
    </div>
  );
}

export const dynamic = "force-dynamic";
