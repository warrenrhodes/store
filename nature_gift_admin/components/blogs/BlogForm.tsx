"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { blogSchema, BlogSchemaType } from "@/lib/validations/blog";
import { generateSlug } from "@/lib/utils/slugify";
import { IBlog } from "@/lib/models/Blog";
import CustomRichTextEditor from "../accordion/CustomRichText";
import { ICategory } from "@/lib/models/Category";
import MultiSelect from "../custom-ui/MultiSelect";
import { useToast } from "@/hooks/use-toast";
import { FileTargetType } from "../custom-ui/FileUploader";
import { FileUploader } from "../custom-ui/FileUploader";
import { FileType } from "../accordion/CustomAccordionItem";

interface BlogFormProps {
  initialData?: IBlog;
  categories: ICategory[];
}

export function BlogForm({ initialData, categories }: BlogFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          categories: initialData.categories.map((category) => category._id),
          metadata: {
            ...initialData.metadata,
            coverImage: initialData.metadata.coverImage?._id,
          },
        }
      : {
          title: "",
          slug: "",
          content: {
            type: "HTML",
            content: "",
            excerpt: "",
          },
          publishedAt: new Date(),
          metadata: {
            title: "",
            keywords: [],
            author: {
              name: "",
            },
            featured: false,
          },
          categories: [],
          tags: [],
          status: "DRAFT",
          layout: "DEFAULT",
          comments: true,
        },
  });

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);
    form.setValue("slug", generateSlug(title));
    form.setValue("metadata.title", title);
  };

  async function onSubmit(data: BlogSchemaType) {
    setIsLoading(true);

    try {
      const url = initialData
        ? `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/blogs/${initialData._id}`
        : `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/blogs`;

      const res = await fetch(url, {
        method: initialData ? "PATCH" : "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        toast({
          variant: "success",
          description: `Blogs ${initialData ? "updated" : "created"}`,
        });
        window.location.href = "/blogs";
        router.push("/blogs");
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong! Please try again.",
        });
        console.log(res.body);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={onTitleChange}
                    onKeyPress={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} disabled onKeyPress={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content.excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content.content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <CustomRichTextEditor
                  content={field.value}
                  onSave={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metadata.coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <FileUploader
                    mediaIds={field.value ? [field.value] : []}
                    setContent={(value: string[]) => field.onChange(value[0])}
                    fileType={FileType.IMAGE}
                    maxFiles={1}
                    targetType={FileTargetType.PRODUCT}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Select categories"
                  selectedValues={(field.value || []).map((value) => {
                    return {
                      value,
                      label: categories.find((category) => {
                        return category._id === value;
                      })?.name as string,
                    };
                  })}
                  values={categories.map((category) => {
                    return {
                      value: category._id,
                      label: category.name,
                    };
                  })}
                  onChange={(values) =>
                    field.onChange([...values.map((value) => value.value)])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metadata.keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value?.join(", ") || ""}
                  onKeyDown={handleKeyPress}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((keyword) => keyword.trim())
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-3 items-end">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="layout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Layout</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DEFAULT">Default</SelectItem>
                    <SelectItem value="FEATURED">Featured</SelectItem>
                    <SelectItem value="MINIMAL">Minimal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Publish Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="metadata.featured"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Featured Post</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Enable Comments</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button
            disabled={isLoading}
            onClick={() => onSubmit(form.getValues())}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            {initialData ? "Update" : "Create"} Blog Post
          </Button>

          {initialData && (
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                try {
                  await fetch(`/api/blogs/${initialData.id}`, {
                    method: "DELETE",
                  });
                  router.refresh();
                  router.push("/blogs");
                } catch (error) {
                  console.error(error);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Blog Post
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
