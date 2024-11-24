"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import Image from "next/image";
import { IMedia } from "@/lib/models/Media";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, Link, MoreHorizontal } from "lucide-react";
export const mediColumns: ColumnDef<IMedia>[] = [
  {
    accessorKey: "url",
    header: "Media",
    cell: ({ row }) => (
      <div className="h-[120px] relative w-[120px]">
        <Image
          src={`${row.original.url}`}
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const media = row.original;
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/reviews/${row.original._id}`, {
          method: "DELETE",
        });
        return res.ok;
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/media/${media._id}`}>
                <div className="flex gap-3 items-center">
                  <Edit className="w-4 h-4" />
                  Edit
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Delete item="medias" handleDelete={onDelete} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
