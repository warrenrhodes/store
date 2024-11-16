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
import { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import { PromotionType } from "@/lib/types";

const formSchema = z.object({
  promotionName: z.string(),
  product: z.string(),
  discountValue: z.number(),
  minProductsToApply: z.number(),
});

interface PromotionFormProps {
  initialData?: PromotionType | null; //Must have "?" to make it optional
}

const PromotionForm: React.FC<PromotionFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          promotionName: "",
          product: "",
          discountValue: 0,
          minProductsToApply: 1,
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
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
