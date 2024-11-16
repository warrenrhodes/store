import { ShipmentDetailType } from "@/lib/types";
import { useState } from "react";
import { Input } from "../ui/input";
import { EditorElement } from "./ProductLongDescriptionBuilder";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

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
      <div className="flex justify-between items-center">
        <p>Shipment Details</p>
        <Button onClick={addElement}>Add</Button>
      </div>

      {elements.map((element, index) => (
        <div key={index}>
          <div className="flex gap-2 items-center justify-center mt-2">
            <p>{index + 1} -</p>
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
              <Trash2 size={20} />
            </Button>
          </div>
          <div className=" flex flex-col gap-2">
            <p>Icon</p>
            <Input
              value={element.icon}
              placeholder="Parse an emoji"
              onChange={(e) =>
                onChangeElement(index, { ...element, icon: e.target.value })
              }
            />
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <p>Description</p>
            <EditorElement
              onChange={(newContent: string) =>
                onChangeElement(index, {
                  ...element,
                  description: newContent,
                })
              }
              content={element.description || ""}
              type={"text"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
