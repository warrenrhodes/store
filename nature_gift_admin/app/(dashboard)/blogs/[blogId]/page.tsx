import { BlogForm } from "@/components/blogs/BlogForm";
import { getBlogPostById, getCategories } from "@/lib/actions/actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: { blogId: string };
}) {
  const [blogPost, categories] = await Promise.all([
    getBlogPostById(params.blogId),
    getCategories(),
  ]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground">Make changes to your blog post</p>
      </div>
      <BlogForm initialData={blogPost} categories={categories} />
    </div>
  );
}

export const dynamic = "force-dynamic";
