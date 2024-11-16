"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import { MediaType } from "@/lib/types";
import Image from "next/image";

export const mediColumns: ColumnDef<MediaType>[] = [
  {
    accessorKey: "url",
    header: "Media",
    cell: ({ row }) => (
      <Image src={row.original.url} alt="media" width={100} height={100} />
    ),
  },
  {
    accessorKey: "title",
    header: "File Name",
    cell: ({ row }) => <p>{row.original.filename}</p>,
  },

  {
    id: "actions",
    cell: ({ row }) => <Delete item="media" id={row.original._id} />,
  },
];
