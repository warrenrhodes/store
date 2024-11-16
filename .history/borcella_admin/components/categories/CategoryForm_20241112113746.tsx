"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
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
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import { CategoryType } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  shortDescription: z.string().optional().nullable(),
  media: z.string(),
  parent: z.string().optional().nullable(),
});

interface CategoryFormProps {
  initialData?: CategoryType | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("[categories_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          shortDescription: initialData.shortDescription || null,
          media: initialData.media ? initialData.media._id : "",
          parent: initialData.parent ? initialData.parent._id : null,
        }
      : {
          title: "",
          shortDescription: null,
          media: "",
          parent: null,
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/categories/${initialData._id}`
        : "/api/categories";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Category ${initialData ? "updated" : "created"}`);
        window.location.href = "/categories";
        router.push("/categories");
      }
    } catch (err) {
      console.log("[categories_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const onDelete = async (categoryId: string): Promise<boolean> => {
    const res = await fetch(`/api/categories/${categoryId}`, {
      method: "DELETE",
    });
    return res.ok;
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Category</p>
          <Delete
            handleDelete={() => onDelete(initialData._id)}
            item="categories"
          />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Category</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={500}
                    placeholder="Short Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Media</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {categories.length > 0 && (
            <FormField
              control={form.control}
              name="parent"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-3">
                  <FormLabel>Product</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex gap-10">
            <Button type="submit" className=" text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/categories")}
              className="bg-gray-50 text-black hover:bg-gray-100"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
