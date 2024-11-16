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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import { ProductType, PromotionType } from "@/lib/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  promotionName: z.string(),
  product: z.string({
    required_error: "Please select an product to apply the promotion.",
  }),
  discountValue: z.number(),
  isActive: z.boolean().default(false),
  minProductsToApply: z.number(),
});

interface PromotionFormProps {
  initialData?: PromotionType | null; //Must have "?" to make it optional
}

const PromotionForm: React.FC<PromotionFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("[products_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          product: initialData.product._id,
        }
      : {
          promotionName: "",
          product: "",
          discountValue: 0,
          isActive: false,
          minProductsToApply: 1,
        },
  });

  useEffect(() => {
    getProducts();
  }, []);

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
        ? `/api/promotions/${initialData._id}`
        : "/api/promotions";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Promotion ${initialData ? "updated" : "created"}`);
        window.location.href = "/promotions";
        router.push("/promotions");
      }
    } catch (err) {
      console.log("[promotions_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const onDelete = async (promotionId: string): Promise<boolean> => {
    const res = await fetch(`/api/promotions/${promotionId}`, {
      method: "DELETE",
    });
    return res.ok;
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Promotion</p>
          <Delete
            handleDelete={() => onDelete(initialData._id)}
            item="promotions"
          />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Promotion</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="promotionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promotion Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Promotion Name"
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
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Active</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {products.length > 0 && (
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product._id} value={product._id}>
                          {product.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="discountValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DiscountValue</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="DiscountValue"
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
            name="minProductsToApply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Products To Apply</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Min Products To Apply"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className=" text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/promotions")}
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

export default PromotionForm;
