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
  return (
    <div>
      <p>Benefices</p>
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
              onChange={(newContent: string) => {
                throw new Error("Function not implemented.");
              }}
              onDelete={function (): void {
                throw new Error("Function not implemented.");
              }}
              content={element.description || ""}
              type={"text"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
