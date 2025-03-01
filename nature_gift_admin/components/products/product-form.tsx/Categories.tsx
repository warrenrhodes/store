import MultiSelect from '@/components/custom-ui/MultiSelect'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { ProductSchemaType } from '@/lib/validations/product'
import { AlertTriangle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { ICategory } from '@/lib/actions/server'
interface CategoriesFieldsProps {
  form: UseFormReturn<ProductSchemaType>
  categories: ICategory[]
}
export const CategoriesForm: React.FC<CategoriesFieldsProps> = ({ form, categories }) => {
  return (
    <FormField
      control={form.control}
      name="categories"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categories*</FormLabel>
          <FormControl>
            {categories.length > 0 ? (
              <MultiSelect
                placeholder="Search categories"
                selectedValues={(field.value || []).map(value => {
                  return {
                    value,
                    label: categories.find(category => {
                      return category.path === value
                    })?.data.name as string,
                  }
                })}
                values={categories.map(category => {
                  return {
                    value: category.path,
                    label: category.data.name,
                  }
                })}
                onChange={values => field.onChange([...values.map(value => value.label)])}
              />
            ) : (
              <div className="text-red-500 flex items-center gap-3 justify-center">
                <AlertTriangle /> Adds least of one category before create a product
              </div>
            )}
          </FormControl>
          <FormMessage className="text-red-1" />
        </FormItem>
      )}
    />
  )
}
