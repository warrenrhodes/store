import { useCallback, useState } from "react";
import { Button } from "../../ui/button";
import { Plus, Trash2 } from "lucide-react";
import CustomAccordion from "../../accordion/CustomAccordion";
import { IconSelector } from "../../custom-ui/IconSelector";
import { Spacer } from "../../custom-ui/Spacer";
import { ContentSchema, productSchema } from "@/lib/validations/product";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ContentEditor } from "./ContentEditor";

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
}

export const FeaturesForm: React.FC<FeaturesFormProps> = ({
  initialData,
  onChange,
}) => {
  const [elements, setElements] = useState<Features>(
    initialData || [{ icon: "", title: "" }]
  );
  const addElement = useCallback(() => {
    setElements((e) => [
      ...(e || []),
      {
        icon: "",
        title: "",
        description: { contentType: "TEXT", content: "" },
      },
    ]);
  }, []);

  const onChangeElement = useCallback(
    (index: number, element: Feature) => {
      setElements((prevElements) => {
        const newElements = [...prevElements];
        newElements[index] = element;
        onChange?.(newElements);
        return newElements;
      });
    },
    [onChange]
  );

  return (
    <div className="w-full">
      <CustomAccordion title="Features">
        {(elements || []).map((element, index) => (
          <CustomAccordion title={`${index + 1}`} key={index}>
            <div className="mb-3 flex w-full gap-3 p-3 items-center justify-center border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
              <div className="flex-1">
                <IconSelector
                  selectedIcon={element.icon}
                  onSelectIcon={(icon) =>
                    onChangeElement(index, { ...element, icon: icon })
                  }
                />
                <Spacer />
                <Input
                  placeholder="Title....."
                  value={element.title}
                  onChange={(e) =>
                    onChangeElement(index, {
                      ...element,
                      title: e.target.value,
                    })
                  }
                />
                <Spacer />
                <ContentEditor
                  onChange={(value: z.infer<typeof ContentSchema>) =>
                    onChangeElement(index, {
                      ...element,
                      description: value,
                    })
                  }
                  label="Description"
                  content={
                    element.description || { contentType: "TEXT", content: "" }
                  }
                />
              </div>
              <div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const newElements = [...(elements || [])];
                    newElements.splice(index, 1);
                    setElements(newElements);
                    onChange?.(newElements);
                  }}
                  className=" hover:bg-red-500/15 text-red-500 bg-red-500/10"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            </div>
          </CustomAccordion>
        ))}
        <Button
          onClick={addElement}
          className="flex gap-2 bg-blue-700 text-white rounded-lg"
        >
          <Plus size={16} /> Add Entry
        </Button>
      </CustomAccordion>
    </div>
  );
};
