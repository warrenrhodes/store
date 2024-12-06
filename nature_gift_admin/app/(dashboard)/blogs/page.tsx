import { BlogList } from "@/components/blogs/BlogList";

async function getBlogs() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/blogs`
  );
  if (!response.ok) {
    console.error("Failed to fetch blogs");
    return [];
  }
  const blogs = await response.json();
  return blogs;
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  return (
    <div className="container py-10">
      <BlogList blogs={blogs} />
    </div>
  );
}

export const dynamic = "force-dynamic";
