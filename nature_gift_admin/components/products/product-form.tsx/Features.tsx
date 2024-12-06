import { Button } from "../../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ProductSchemaType } from "@/lib/validations/product";
import { Input } from "@/components/ui/input";
import { ContentEditor } from "./ContentEditor";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import CustomAccordion from "@/components/accordion/CustomAccordion";
import { IconSelector } from "./IconSelector";

type Feature = {
  title: string;
  icon: string;
  description?: {
    contentType: "TEXT" | "HTML";
    content: string;
  };
};

type Features = Feature[];
export interface FeaturesFormProps {
  initialData?: Features;
  onChange?: (features: Features) => void;
  form: UseFormReturn<ProductSchemaType>;
}

export const FeaturesForm: React.FC<FeaturesFormProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

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
              title: "",
              description: { contentType: "TEXT", content: "" },
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
          className="flex gap-4 items-start flex-col w-full"
          title={"Feature " + (index + 1)}
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
                    <IconSelector
                      key={field.value}
                      onSelectIcon={field.onChange}
                      selectedIcon={field.value}
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
            className="w-full"
            onClick={() => remove(index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CustomAccordion>
      ))}
    </div>
  );
};
