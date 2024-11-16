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
import { ContentType } from "@/lib/types";
import { FileUploader } from "../custom ui/FileUploader";

export enum FileType {
  "IMAGE" = "IMAGE",
  "VIDEO" = "VIDEO",
}

export interface ContentElement {
  type: ContentType;
  content: string;
  mediaIds: string[] | null;
  id: string;
}

const CustomAccordionItem = ({
  index,
  onChange,
  onDelete,
  onMove,
  listAvailableContentType,
  isLast,
  element,
}: {
  index: number;
  onChange: (value: ContentElement) => void;
  onDelete?: (id: string) => void;
  onMove?: (index: number, direction: "up" | "down") => void;
  listAvailableContentType: ContentType[];
  isLast: boolean;
  element: ContentElement;
}) => {
  const [currentType, setCurrenType] = useState<string>(
    element.type ?? ContentType.TEXT
  );

  return (
    <>
      <div className="mb-3 flex w-full gap-3">
        <div className="w-full flex flex-col gap-2">
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
              <CustomRichTextEditor
                content={element.content}
                setContent={(value) => {
                  // console.log(value);
                  // onChange({ ...element, content: value });
                }}
              />
            ) : (
              <FileUploader
                fileType={
                  currentType === ContentType.VIDEO
                    ? FileType.VIDEO
                    : FileType.IMAGE
                }
                maxFiles={currentType === ContentType.VIDEO ? 1 : 5}
                maxFileSize={
                  currentType === ContentType.VIDEO
                    ? 50 * 1024 * 1024
                    : 5 * 1024 * 1024
                }
                mediaIds={element.mediaIds || []}
                setContent={(value) => {
                  onChange({ ...element, mediaIds: value });
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {onMove && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMove(index, "up")}
              disabled={index === 0}
            >
              <MoveUp size={12} />
            </Button>
          )}

          {onMove && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMove(index, "down")}
              disabled={isLast}
            >
              <MoveDown size={12} />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(element.id)}
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
