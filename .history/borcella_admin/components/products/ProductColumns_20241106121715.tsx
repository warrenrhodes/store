"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { ProductType } from "@/lib/types";
import Image from "next/image";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "media",
    header: "Media",
    cell: ({ row }) => {
      return (
        <div className="h-[120px] relative w-[120px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${row.original.media[0].url}`}
            alt="media"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 120px) 100vw, (max-width: 120px) 50vw, 33vw"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) =>
      row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price (FCFA)",
  },
  {
    accessorKey: "expense",
    header: "Expense (FCFA)",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/products/${row.original._id}`, {
          method: "DELETE",
        });
        return res.ok;
      };
      return <Delete item="products" handleDelete={onDelete} />;
    },
  },
];
