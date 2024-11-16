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
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    extraButtons: ["symbol"],
    removeButtons: [
      "about",
      "video",
      "superscript",
      "subscript",
      "file",
      "cut",
    ],
    usePopupForSpecialCharacters: true,
    specialCharacters: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "😚",
      "😋",
      "😛",
      "😝",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😎",
      "🤩",
      "🥳",
      "😏",
      "😒",
      "😞",
      "😔",
      "😟",
      "😕",
      "🙁",
      "☹️",
      "😣",
      "😖",
      "😫",
      "😩",
      "🥺",
      "😢",
      "😭",
      // Add more emojis as needed
    ],
    uploader: {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/upload`,
      insertImageAsBase64URI: false,
      imagesExtensions: ["jpg", "jpeg", "png", "gif", "webp"],
      filesVariableName: (i: number): string => {
        return `files`;
      },
      // withCredentials: true,
      process: (resp: any) => {
        return {
          files: resp.files.map((file: any) => ({
            url: file.file.url,
            name: file.file.name,
          })),
          error: resp.success ? 0 : 1,
          message: resp.message,
        };
      },
      defaultHandlerSuccess: function (this: any, response: any) {
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
      ajax: {
        cache: true,
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/filebrowser`,
        method: "GET",
        process: (resp: any) => {
          if (!resp.success) {
            throw new Error(resp.message);
          }
          return resp;
        },
      },
      layoutImage: "tiles",
      filter: (file: string) => {
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
      },
      sortBy: "changed-desc",
      buttons: [
        "filebrowser.upload",
        "filebrowser.remove",
        "filebrowser.update",
        "filebrowser.tiles",
        "filebrowser.list",
        "filebrowser.select",
      ],
      cropWidth: 1000,
      cropHeight: 1000,
      showFoldersPanel: false,
      createNewFolder: false,
      deleteFolder: false,
      moveFolder: false,
      moveFile: false,
      showPreviewNavigation: true,
      showSelectButtonInPreview: true,
      contextMenu: true,
      howLongShowMsg: 3000,
      sort: true,
      preview: true,
      pageSize: 20,
    },
    events: {
      afterUpload: (response: any) => {
        console.log("After upload event:", response);
      },
      errorHandler: (error: Error, data: any) => {
        console.error("Upload error:", error, data);
      },
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
