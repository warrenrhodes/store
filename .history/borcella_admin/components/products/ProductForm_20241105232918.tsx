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
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import { Loader } from "../custom ui/Loader";
import { CollectionType, ProductType } from "@/lib/types";
import ProductDescriptionBuilder from "../custom ui/RicheText";

const formSchema = z
  .object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    longDescription: z
      .object({
        id: z.number(),
        type: z.string(),
        content: z.string(),
        url: z.string().nullable(),
        fileName: z.string().nullable(),
      })
      .array()
      .optional(),
    media: z.string().array().nonempty(),
    category: z.string(),
    collections: z.array(z.string()),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    price: z.coerce.number().min(1),
    expense: z.coerce.number().min(1),
  })
  .refine((data) => data.expense > data.price, {
    message: "Expense must be greater than price",
    path: ["expense"],
  });

interface ProductFormProps {
  initialData?: ProductType | null; //Must have "?" to make it optional
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          collections: initialData.collections.map(
            (collection) => collection._id
          ),
        }
      : {
          title: "",
          description: "",
          longDescription: undefined,
          media: [],
          category: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 1,
          expense: 1,
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
    console.log("value sumitted", values);
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (err) {
      setLoading(false);
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const onDelete = async (productId: string): Promise<boolean> => {
    const res = await fetch(`/api/media/${productId}`, {
      method: "DELETE",
    });
    return res.ok;
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          <Delete
            handleDelete={() => onDelete(initialData._id)}
            item="products"
          />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
      )}
      <Separator className="bg-secondary mt-4 mb-7" />
      <Form {...form} className="flex flex-col gap-8">
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
              <FormMessage className="text-red-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  rows={5}
                  onKeyDown={handleKeyPress}
                />
              </FormControl>
              <FormMessage className="text-red-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Description</FormLabel>
              <ProductDescriptionBuilder
                initialData={field.value}
                onChange={(description) => field.onChange(description)}
              />
              <FormMessage className="text-red-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(url) => field.onChange([...field.value, url])}
                  onRemove={(url) =>
                    field.onChange([
                      ...field.value.filter((image) => image !== url),
                    ])
                  }
                />
              </FormControl>
              <FormMessage className="text-red-1" />
            </FormItem>
          )}
        />

        <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (FCFA)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expense"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense (FCFA)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Expense"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Category"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="Tags"
                    value={field.value}
                    onChange={(tag) => field.onChange([...field.value, tag])}
                    onRemove={(tagToRemove) =>
                      field.onChange([
                        ...field.value.filter((tag) => tag !== tagToRemove),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          {collections.length > 0 && (
            <FormField
              control={form.control}
              name="collections"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collections</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Collections"
                      collections={collections}
                      value={field.value}
                      onChange={(_id) => field.onChange([...field.value, _id])}
                      onRemove={(idToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (collectionId) => collectionId !== idToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="Colors"
                    value={field.value}
                    onChange={(color) =>
                      field.onChange([...field.value, color])
                    }
                    onRemove={(colorToRemove) =>
                      field.onChange([
                        ...field.value.filter(
                          (color) => color !== colorToRemove
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="Sizes"
                    value={field.value}
                    onChange={(size) => field.onChange([...field.value, size])}
                    onRemove={(sizeToRemove) =>
                      field.onChange([
                        ...field.value.filter((size) => size !== sizeToRemove),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-10">
          <Button
            type="submit"
            //className="bg-blue-1 text-white"
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/products")}
            className="bg-blue-1 text-white"
          >
            Discard
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
