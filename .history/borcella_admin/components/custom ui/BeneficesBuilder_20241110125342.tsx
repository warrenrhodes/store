import { ShipmentDetailType } from "@/lib/types";
import { useState } from "react";
import { Input } from "../ui/input";
import { EditorElement } from "./RicheText";
import { Button } from "../ui/button";

export interface ShipmentDetailBuilderProps {
  initialData?:
    | {
        icon: string;
        description: string;
      }[]
    | null;
  onChange?: (value: ShipmentDetailType[]) => void;
}

export const ShipmentDetailsBuilder: React.FC<ShipmentDetailType> = ({
  initialData,
  onChange,
}) => {
  const [elements, setElements] = useState<ShipmentDetailType[]>(
    initialData || []
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
          <div>
            <p>Icon</p>
            <Input
              placeholder="Parse an emoji"
              onChange={(e) =>
                onChangeElement(index, { ...element, icon: e.target.value })
              }
            />
          </div>
          <Spacer />
          <div>
            <p>Description</p>
            <EditorElement
              onChange={(newContent: string) =>
                onChangeElement(index, { ...element, description: newContent })
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
