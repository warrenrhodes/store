import { BeneficeType } from "@/lib/types";
import { useState } from "react";
import { Input } from "../ui/input";
import { EditorElement } from "./RicheText";
import { Button } from "../ui/button";

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
    <div>
      <div className="flex justify-between items-center">
        <p>Benefices</p>
        <Button onClick={addElement}>Add</Button>
      </div>

      {elements.map((element, index) => (
        <div key={index}>
          <div className="mt-2 flex flex-col gap-2">
            <p>Icon</p>
            <Input
              placeholder="Parse an emoji"
              onChange={(e) =>
                onChangeElement(index, { ...element, icon: e.target.value })
              }
            />
          </div>
          <div>
            <p>Title</p>
            <Input
              placeholder="Title"
              onChange={(e) =>
                onChangeElement(index, { ...element, title: e.target.value })
              }
            />
          </div>
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
