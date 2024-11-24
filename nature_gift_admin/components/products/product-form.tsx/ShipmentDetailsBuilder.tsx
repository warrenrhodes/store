import CustomAccordion from "@/components/accordion/CustomAccordion";
import { IconSelector } from "@/components/custom-ui/IconSelector";
import { Spacer } from "@/components/custom-ui/Spacer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShipmentDetailSchemaType } from "@/lib/validations/product";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export interface ShipmentDetailBuilderProps {
  initialData?: ShipmentDetailSchemaType[];

  onChange?: (value: ShipmentDetailSchemaType[]) => void;
}

export const ShipmentDetailsBuilder: React.FC<ShipmentDetailBuilderProps> = ({
  initialData,
  onChange,
}) => {
  const [elements, setElements] = useState<ShipmentDetailSchemaType[]>(
    initialData || [{ icon: "", description: "" }]
  );
  const addElement = () => {
    setElements([...elements, { icon: "", description: "" }]);
  };

  const onChangeElement = (
    index: number,
    element: ShipmentDetailSchemaType
  ) => {
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
              <Spacer />
              <Input
                placeholder="Description....."
                value={element.description}
                onChange={(e) =>
                  onChangeElement(index, {
                    ...element,
                    description: e.target.value,
                  })
                }
              />
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
