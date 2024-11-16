"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { CollectionType, MediaType } from "@/lib/types";

export const mediColumns: ColumnDef<MediaType>[] = [
  {
    accessorKey: "products",
    header: "Medias",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    accessorKey: "title",
    header: "File Name",
    cell: ({ row }) => (
      <Link href={`/media/${row.original._id}`} className="hover:text-red-1">
        {row.original.filename}
      </Link>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <Delete item="media" id={row.original._id} />,
  },
];
