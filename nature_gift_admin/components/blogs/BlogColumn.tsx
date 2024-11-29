import { IBlog } from "@/lib/models/Blog";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { ArrowUpDown, Copy, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Delete from "../custom-ui/Delete";
import { Toggle } from "../ui/toggle";

export const blogsColumns: ColumnDef<IBlog>[] = [
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
    cell: ({ row }) => (
      <span className="font-mono leading-none">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => (
      <span>{row.original.categories.map((cat) => cat.name).join(", ")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <Badge
            className={cn({
              "bg-blue-500": row.original.status === "DRAFT",
              "bg-red-500": row.original.status === "ARCHIVED",
              "bg-green-500": row.original.status === "PUBLISHED",
            })}
          >
            {row.original.status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "publishedAt",
    header: "Published At",
    cell: ({ row }) =>
      row.original.publishedAt ? (
        <span>
          {new Date(row.original.publishedAt).toLocaleDateString("en-US")}
        </span>
      ) : (
        <span>Not Published</span>
      ),
  },
  {
    accessorKey: "readingTime",
    header: "Reading Time (min)",
    cell: ({ row }) => (
      <span>{row.original.metadata.readingTime || "N/A"}</span>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const blogs = row.original;
      const onDelete = async (): Promise<boolean> => {
        const res = await fetch(`/api/blogs/${blogs._id}`, {
          method: "DELETE",
        });
        return res.ok;
      };

      return (
        <div>
          <Toggle
            aria-label="Toggle bold"
            onClick={async () => {
              await navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${blogs.slug}`
              );
            }}
          >
            <Copy className="h-4 w-4" /> Copy
          </Toggle>
          <Link href={`/blogs/${blogs._id}`}>
            <Toggle aria-label="Toggle bold">
              <Edit className="w-4 h-4" />
              Edit
            </Toggle>
          </Link>
          <Toggle aria-label="Toggle bold">
            <Delete item="blogs" handleDelete={onDelete} />
            Delete
          </Toggle>
        </div>
      );
    },
  },
];
