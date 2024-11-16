import { Ref, useRef, useState } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { Card, CardContent } from "../ui/card";

type ToolBarType =
  | "middle"
  | "small"
  | "tiny"
  | "xsmall"
  | "large"
  | "undefined";
const CustomRichTextEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) => {
  console.log("000000000000---------------------sdfdf");

  const editor: Ref<Jodit> = useRef(null);
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);
  const [mediaType, setMediaType] = useState("image"); // 'image' or 'video'
  const [mediaSource, setMediaSource] = useState("upload"); // 'upload', 'browse', or 'url'
  const [mediaUrl, setMediaUrl] = useState("");

  const config = {
    readonly: false,
    height: 400,
    toolbar: true,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    // defaultActionOnPaste: "insert_clear_html" as InsertMode,
    uploader: {
      url: "your-upload-endpoint", // Replace with your upload endpoint
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "jpeg", "png", "gif", "webp"],
      filesVariableName: "files",
    },
  };

  const handleMediaInsert = () => {
    if (mediaUrl && editor.current) {
      const mediaTag =
        mediaType === "image"
          ? `<img src="${mediaUrl}" alt="Uploaded media" class="max-w-full h-auto my-4" />`
          : `<video src="${mediaUrl}" controls class="max-w-full h-auto my-4"></video>`;

      editor.current.selection.insertHTML(mediaTag);
      setMediaUrl("");
      setIsMediaDialogOpen(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(value) => console.log(value)}
        />
      </CardContent>
    </Card>
  );
};

export default CustomRichTextEditor;
