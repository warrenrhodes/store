import MultiText from "@/components/custom-ui/MultiText";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProductSchemaType } from "@/lib/validations/product";
import { UseFormReturn } from "react-hook-form";

interface VariantFieldsProps {
  form: UseFormReturn<ProductSchemaType>;
}
export function VariantFields({ form }: VariantFieldsProps) {
  return (
    <div className="md:grid md:grid-cols-3 gap-8">
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <MultiText
                placeholder="Tags"
                value={field.value || []}
                onChange={(tag) =>
                  field.onChange([...(field.value || []), tag])
                }
                onRemove={(tagToRemove) =>
                  field.onChange([
                    ...(field.value || []).filter((tag) => tag !== tagToRemove),
                  ])
                }
              />
            </FormControl>
            <FormMessage className="text-red-1" />
          </FormItem>
        )}
      />
    </div>
  );
}
