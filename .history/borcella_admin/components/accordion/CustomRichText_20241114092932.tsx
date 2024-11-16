import { Ref, useRef } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { Card, CardContent } from "../ui/card";
import { IUploader, IUploaderData } from "jodit/esm/types";
import { isJoditObject } from "jodit/esm/core/helpers";

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
      defaultHandlerSuccess(img: IUploader, resp: IUploaderData) {
        const j = img.j || this;

        if (!isJoditObject(j)) {
          return;
        }

        if (resp.files && resp.files.length) {
          resp.files.forEach((filename, index: number) => {
            const [tagName, attr]: string[] =
              resp.isImages && resp.isImages[index]
                ? ["img", "src"]
                : ["a", "href"];

            const elm = j.createInside.element(tagName);

            elm.setAttribute(attr, resp.baseurl + filename);

            if (tagName === "img") {
              j.s.insertImage(
                elm as HTMLImageElement,
                null,
                j.o.imageDefaultWidth
              );
            } else {
              j.s.insertNode(elm);
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
