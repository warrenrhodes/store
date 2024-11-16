import { Ref, useRef, useState } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Link, FolderOpen } from "lucide-react";
import { InsertMode } from "jodit/esm/types";

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
  const editor: Ref<Jodit> = useRef(null);
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);
  const [mediaType, setMediaType] = useState("image"); // 'image' or 'video'
  const [mediaSource, setMediaSource] = useState("upload"); // 'upload', 'browse', or 'url'
  const [mediaUrl, setMediaUrl] = useState("");

  const config = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "middle" as "middle",
    toolbarAdaptive: true,
    statusbar: true,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    defaultActionOnPaste: "insert_clear_html" as InsertMode,
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
    <Card className="w-full mx-auto">
      <CardContent className="p-6">
        {/* Custom Media Upload UI */}
        {isMediaDialogOpen && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="flex gap-4 mb-4">
              <Button
                variant={mediaType === "image" ? "default" : "outline"}
                onClick={() => setMediaType("image")}
              >
                Image
              </Button>
              <Button
                variant={mediaType === "video" ? "default" : "outline"}
                onClick={() => setMediaType("video")}
              >
                Video
              </Button>
            </div>

            <div className="flex gap-4 mb-4">
              <Button
                variant={mediaSource === "upload" ? "default" : "outline"}
                onClick={() => setMediaSource("upload")}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <Button
                variant={mediaSource === "browse" ? "default" : "outline"}
                onClick={() => setMediaSource("browse")}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Browse
              </Button>
              <Button
                variant={mediaSource === "url" ? "default" : "outline"}
                onClick={() => setMediaSource("url")}
              >
                <Link className="w-4 h-4 mr-2" />
                URL
              </Button>
            </div>

            {mediaSource === "upload" && (
              <input
                type="file"
                accept={mediaType === "image" ? "image/*" : "video/*"}
                onChange={handleFileUpload}
                className="mb-4"
              />
            )}

            {mediaSource === "url" && (
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Enter media URL"
                className="w-full p-2 border rounded mb-4"
              />
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsMediaDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleMediaInsert}>Insert</Button>
            </div>
          </div>
        )}

        {/* Jodit Editor */}
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
        />
      </CardContent>
    </Card>
  );
};

export default CustomRichTextEditor;
