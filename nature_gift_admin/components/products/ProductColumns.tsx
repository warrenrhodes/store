"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/lib/models/Product";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpDown, Edit, MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const productColumns: ColumnDef<IProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <Badge
          className={cn({
            "bg-green-500 ": row.original.status === "published",
            "bg-gray-500": row.original.status === "draft",
            "bg-red-500": row.original.status === "archived",
          })}
        >
          {row.original.status}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => (
      <div>
        <Badge
          className={cn({
            "bg-blue-500 ": row.original.visibility === true,
            "bg-red-500": row.original.visibility !== false,
          })}
        >
          {row.original.visibility ? "Visible" : "Hidden"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price (FCFA)",
    cell: ({ row }) => <div>{row.original.price.regular.toFixed(2)}</div>,
  },
  {
    accessorKey: "inventory",
    header: "Inventory",
    cell: ({ row }) => (
      <div>
        {row.original.inventory.quantity}
        {row.original.inventory.quantity <=
          row.original.inventory.lowStockThreshold && (
          <Badge variant="destructive" className="ml-2">
            Low Stock
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/products/${product._id}`, {
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
              <Link href={`/products/${product._id}`}>
                <div className="flex gap-3 items-center">
                  <Edit className="w-4 h-4" />
                  Edit
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Delete item="products" handleDelete={onDelete} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
