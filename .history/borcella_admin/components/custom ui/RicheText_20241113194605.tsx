import React, { useCallback, useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import {
  Image as ImageIcon,
  Video,
  Type,
  Trash2,
  MoveUp,
  MoveDown,
  Bold,
  Italic,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ListIcon,
  LucideUnderline,
  CheckCircle,
  Plus,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ElementType, StoredProductDescription } from "@/lib/types";
import { richText } from "@/lib/constants";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface EditorElementProps {
  onChange: (newContent: string) => void;
  onSave?: (editor: Editor | null) => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  element?: StoredProductDescription;
  content: string | null;
  type: "text" | "image" | "video";
  setElements?: React.Dispatch<
    React.SetStateAction<StoredProductDescription[]>
  >;
}

export interface ProductDescriptionBuilderProps {
  initialData?:
    | {
        id: number;
        type: ElementType;
        content: string | null;
        mediaIds: string[] | null;
      }[]
    | null;
  onChange?: (description: StoredProductDescription[]) => void;
  error?: string;
}

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 mb-2 flex gap-2 flex-wrap">
      <Button
        size="sm"
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 size={16} />
      </Button>
      <Button
        size="sm"
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={16} />
      </Button>
      <Button
        size="sm"
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={16} />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("paragraph") ? "default" : "outline"}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Pilcrow size={16} />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("strike") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("underline") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <LucideUnderline size={16} />
      </Button>

      <Button
        size="sm"
        variant={editor.isActive({ textAlign: "left" }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft size={16} />
      </Button>
      <Button
        size="sm"
        variant={
          editor.isActive({ textAlign: "center" }) ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter size={16} />
      </Button>
      <Button
        size="sm"
        variant={
          editor.isActive({ textAlign: "right" }) ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight size={16} />
      </Button>
      <Button
        size="sm"
        variant={
          editor.isActive({ textAlign: "justify" }) ? "default" : "outline"
        }
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify size={16} />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("bold") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("italic") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon size={16} />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </Button>
      <input
        type="color"
        onInput={(event) =>
          editor.chain().focus().setColor(event.currentTarget.value).run()
        }
        value={editor.getAttributes("textStyle").color || "#000000"}
        data-testid="setColor"
      />
    </div>
  );
};

/**
 * A single element in the product description editor.
 *
 * This component should be used in conjunction with {@link ProductDescriptionEditor}.
 *
 * @prop {string} element.type The type of element. Can be "text", "image", or "video".
 * @prop {string} element.content The content of the element.
 * @prop {string} element.url The URL of the element.
 * @prop {(newHtml: string) => void} onChange The callback function when the element's content changes.
 * @prop {() => void} onDelete The callback function when the element is deleted.
 * @prop {() => void} onMoveUp The callback function when the element is moved up.
 * @prop {() => void} onMoveDown The callback function when the element is moved down.
 * @prop {boolean} isFirst Whether the element is the first element in the list.
 * @prop {boolean} isLast Whether the element is the last element in the list.
 * @prop {(event: React.ChangeEvent<HTMLInputElement>) => void} onFileUpload The callback function when the element's file is changed.
 */
export const EditorElement: React.FC<EditorElementProps> = ({
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  onSave,
  isFirst,
  isLast,
  element,
  content,
  type,
  setElements,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color.configure({
        types: ["textStyle"],
      }),
      Document,
      Paragraph,
      TextStyle,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
    ],
    content: element?.content || content || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none prose-headings:mt-4 prose-headings:mb-2",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleFileUpload = useCallback(async (mediaId: string, id: number) => {
    setElements?.call(this, (prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            content: "",
            mediaIds: [...(element.mediaIds || []), mediaId],
          };
        }
        return element;
      })
    );
  }, []);
  const handleFileRemove = useCallback(async (mediaId: string, id: number) => {
    setElements?.call(this, (prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            content: "",
            mediaIds: [
              ...(element.mediaIds || []).filter(
                (target) => target !== mediaId
              ),
            ],
          };
        }
        return element;
      })
    );
  }, []);

  return (
    <Card>
      <CardContent className="p-4">
        <style>{richText}</style>
        <div className="flex justify-end gap-2 mb-2">
          {onMoveUp && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMoveUp}
              disabled={isFirst}
            >
              <MoveUp size={20} />
            </Button>
          )}

          {onMoveDown && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMoveDown}
              disabled={isLast}
            >
              <MoveDown size={20} />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete?.call}
              className=" hover:bg-red-500/15 text-red-500 bg-red-500/10"
            >
              <Trash2 size={20} />
            </Button>
          )}
          {onSave && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onSave?.call(this, editor)}
              className=" hover:bg-green-500/15 text-green-500 bg-green-500/10"
            >
              <CheckCircle size={20} />
            </Button>
          )}
        </div>

        {type === "text" && (
          <div className="min-h-[150px] border rounded">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="ProseMirror-custom" />
          </div>
        )}

        {(type === "image" || type === "video") && element && (
          <div className="space-y-4">
            {type === "image" && (
              <ImageUpload
                value={element?.mediaIds || []}
                onChange={(mediaId) => handleFileUpload(mediaId, element.id)}
                onRemove={(mediaId) => handleFileRemove(mediaId, element.id)}
              />
            )}

            {/* {element.content && element.type === "video" && (
              <video controls className="max-w-full h-auto rounded">
                <source src={element.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )} */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

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
const ProductDescriptionBuilder: React.FC<ProductDescriptionBuilderProps> = ({
  initialData,
  onChange,
  error,
}) => {
  const [elements, setElements] = useState<StoredProductDescription[]>(
    initialData || []
  );

  // Add new element
  const addElement = useCallback((type: ElementType) => {
    const newElement: StoredProductDescription = {
      id: Date.now(),
      type,
      content: null,
      mediaIds: null,
    };

    setElements((prev) => [...prev, newElement]);
  }, []);

  const removeElement = useCallback((id: number) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  }, []);

  const handleElementChange = useCallback((id: number, newContent: string) => {
    setElements((prev) =>
      prev.map((elem) =>
        elem.id === id ? { ...elem, content: newContent } : elem
      )
    );
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

  const handleSave = (id: number, editor: string | undefined) => {
    const newElement = elements.map((element) => {
      if (element.id === id && element.type === "text") {
        return {
          ...element,
          content: editor || null,
        };
      }
      return element;
    });
    onChange?.call(
      this,
      newElement.map<StoredProductDescription>((element) => {
        return {
          id: element.id,
          type: element.type,
          content: element.content || element.id.toString(),
          mediaIds: element.mediaIds,
        };
      })
    );
    toast.success("Element saved");
  };

  return (
    <div className="flex-col">
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Long Description</AccordionTrigger>
          <AccordionContent>
            <Button variant={"outline"}>
              <Plus size={16} /> Add Entry Contents
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mb-6 flex gap-2">
        <Button
          onClick={() => addElement("text")}
          className="flex gap-2 bg-blue-700 text-white"
        >
          <Type size={16} /> Add Text
        </Button>
        <Button
          onClick={() => addElement("image")}
          className="flex gap-2 bg-black text-white"
        >
          <ImageIcon size={16} /> Add Image
        </Button>
        <Button
          onClick={() => addElement("video")}
          className="flex gap-2 bg-green-950 text-white"
        >
          <Video size={16} /> Add Video
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {elements.map((element, index) => (
          <EditorElement
            key={`${element.id}`}
            onChange={(newContent) =>
              handleElementChange(element.id, newContent)
            }
            onSave={(editor) => handleSave(element.id, editor?.getHTML())}
            onDelete={() => removeElement(element.id)}
            onMoveUp={() => moveElement(index, "up")}
            onMoveDown={() => moveElement(index, "down")}
            isFirst={index === 0}
            isLast={index === elements.length - 1}
            element={element}
            type={element.type}
            content={element.content}
            setElements={setElements}
          />
        ))}
      </div>
    </div>
  );
};

ProductDescriptionBuilder.displayName = "ProductDescriptionBuilder";

export default ProductDescriptionBuilder;
