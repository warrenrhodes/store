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
      url: "http://localhost:3000/api/media/upload",
      insertImageAsBase64URI: false, // We want to upload files to server
      imagesExtensions: ["jpg", "jpeg", "png", "gif", "webp"],
      filesVariableName: (i: number): string => {
        console.log("i", i);
        return `files`;
      },
      // withCredentials: true,
      process: (resp: any) => {
        console.log("resp", resp);
        return {
          files: resp.files.map((file: any) => ({
            url: file.file.url,
            name: file.file.name,
          })),
          error: resp.success ? 0 : 1,
          message: resp.message,
        };
      },
      isSuccess: (resp: any) => resp.success,
      getMsg: (resp: any) => resp.message,
      // contentType: (uploader: any, requestData: any) => {
      //   return (uploader.ow as any).FormData !== undefined &&
      //     typeof requestData !== "string"
      //     ? false
      //     : "application/x-www-form-urlencoded; charset=UTF-8";
      // },
      defaultHandlerSuccess: function (response: any) {
        if (response.files) {
          console.log("response.files", response.files);
          response.files.forEach((file: any) => {
            // Get the current editor instance
            const editorInstance = (editor as any).current?.jodit;
            if (editorInstance) {
              console;
              // Insert the image at the current cursor position
              editorInstance.selection.insertImage(file.url, null, {
                alt: file.name,
                style: {
                  maxWidth: "100%",
                },
              });
            }
          });
        }
      },
    },
    events: {
      // Optional: Log uploaded file information
      afterUpload: (response: any) => {
        console.log("File uploaded:", response);
      },
      // Optional: Handle upload errors
      errorHandler: (error: Error, data: any) => {
        console.error("Upload error:", error, data);
      },
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
