"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductSchemaType } from "@/lib/validations/product";
import { UseFormReturn } from "react-hook-form";

interface MetadataFieldsProps {
  form: UseFormReturn<ProductSchemaType>;
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

export function MetadataFields({ form }: MetadataFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="metadata.seoTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Title</FormLabel>
            <FormControl>
              <Input {...field} onKeyDown={handleKeyPress} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="metadata.seoDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
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
    </div>
  );
}
