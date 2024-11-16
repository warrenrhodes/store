"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
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
        const itemType = item === "product" ? "products" : "collections";
        const res = await fetch(`/api/${itemType}/${id}`, {
          method: "DELETE",
        });
      };
      return (
        <Delete
          item="collection"
          id={row.original._id}
          handleDelete={onDelete}
        />
      );
    },
  },
];
