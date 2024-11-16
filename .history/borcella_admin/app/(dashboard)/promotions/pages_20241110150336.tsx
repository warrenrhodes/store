"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckSquare, Plus, Square } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/custom ui/Loader";
import { PromotionType } from "@/lib/types";
import Delete from "@/components/custom ui/Delete";

const Promotions = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  const getPromotions = async () => {
    try {
      const res = await fetch("/api/promotions", {
        method: "GET",
      });
      const data = await res.json();
      setPromotions(data);
      setLoading(false);
    } catch (err) {
      console.log("[promotions_GET]", err);
    }
  };

  useEffect(() => {
    getPromotions();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Promotions</p>
        <Button
          className=" text-white"
          onClick={() => router.push("/promotions/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Promotion
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable
        columns={promotionsColumns}
        data={promotions}
        searchKey="title"
      />
    </div>
  );
};

export const promotionsColumns: ColumnDef<PromotionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/promotions/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.promotionName}
      </Link>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Is Enable",
    cell: ({ row }) =>
      row.original.isActive ? (
        <CheckSquare size={20} className="text-green-500" />
      ) : (
        <Square className="text-red-500" size={20} />
      ),
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <p>{row.original.product.title}</p>,
  },
  {
    accessorKey: "discountValue",
    header: "Discount Value",
    cell: ({ row }) => <p>{row.original.discountValue}</p>,
  },
  {
    accessorKey: "minProductsToApply",
    header: "Min Products To Apply",
    cell: ({ row }) => <p>{row.original.minProductsToApply}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/promotions/${row.original._id}`, {
          method: "DELETE",
        });
        return res.ok;
      };
      return <Delete item="promotions" handleDelete={onDelete} />;
    },
  },
];

export default Promotions;
