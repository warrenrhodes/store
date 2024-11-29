"use client";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "../custom-ui/DataTable";
import { IBlog } from "@/lib/models/Blog";
import { blogsColumns } from "./BlogColumn";

interface BlogListProps {
  blogs: IBlog[];
}

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <Button asChild>
          <Link href="/blogs/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Link>
        </Button>
      </div>
      <DataTable
        columns={blogsColumns}
        data={blogs}
        searchKey="title"
        filterButton={{
          label: "Status",
          columnKey: "status",
          values: ["PUBLISHED", "DRAFT", "ARCHIVED"],
        }}
      />
    </div>
  );
}
