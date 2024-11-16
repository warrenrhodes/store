import { BeneficeType } from "@/lib/types";
import { useState } from "react";
import { Input } from "../ui/input";

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
            <Input placeholder="Title" onChange={} />
          </div>
          <div>
            <p>Title</p>
          </div>
          <div>
            <p>Description</p>
          </div>
        </div>
      ))}
    </div>
  );
};
