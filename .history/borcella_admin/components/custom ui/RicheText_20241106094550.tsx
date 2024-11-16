import React, { useCallback, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { Extension, Command, RawCommands } from "@tiptap/core";
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
  CheckIcon,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ElementType, StoredProductDescription } from "@/lib/types";
import { FONT_FAMILIES, FONT_SIZES, richText } from "@/lib/constants";
import Image from "next/image";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

interface EditorElementProps {
  content: string | null;
  onChange: (newContent: string) => void;
  onSave: (editor: Editor | null) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  element: DescriptionElement;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type DescriptionElement = TextElement | MediaElement;

interface BaseElement {
  id: number;
  type: ElementType;
}

export interface TextElement extends BaseElement {
  type: "text";
  content: string;
  editor?: any;
}

export interface MediaElement extends BaseElement {
  type: "image" | "video";
  content: string | null;
  fileName?: string;
  url?: string[];
}

export interface ProductDescriptionBuilderProps {
  initialData?:
    | {
        type: string;
        id: number;
        content: string;
        url: string | null;
        fileName: string | null;
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
const EditorElement: React.FC<EditorElementProps> = ({
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  onSave,
  isFirst,
  isLast,
  element,
  onFileUpload,
  content,
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
    content: content || "",
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

  return (
    <Card>
      <CardContent className="p-4">
        <style>{richText}</style>
        <div className="flex justify-end gap-2 mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMoveUp}
            disabled={isFirst}
          >
            <MoveUp size={20} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onMoveDown}
            disabled={isLast}
          >
            <MoveDown size={20} />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className=" hover:bg-red-500/15 text-red-500 bg-red-500/10"
          >
            <Trash2 size={20} />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onSave(editor)}
            className=" hover:bg-green-500/15 text-green-500 bg-green-500/10"
          >
            <CheckCircle size={20} />
          </Button>
        </div>

        {element.type === "text" && (
          <div className="min-h-[150px] border rounded">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="ProseMirror-custom" />
          </div>
        )}

        {(element.type === "image" || element.type === "video") && (
          <div className="space-y-4">
            {element.type === "image" && (
              <ImageUpload
                value={[element.content]}
                onChange={(url) => field.onChange([...field.value, url])}
                onRemove={(url) =>
                  field.onChange([
                    ...field.value.filter((image) => image !== url),
                  ])
                }
              />
            )}
            {element.content && element.type === "video" && (
              <video controls className="max-w-full h-auto rounded">
                <source src={element.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            <input
              type="file"
              accept={element.type === "image" ? "image/*" : "video/*"}
              onChange={onFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
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
  const [elements, setElements] = useState<DescriptionElement[]>(
    initialData?.map<DescriptionElement>((e) => {
      if (e.type === "text") {
        return {
          id: e.id,
          type: e.type,
          content: e.content as string,
        } as TextElement;
      }
      return {
        id: e.id,
        type: e.type,
        content: e.content,
        file: null,
        fileName: e.fileName,
      } as MediaElement;
    }) || []
  );

  // Add new element
  const addElement = useCallback((type: ElementType) => {
    const newElement: DescriptionElement = {
      id: Date.now(),
      type,
      content: type === "text" ? "" : null,
      file: type !== "text" ? null : undefined,
    } as DescriptionElement;

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

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setElements((prev) =>
        prev.map((element) => {
          if (element.id === id) {
            return {
              ...element,
              file,
              content: URL.createObjectURL(file),
              fileName: file.name,
            } as MediaElement;
          }
          return element;
        })
      );
    },
    []
  );

  const handleSave = (id: number, editor: string | undefined) => {
    const newElement = elements.map((element) => {
      if (element.id === id && element.type === "text") {
        return {
          ...element,
          content: editor || "",
        } as TextElement;
      }
      return element;
    });
    onChange?.call(
      this,
      newElement.map<StoredProductDescription>((element) => {
        if (element.type === "text") {
          return {
            id: element.id,
            type: "text",
            content: element.content,
            url: null,
            fileName: null,
          };
        }
        return {
          id: element.id,
          type: element.type,
          content: element.content as string,
          fileName: element.fileName || null,
          url: null,
        };
      })
    );
    toast.success("Element saved");
  };

  return (
    <div className="flex-col">
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
            content={element.content}
            onChange={(newContent) =>
              handleElementChange(element.id, newContent)
            }
            onSave={(editor) => handleSave(element.id, editor?.getHTML())}
            onDelete={() => removeElement(element.id)}
            onMoveUp={() => moveElement(index, "up")}
            onMoveDown={() => moveElement(index, "down")}
            onFileUpload={(e) => handleFileUpload(e, element.id)}
            isFirst={index === 0}
            isLast={index === elements.length - 1}
            element={element}
          />
        ))}
      </div>
    </div>
  );
};

ProductDescriptionBuilder.displayName = "ProductDescriptionBuilder";

export default ProductDescriptionBuilder;
