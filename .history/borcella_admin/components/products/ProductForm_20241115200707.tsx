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
import ImageUpload from "../custom ui/ImageUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import MultiText from "../custom ui/MultiText";
import { Spacer } from "../custom ui/Spacer";
import MultiSelect from "../custom ui/MultiSelect";
import { Loader } from "../custom ui/Loader";
import { CategoryType, ContentType, ProductType } from "@/lib/types";
import { BeneficesBuilder } from "../custom ui/BeneficesBuilder";
import { ShipmentDetailsBuilder } from "../custom ui/ShipmentDetailsBuilder";
import ProductLongDescriptionBuilder from "../custom ui/ProductLongDescriptionBuilder";
import CustomAccordionItem, {
  ContentElement,
  FileType,
} from "../accordion/CustomAccordionItem";
import CustomAccordion from "../custom ui/CustomAccordion";
import { FileUploader } from "../custom ui/FileUploader";

const formSchema = z
  .object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    longDescription: z
      .object({
        id: z.string(),
        type: z.enum(["TEXT", "IMAGE", "VIDEO"]),
        content: z.string().nullable(),
        mediaIds: z.string().array().nullable(),
      })
      .array()
      .optional(),
    benefices: z
      .object({
        icon: z.string(),
        title: z.string(),
        description: z.string().optional(),
      })
      .array()
      .optional(),
    shipmentDetails: z
      .object({
        icon: z.string(),
        description: z.string(),
      })
      .array()
      .optional(),
    media: z.string().array().nonempty(),
    categories: z.array(z.string()),
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
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      const data = await res.json();
      setCategories(data);
      setLoading(false);

      if (data.length < 1) {
        toast.error("Please create a category before create/update a product.");
      }
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
          ...initialData,
          categories: initialData.categories.map((category) => category._id),
          media: initialData.media.map((media) => media._id),
        }
      : {
          title: "",
          description: "",
          longDescription: undefined,
          media: [],
          shipmentDetails: [],
          benefices: [],
          categories: [],
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
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };
  const onDelete = async (productId: string): Promise<boolean> => {
    const res = await fetch(`/api/products/${productId}`, {
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
      <Form {...form}>
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
        <Spacer />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <CustomAccordion title="Description">
                <div>
                  <CustomAccordionItem
                    element={{
                      type: ContentType.TEXT,
                      content: field.value,
                      mediaIds: [],
                      id: "",
                    }}
                    index={0}
                    onChange={(value: ContentElement) =>
                      field.onChange(value.content)
                    }
                    listAvailableContentType={[ContentType.TEXT]}
                    isLast={false}
                  />
                </div>
              </CustomAccordion>
              <FormMessage className="text-red-1" />
            </FormItem>
          )}
        />
        <Spacer />
        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <ProductLongDescriptionBuilder
                initialData={field.value}
                onChange={(description) => field.onChange(description)}
              />
              <FormMessage className="text-red-1" />
            </FormItem>
          )}
        />
        <Spacer />
        <FormField
          control={form.control}
          name="benefices"
          render={({ field }) => (
            <FormItem>
              <BeneficesBuilder
                initialData={field.value}
                onChange={(value) => field.onChange(value)}
              />
              <FormMessage className="text-red-1" />
            </FormItem>
          )}
        />
        <Spacer />
        <FormField
          control={form.control}
          name="shipmentDetails"
          render={({ field }) => (
            <FormItem>
              <ShipmentDetailsBuilder
                initialData={field.value}
                onChange={(value) => field.onChange(value)}
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
                <FileUploader
                  mediaIds={field.value}
                  setContent={ (value: string[])=> {
                    throw new Error("Function not implemented.");
                  }}
                  fileType={FileType.IMAGE}
                />
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
        <Spacer />
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
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder="Search categories"
                    selectedValues={field.value.map((value) => {
                      return {
                        value,
                        label: categories.find((category) => {
                          return category._id === value;
                        })?.title as string,
                      };
                    })}
                    values={categories.map((category) => {
                      return {
                        value: category._id,
                        label: category.title,
                      };
                    })}
                    onChange={(values) =>
                      field.onChange([...values.map((value) => value.value)])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
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
        <Spacer />
        <div className="flex gap-10">
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/products")}
            className="bg-gray-50 text-black hover:bg-gray-100"
          >
            Discard
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
