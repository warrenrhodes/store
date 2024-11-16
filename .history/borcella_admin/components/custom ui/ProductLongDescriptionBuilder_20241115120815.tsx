import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";
import { StoredProductDescription } from "@/lib/types";
import CustomAccordion from "./CustomAccordion";
import CustomAccordionItem, {
  ContentElement,
} from "../accordion/CustomAccordionItem";

export interface ProductDescriptionBuilderProps {
  initialData?:
    | {
        id: string;
        type: "TEXT" | "IMAGE" | "VIDEO";
        content: string | null;
        mediaIds: string[] | null;
      }[]
    | null;
  onChange?: (description: StoredProductDescription[]) => void;
  error?: string;
}

/**
 * A component that allows users to build a product description. It provides a
 * UI that allows users to add, remove, and reorder elements in the description.
 *
 * @prop {DescriptionElement[]} initialData The initial elements in the description. If not provided, the description will be empty.
 * @prop {(data: StoredProductDescription) => void} onSave The callback function when the description is saved.
 * @prop {(error: Error) => void} onError The callback function when an error occurs while saving the description.
 *
 * The component will generate a `StoredProductDescription` object when it is saved, which can be used to store the description in a database. The object will contain the elements in the description, where each element is an object with the following properties:
 * - `type`: The type of the element. Can be "text", "image", or "video".
 * - `content`: The content of the element. If the element is of type "text", this is the HTML content of the element. If the element is of type "image", this is the URL of the image. If the element is of type "video", this is the URL of the video.
 * - `fileName`: The name of the file if the element is of type "image" or "video".
 */
const ProductLongDescriptionBuilder: React.FC<
  ProductDescriptionBuilderProps
> = ({ initialData, onChange, error }) => {
  const [elements, setElements] = useState<ContentElement[]>(
    initialData?.map((e) => {
      return {
        type: e.type as ContentType,
        content: e.content ?? "",
        mediaIds: e.mediaIds,
        id: e.id,
      };
    }) || []
  );

  const addElement = useCallback((type: ContentType) => {
    const newElement: ContentElement = {
      id: uuidv4(),
      type: type,
      content: "",
      mediaIds: null,
    };

    setElements((prev) => [...prev, newElement]);
  }, []);

  const removeElement = useCallback((id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  }, []);

  const moveElement = useCallback((index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;

    setElements((prev) => {
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newElements = [...prev];
      [newElements[index], newElements[newIndex]] = [
        newElements[newIndex],
        newElements[index],
      ];
      return newElements;
    });
  }, []);

  useEffect(() => {
    onChange?.(
      elements.map<StoredProductDescription>((element) => ({
        id: element.id,
        type: element.type,
        content: element.content,
        mediaIds: element.mediaIds,
      }))
    );
  }, [elements, onChange]);

  return (
    <div className="flex-col">
      <CustomAccordion title="Long Description">
        <div>
          {elements.length > 0 &&
            elements.map((element, index) => (
              <CustomAccordionItem
                element={element}
                index={index}
                key={element.id}
                onChange={function (value: ContentElement): void {
                  // throw new Error("Function not implemented.");
                }}
                listAvailableContentType={[
                  ContentType.IMAGE,
                  ContentType.TEXT,
                  ContentType.VIDEO,
                ]}
                isLast={index === elements.length - 1}
                onDelete={removeElement}
                onMove={(index: number, direction: "up" | "down") =>
                  moveElement(index, direction)
                }
              />
            ))}
          <Button
            onClick={() => addElement(ContentType.TEXT)}
            className="flex gap-2 bg-blue-700 text-white rounded-lg"
          >
            <Plus size={16} /> Add Entry
          </Button>
        </div>
      </CustomAccordion>
    </div>
  );
};

export default ProductLongDescriptionBuilder;
