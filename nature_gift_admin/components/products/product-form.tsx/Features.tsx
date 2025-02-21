import { Button } from '../../ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { ProductSchemaType } from '@/lib/validations/product'
import { Input } from '@/components/ui/input'
import { ContentEditor } from '../../custom-ui/ContentEditor'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormLabel, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import CustomAccordion from '@/components/accordion/CustomAccordion'

type Feature = {
  title: string
  icon: string
  description?: {
    contentType: 'TEXT' | 'HTML'
    content: string
  }
}

type Features = Feature[]
export interface FeaturesFormProps {
  initialData?: Features
  onChange?: (features: Features) => void
  form: UseFormReturn<ProductSchemaType>
}

export const FeaturesForm: React.FC<FeaturesFormProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'features',
  })

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <FormLabel>Features</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              title: '',
              description: { contentType: 'TEXT', content: '' },
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {fields.map((field, index) => (
        <CustomAccordion
          key={field.id}
          className="flex gap-4 items-start flex-col w-full px-4 py-2"
          title={'Feature ' + (index + 1)}
        >
          <div className="grid gap-4 sm:grid-cols-2 w-full">
            <FormField
              control={form.control}
              name={`features.${index}.title`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Title....."
                      value={field.value}
                      onChange={field.onChange}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`features.${index}.icon`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Ex: 😀"
                      value={field.value || ''}
                      onChange={field.onChange}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ContentEditor
            label="Description"
            form={form}
            contentTypeFieldKey={`features.${index}.description.contentType`}
            contentFieldKey={`features.${index}.description.content`}
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="w-full border border-red-500/20 hover:bg-red-500/10"
            onClick={() => remove(index)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </CustomAccordion>
      ))}
    </div>
  )
}
