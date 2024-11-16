import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MoveUp, MoveDown, Trash2, UploadIcon } from "lucide-react";
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
                  console.log(value);
                }}
              />
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

const FileUploader = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) => {
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center pb-3 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-gray-800 text-xl font-bold">Upload File</h3>
            <p className="text-gray-600 text-xs mt-1">
              Upload file to this project
            </p>
          </div>
        </div>

        <div className="rounded-lg border-2 border-gray-200 border-dashed mt-6">
          <div className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
            <UploadIcon className="w-10 mb-4 fill-gray-600 inline-block" />
            <h4 className="text-sm text-gray-600">
              Drag & Drop or
              <label
                htmlFor="chooseFile"
                className="text-blue-600 cursor-pointer"
              >
                Choose file
              </label>
              to upload
            </h4>
            <input type="file" id="chooseFile" className="hidden" />
          </div>
        </div>

        {/* <div className="flex flex-col bg-gray-50 p-4 rounded-lg mt-4">
          <div className="flex">
            <p className="text-xs text-gray-600 flex-1">
              <Document className="w-5 mr-2 fill-current inline-block" />
              document.file <span className="ml-2">1.5 mb</span>
            </p>
            <CloseIcon className="w-3 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500" />
          </div>

          <div className="bg-gray-300 rounded-full w-full h-2 my-2">
            <div className="w-1/3 h-full rounded-full bg-blue-600 flex items-center relative">
              <span className="absolute text-xs right-0 bg-white w-2 h-2 rounded-full"></span>
            </div>
          </div>

          <p className="text-xs text-gray-600 flex-1">35% done</p>
        </div> */}

        <div className="border-t border-gray-200 pt-6 flex justify-between gap-4 mt-6">
          <Button className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200">
            Cancel
          </Button>
          <Button className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600">
            Import
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomAccordionItem;
