import { BeneficeType } from "@/lib/types";
import { useState } from "react";
import { Input } from "../ui/input";
import { EditorElement } from "./RicheText";

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
const BeneficesBuilder: React.FC<BeneficesBuilderProps> = ({
  initialData,
  onChange,
}) => {
  const [elements, setElements] = useState<BeneficeType[]>(initialData || []);
  const addElement = () => {
    setElements([...elements, { icon: "", title: "", description: "" }]);
  };
  return (
    <div>
      <div>
        <p>Benefices</p>
      </div>

      {elements.map((element, index) => (
        <div key={index}>
          <div>
            <p>Icon</p>
            <Input
              placeholder="Parse an emoji"
              onChange={(e) => {
                element.title == e.target.value;
              }}
            />
          </div>
          <div>
            <p>Title</p>
            <Input
              placeholder="Title"
              onChange={(e) => {
                element.title == e.target.value;
              }}
            />
          </div>
          <div>
            <p>Description</p>
            <EditorElement
              onChange={(newContent: string) => {}}
              content={element.description || ""}
              type={"text"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
