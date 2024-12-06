import { IBlog } from "@/lib/models/Blog";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { ArrowUpDown, Copy, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Delete from "../custom-ui/Delete";
import { Toggle } from "../ui/toggle";
import { toast } from "@/hooks/use-toast";

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

      const copyLink = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({ description: "Link copied to clipboard!" });
      };

      return (
        <div className="flex flex-col items-center gap-2 w-full">
          <Button
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() =>
              copyLink(
                `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/blogs/${blogs.slug}`
              )
            }
          >
            Copy link
            <Copy className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/blogs/${blogs._id}`}>
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <Delete item="blogs" handleDelete={onDelete} />
          </Button>
        </div>
      );
    },
  },
];
