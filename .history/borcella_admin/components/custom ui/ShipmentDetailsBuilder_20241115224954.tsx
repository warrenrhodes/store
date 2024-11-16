import { ContentType, ShipmentDetailType } from "@/lib/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ContentElement } from "../accordion/CustomAccordionItem";
import CustomAccordionItem from "../accordion/CustomAccordionItem";
import CustomAccordion from "../accordion/CustomAccordion";
import { IconSelector } from "./IconSelector";
import { Spacer } from "./Spacer";

export interface ShipmentDetailBuilderProps {
  initialData?:
    | {
        icon: string;
        description: string;
      }[]
    | null;
  onChange?: (value: ShipmentDetailType[]) => void;
}

export const ShipmentDetailsBuilder: React.FC<ShipmentDetailBuilderProps> = ({
  initialData,
  onChange,
}) => {
  const [elements, setElements] = useState<ShipmentDetailType[]>(
    initialData || [{ icon: "", description: "" }]
  );
  const addElement = () => {
    setElements([...elements, { icon: "", description: "" }]);
  };

  const onChangeElement = (index: number, element: ShipmentDetailType) => {
    const newElements = [...elements];
    newElements[index] = element;
    setElements(newElements);
    onChange?.(newElements);
  };

  return (
    <div>
      <CustomAccordion title="Shipment Details">
        {elements.map((element, index) => (
          <div
            key={index}
            className="mb-3 flex w-full gap-3 p-3 items-center justify-center border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex-1">
              <CustomAccordion title="Icons">
                <IconSelector
                  selectedIcon={element.icon}
                  onSelectIcon={(icon) =>
                    onChangeElement(index, { ...element, icon: icon })
                  }
                />
              </CustomAccordion>
              <Spacer height={15} />
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
