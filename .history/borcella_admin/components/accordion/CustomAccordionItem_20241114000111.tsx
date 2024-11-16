import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MoveUp, MoveDown, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import CustomRichTextEditor from "./CustomRichText";

export enum ContentType {
  "TEXT" = "text",
  "VIDEO" = "VIDEO",
  "IMAGE" = "IMAGE",
}

export interface ContentElement {
  type: ContentType;
  content: string;
  id: string;
}

const CustomAccordionItem = ({
  index,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  listAvailableContentType,
  isLast,
  element,
}: {
  index: number;
  onChange: (value: ContentElement) => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  listAvailableContentType: ContentType[];
  isLast: boolean;
  element: ContentElement;
}) => {
  const [currentType, setCurrenType] = useState<string>(
    element.type ?? ContentType.TEXT
  );
  console.log("---------------------sdfdf");

  return (
    <>
      <div className="mb-3 flex w-full gap-3">
        <div className="w-full">
          <Select
            onValueChange={(value) => setCurrenType(value)}
            defaultValue={currentType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {listAvailableContentType.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            {currentType === ContentType.TEXT ? (
              <CustomRichTextEditor content="" setContent={(value) => {}} />
            ) : (
              // <RichTextV2
              //   content={element.content}
              //   onChange={(value) =>
              //     onChange({ ...element, content: value, type: currentType })
              //   }
              // />
              <div></div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {onMoveUp && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMoveUp}
              disabled={index === 0}
            >
              <MoveUp size={12} />
            </Button>
          )}

          {onMoveDown && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMoveDown}
              disabled={isLast}
            >
              <MoveDown size={12} />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete?.call}
              className=" hover:bg-red-500/15 text-red-500 bg-red-500/10"
            >
              <Trash2 size={13} />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomAccordionItem;
