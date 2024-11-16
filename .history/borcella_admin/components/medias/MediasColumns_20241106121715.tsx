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
      <div className="h-[120px] relative w-[120px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${row.original.url}`}
          alt="media"
          fill
          style={{ objectFit: "fill" }}
          sizes="(max-width: 120px) 100vw, (max-width: 120px) 50vw, 33vw"
        />
      </div>
    ),
  },
  {
    accessorKey: "fileName",
    header: "File Name",
    cell: ({ row }) => <p>{row.original.fileName}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <p>{row.original.createdAt}</p>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/media/${row.original._id}`, {
          method: "DELETE",
        });
        return res.ok;
      };
      return <Delete item="medias" handleDelete={onDelete} />;
    },
  },
];
