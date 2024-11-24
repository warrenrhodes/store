import MultiSelect from "@/components/custom-ui/MultiSelect";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ICategory } from "@/lib/models/Category";
import { ProductSchemaType } from "@/lib/validations/product";
import { UseFormReturn } from "react-hook-form";

interface CategoriesFieldsProps {
  form: UseFormReturn<ProductSchemaType>;
  categories: ICategory[];
}
export const CategoriesForm: React.FC<CategoriesFieldsProps> = ({
  form,
  categories,
}) => {
  return (
    <FormField
      control={form.control}
      name="categories"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categories*</FormLabel>
          <FormControl>
            <MultiSelect
              placeholder="Search categories"
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
          <FormMessage className="text-red-1" />
        </FormItem>
      )}
    />
  );
};
