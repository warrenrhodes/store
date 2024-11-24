"use client";

import Link from "next/link";
import { Edit, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { PromotionSchemaType } from "@/lib/validations/promotions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Delete from "../custom-ui/Delete";
import { IPromotion } from "@/lib/models/Promotions";
import { cn } from "@/lib/utils";

export const promotionsColumns: ColumnDef<IPromotion>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <div className="font-mono leading-none">{row.original.code}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.name}</div>
        {row.original.description && (
          <div className="text-sm text-muted-foreground truncate max-w-[300px]">
            {row.original.description}
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "period",
    header: "Period",
    cell: ({ row }) => (
      <div className="text-sm">
        <div>{format(new Date(row.original.startDate), "PP")}</div>
        <div className="text-muted-foreground">
          to {format(new Date(row.original.endDate), "PP")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div>
          <Badge
            className={cn({
              "bg-green-500": row.original.status !== "ACTIVE",
              "bg-blue-500": row.original.status === "DRAFT",
              "bg-red-500": row.original.status === "EXPIRED",
              "bg-gray-500": row.original.status === "DISABLED",
            })}
          >
            {row.original.status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.priority}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const promotions = row.original;
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/promotions/${promotions._id}`, {
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
              <Link href={`/promotions/${promotions._id}`}>
                <div className="flex gap-3 items-center">
                  <Edit className="w-4 h-4" />
                  Edit
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Delete item="promotions" handleDelete={onDelete} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
