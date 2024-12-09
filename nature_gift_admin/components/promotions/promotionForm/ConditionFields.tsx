"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PromotionSchemaType } from "@/lib/validations/promotions";
import { IProduct } from "@/lib/models/Product";
import MultiText from "@/components/custom-ui/MultiText";

interface ConditionFieldsProps {
  form: UseFormReturn<PromotionSchemaType>;
  products: IProduct[];
}

export function ConditionFields({ form, products }: ConditionFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "conditions",
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>Conditions</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ type: "MINIMUM_QUANTITY", value: 2 })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Condition
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <FormField
            control={form.control}
            name={`conditions.${index}.type`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      form.setValue(`conditions.${index}.value`, "");
                      field.onChange(e);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MINIMUM_QUANTITY">
                        Minimum Quantity
                      </SelectItem>
                      <SelectItem value="SPECIFIC_PRODUCTS">
                        Specific Products
                      </SelectItem>
                      <SelectItem value="DELIVERY_METHOD">
                        Delivery Method
                      </SelectItem>
                      <SelectItem value="LOCATION">Location</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`conditions.${index}.value`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  {form.watch(`conditions.${index}.type`) ===
                  "MINIMUM_QUANTITY" ? (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      onKeyDown={handleKeyPress}
                    />
                  ) : form.watch(`conditions.${index}.type`) ===
                    "DELIVERY_METHOD" ? (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={(field.value || "") as string}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DELIVERY">Delivery</SelectItem>
                        <SelectItem value="PICKUP">Pickup</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : form.watch(`conditions.${index}.type`) === "LOCATION" ? (
                    <MultiText
                      placeholder="Locations"
                      value={
                        field.value
                          ? Array.isArray(field.value)
                            ? field.value
                            : [field.value as string]
                          : []
                      }
                      onChange={(tag) =>
                        field.onChange([
                          ...(field.value ? (field.value as string[]) : []),
                          tag,
                        ])
                      }
                      onRemove={(tagToRemove) =>
                        field.onChange([
                          ...(field.value
                            ? (field.value as string[])
                            : []
                          ).filter((tag) => tag !== tagToRemove),
                        ])
                      }
                    />
                  ) : form.watch(`conditions.${index}.type`) ===
                      "SPECIFIC_PRODUCTS" && products.length > 0 ? (
                    <Select
                      onValueChange={field.onChange}
                      value={(field.value || "") as string}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>

                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product._id} value={product._id}>
                            {product.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <></>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
