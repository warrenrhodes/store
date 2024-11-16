import { Ref, useRef } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { Card, CardContent } from "../ui/card";

const CustomRichTextEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) => {
  const editor: Ref<Jodit> = useRef(null);

  const config = {
    readonly: false,
    height: 400,
    toolbar: true,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    enableDragAndDropFileToEditor: true,
    uploader: {
      url: "your-upload-endpoint",
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "jpeg", "png", "gif", "webp"],
      filesVariableName: "files",
      headers: {
        "X-CSRF-TOKEN": "your-csrf-token",
      },
      withCredentials: true,
    },
  };

  return (
    <Card className="w-full p-0">
      <CardContent className="p-0">
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
