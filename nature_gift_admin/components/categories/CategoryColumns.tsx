"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { CategoryType } from "@/lib/types";

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/categories/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products?.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/categories/${row.original._id}`, {
          method: "DELETE",
        });
        return res.ok;
      };
      return <Delete item="categories" handleDelete={onDelete} />;
    },
  },
];
