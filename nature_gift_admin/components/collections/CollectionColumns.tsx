"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import Link from "next/link";
import { CollectionType } from "@/lib/types";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/collections/${row.original._id}`, {
          method: "DELETE",
        });
        return res.ok;
      };
      return <Delete item="collections" handleDelete={onDelete} />;
    },
  },
];
