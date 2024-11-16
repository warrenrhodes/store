import { BeneficeType, ContentType } from "@/lib/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import CustomAccordion from "../accordion/CustomAccordion";
import CustomAccordionItem, {
  ContentElement,
} from "../accordion/CustomAccordionItem";
import { IconSelector } from "./IconSelector";

export interface BeneficesBuilderProps {
  initialData?:
    | {
        icon: string;
        title: string;
        description?: string;
      }[]
    | null;
  onChange?: (description: BeneficeType[]) => void;
}

export const BeneficesBuilder: React.FC<BeneficesBuilderProps> = ({
  initialData,
  onChange,
}) => {
  const [elements, setElements] = useState<BeneficeType[]>(
    initialData || [{ icon: "", title: "", description: "" }]
  );
  const addElement = () => {
    setElements([...elements, { icon: "", title: "", description: "" }]);
  };

  const onChangeElement = (index: number, element: BeneficeType) => {
    const newElements = [...elements];
    newElements[index] = element;
    setElements(newElements);
    onChange?.(newElements);
  };
  return (
    <div className="w-full">
      <CustomAccordion title="Benefices">
        {elements.map((element, index) => (
          <div
            key={index}
            className="mb-3 flex w-full gap-3 p-3 items-center justify-center border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <IconSelector
                selectedIcon={element.icon}
                onSelectIcon={(icon) =>
                  onChangeElement(index, { ...element, icon: icon })
                }
              />
              {/* <p>Icon</p>

                <Input
                  value={element.icon}
                  placeholder="Parse an emoji"
                  onChange={(e) =>
                    onChangeElement(index, { ...element, icon: e.target.value })
                  }
                /> */}
              <CustomAccordion title="Title">
                <div>
                  <CustomAccordionItem
                    element={{
                      type: ContentType.TEXT,
                      content: element.description || "",
                      mediaIds: [],
                      id: "",
                    }}
                    index={index}
                    onChange={(value: ContentElement) =>
                      onChangeElement(index, {
                        ...element,
                        title: value.content,
                      })
                    }
                    listAvailableContentType={[ContentType.TEXT]}
                    isLast={index === elements.length - 1}
                  />
                </div>
              </CustomAccordion>
              <CustomAccordion title="Description">
                <div>
                  <CustomAccordionItem
                    element={{
                      type: ContentType.TEXT,
                      content: element.description || "",
                      mediaIds: [],
                      id: "",
                    }}
                    index={index}
                    onChange={(value: ContentElement) =>
                      onChangeElement(index, {
                        ...element,
                        description: value.content,
                      })
                    }
                    listAvailableContentType={[ContentType.TEXT]}
                    isLast={index === elements.length - 1}
                  />
                </div>
              </CustomAccordion>
            </div>
            <div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  const newElements = [...elements];
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
