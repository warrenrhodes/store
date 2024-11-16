"use client";

import { Ref, useEffect, useRef } from "react";
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
      defaultHandlerSuccess: function (this: any, response: any) {
        console.log("Default handler success called with:", response);
        console.log("Jodit instance:", this);

        if (response.files && response.files.length > 0) {
          response.files.forEach((fileInfo: any) => {
            const file = fileInfo.file;
            if (fileInfo.url) {
              console.log("Attempting to insert image:", fileInfo.url);
              try {
                // Try to insert using the jodit instance from this context
                if (this && this.s) {
                  this.s.insertImage(fileInfo.url);
                }
                // Fallback to using the ref if this.jodit is not available
                else if (editor.current) {
                  (editor.current as any).selection.insertImage(fileInfo.url);
                }
                console.log("Image insertion attempted");
              } catch (error) {
                console.error("Error inserting image:", error);
              }
            }
          });
        }
      },
    },
    events: {
      afterUpload: (response: any) => {
        console.log("After upload event:", response);
      },
      errorHandler: (error: Error, data: any) => {
        console.error("Upload error:", error, data);
      },
      // Add initialization event handler
      init: (jodit: any) => {
        console.log("Jodit initialized:", jodit);
      },
      beforeUpload: (data: any) => {
        console.log("Before upload:", data);
        return data;
      },
    },
  };

  const onEditorInit = (editor: any) => {
    console.log("Editor initialized:", editor);
  };

  useEffect(() => {
    console.log("Editor ref:", editor);
    console.log("Editor current:", editor.current);
  }, []);

  return (
    <Card className="w-full p-0">
      <CardContent className="p-0">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(value) => {
            console.log("Editor content changed:", value);
            setContent(value);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CustomRichTextEditor;
