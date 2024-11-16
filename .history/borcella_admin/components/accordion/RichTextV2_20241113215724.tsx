import { EditorContent, useEditor } from "@tiptap/react";
import { Button } from "../ui/button";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import {
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
} from "lucide-react";

const RichTextV2 = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
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
        className:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none prose-headings:mt-4 prose-headings:mb-2",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  return (
    <div>
      <div className="min-h-[150px] border rounded">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="ProseMirror-custom" />
      </div>
    </div>
  );
};

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

export default RichTextV2;
