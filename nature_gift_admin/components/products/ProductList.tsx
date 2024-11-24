"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DataTable } from "../custom-ui/DataTable";
import { productColumns } from "./ProductColumns";
import { IProduct } from "@/lib/models/Product";

interface ProductListProps {
  products: IProduct[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button asChild>
          <Link href="/products/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <DataTable columns={productColumns} data={products} searchKey="title" />
    </div>
  );
}
