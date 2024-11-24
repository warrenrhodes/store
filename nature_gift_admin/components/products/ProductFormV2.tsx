"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { generateSlug } from "@/lib/utils/slugify";
import {
  productSchema,
  ProductSchemaType,
  productVerificationForm,
} from "@/lib/validations/product";

import { InventoryFields } from "./product-form.tsx/InventoryFields";
import { MetadataFields } from "./product-form.tsx/MetadataFields";
import { PriceFields } from "./product-form.tsx/PriceFields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { FileUploader } from "../custom-ui/FileUploader";
import CustomAccordion from "../accordion/CustomAccordion";
import { FileTargetType } from "../custom-ui/FileUploader";
import { FileType } from "../accordion/CustomAccordionItem";
import { FeaturesForm } from "./product-form.tsx/Features";
import { VariantFields } from "./product-form.tsx/Variant";
import { ContentEditor } from "./product-form.tsx/ContentEditor";
import { ShipmentDetailsBuilder } from "./product-form.tsx/ShipmentDetailsBuilder";
import { Spacer } from "../custom-ui/Spacer";
import { CategoriesForm } from "./product-form.tsx/Categories";
import { IProduct } from "@/lib/models/Product";
import { ICategory } from "@/lib/models/Category";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

interface ProductFormProps {
  initialData?: IProduct;
  categories?: ICategory[];
}

export function ProductFormV2({ initialData, categories }: ProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          categories: initialData.categories.map((category) => category._id),
          media: initialData.media.map((media) => media._id),
        }
      : {
          title: "",
          slug: "",
          description: {
            contentType: "TEXT",
            content: "",
          },

          price: {
            regular: 0,
            sale: 0,
          },
          inventory: {
            quantity: 0,
            lowStockThreshold: 5,
          },
          status: "draft",
          visibility: false,
          media: [],
          categories: [],
          tags: [],
          features: [],
          shipmentDetails: [],
          metadata: {
            seoTitle: "",
            seoDescription: "",
            keywords: [],
          },
        },
  });

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;
      form.setValue("title", title);
      form.setValue("slug", generateSlug(title));
    },
    [form]
  );

  async function onSubmit(data: ProductSchemaType) {
    const errorMessage = productVerificationForm(data);

    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    setIsLoading(true);
    try {
      const url = initialData
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${initialData._id}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`;
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        toast({
          variant: "default",
          description: `Products ${initialData ? "updated" : "created"}`,
        });
        window.location.href = "/products";
        router.push("/products");
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

  const onDelete = async (): Promise<boolean> => {
    const res = await fetch(`/api/products/${initialData?.id}`, {
      method: "DELETE",
    });
    return res.ok;
  };

  return (
    <Form {...form}>
      <div className="md:grid sm:grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={onTitleChange}
                  placeholder="Product Title"
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
              <FormLabel>Product Slug</FormLabel>
              <FormControl>
                <Input
                  {...form.register("slug")}
                  placeholder="product-slug"
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <FormItem className="space-y-">
            <ContentEditor
              label="Product Description"
              onChange={field.onChange}
              content={field.value}
            />
            {fieldState.error?.message && (
              <FormMessage>{fieldState.error?.message}</FormMessage>
            )}
          </FormItem>
        )}
      />
      <Spacer />
      <PriceFields form={form} />
      <Spacer />
      <InventoryFields form={form} />
      <FormField
        control={form.control}
        name="media"
        render={({ field }) => (
          <FormItem>
            <CustomAccordion title="Product Images*">
              <FileUploader
                mediaIds={field.value || []}
                setContent={(value: string[]) => field.onChange(value)}
                fileType={FileType.IMAGE}
                targetType={FileTargetType.PRODUCT}
              />
            </CustomAccordion>
            <FormMessage className="text-red-1" />
          </FormItem>
        )}
      />
      <Spacer />
      <div className="grid gap-4 sm:grid-cols-2 items-end">
        <div>
          <FormLabel>Status</FormLabel>
          <Select
            onValueChange={(value) =>
              form.setValue("status", value as IProduct["status"])
            }
            defaultValue={form.getValues("status")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-x-3 items-center">
                <FormLabel>
                  <span>Visible</span>
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
      <FormField
        control={form.control}
        name="features"
        render={({ field }) => (
          <FormItem>
            <FeaturesForm
              initialData={field.value}
              onChange={(value) => field.onChange(value)}
            />
            <FormMessage className="text-red-1" />
          </FormItem>
        )}
      />
      <Spacer />
      {categories && <CategoriesForm form={form} categories={categories} />}
      <Spacer />
      <VariantFields form={form} />
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
      <Spacer />
      <MetadataFields form={form} />
      <Spacer />
      <div className="flex justify-between">
        <Button disabled={isLoading} onClick={() => onSubmit(form.getValues())}>
          {isLoading && <Loader2 className="animate-spin" />}
          {initialData ? "Update" : "Create"} Product
        </Button>
        {initialData && (
          <Button
            type="button"
            variant="destructive"
            disabled={isLoading}
            onClick={() => onDelete()}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Product
          </Button>
        )}
      </div>
    </Form>
  );
}
