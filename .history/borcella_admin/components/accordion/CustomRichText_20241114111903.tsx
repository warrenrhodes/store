"use client";

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
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/upload`,
      insertImageAsBase64URI: false,
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
              try {
                if (this && this.s) {
                  this.s.insertImage(fileInfo.url);
                } else if (editor.current) {
                  (editor.current as any).selection.insertImage(fileInfo.url);
                }
              } catch (error) {
                console.error("Error inserting image:", error);
              }
            }
          });
        }
      },
    },
    filebrowser: {
      uploader: {
        url: "/api/upload",
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

  return (
    <Card className="w-full p-0">
      <CardContent className="p-0">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={setContent}
          onChange={setContent}
        />
      </CardContent>
    </Card>
  );
};

export default CustomRichTextEditor;

/**
 *  config = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: 220,
    direction: 'ltr',
    language: 'en',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: -1,
    toolbar: true,
    enter: 'P',
    useSplitMode: false,
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 100,
    removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
    disablePlugins: ['paste', 'stat'],
    events: {},
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true
    },
    placeholder: '',
    showXPathInStatusbar: false
  };

 */
