"use client";

import { Ref, useRef } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
const CustomRichTextEditor = ({
  content,
  onSave,
}: {
  content: string;
  onSave: (value: string) => void;
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
    triggerChangeEvent: true,
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
    beautifyHTML: true,
    list: {
      indent: 20,
      childIndent: 20,
    },
    editorClassName: "jodit-content",
    events: {
      beforeCommand: function (command: string) {
        if (
          command === "insertOrderedList" ||
          command === "insertUnorderedList"
        ) {
          return true;
        }
      },
      afterInit: function (editor: any) {
        editor.e.on("beforeCommand", (command: string) => {
          if (
            command === "insertOrderedList" ||
            command === "insertUnorderedList"
          ) {
            return true;
          }
        });
      },
      change: function (newValue: string) {
        // Ensure lists are properly formatted
        if (editor.current) {
          const jodit = editor.current;
          const content = jodit.value;
          if (content.includes("<ol") || content.includes("<ul")) {
            jodit.selection.save();
            jodit.setEditorValue(content);
            jodit.selection.restore();
          }
        }
      },
    },
    style: {
      ol: {
        "list-style-type": "decimal",
        "margin-left": "40px",
        "padding-left": "0",
      },
      ul: {
        "list-style-type": "disc",
        "margin-left": "40px",
        "padding-left": "0",
      },
    },
    css: `
      .jodit-content ol {
        list-style-type: decimal !important;
        margin-left: 40px !important;
        padding-left: 0 !important;
      }
      .jodit-content ul {
        list-style-type: disc !important;
        margin-left: 40px !important;
        padding-left: 0 !important;
      }
      .jodit-content li {
        list-style-position: outside !important;
      }
    `,
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
      "😆",
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
      "😜",
      "😝",
      "😛",
      "🤑",
      "🤗",
      "🤭",
      "🤫",
      "🤔",
      "🤐",
      "🤨",
      "😐",
      "😑",
      "😶",
      "😏",
      "😒",
      "🙄",
      "😬",
      "🤥",
      "😌",
      "😔",
      "😪",
      "🤤",
      "😴",
      "😷",
      "🤒",
      "🤕",
      "🤢",
      "🤮",
      "🤧",
      "😵",
      "🤯",
      "🤠",
      "🥳",
      "🥺",
      "😳",
      "😡",
      "😠",
      "🤬",
      "😤",
      "😩",
      "😫",
      "😰",
      "😱",
      "🥵",
      "🥶",
      "😓",
      "😥",
      "😢",
      "😭",
      "😤",
      "😮",
      "🤯",
      "😲",
      "🤥",
      "😏",
      "😜",
      "😛",
      "🧑",
      "👩",
      "👨",
      "👧",
      "👦",
      "👶",
      "🧒",
      "👩‍🦱",
      "👨‍🦱",
      "👩‍🦰",
      "👨‍🦰",
      "👩‍🦳",
      "👨‍🦳",
      "👩‍🦲",
      "👨‍🦲",
      "🧔",
      "🧔‍♂️",
      "🧔‍♀️",
      "👳",
      "👳‍♂️",
      "👳‍♀️",
      "👲",
      "🧕",
      "🧙",
      "🧚",
      "🧛",
      "🧜",
      "🧝",
      "🧞",
      "🧟",
      "💆",
      "💇",
      "🧖",
      "🧗",
      "🧘",
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐽",
      "🐸",
      "🐵",
      "🙈",
      "🙉",
      "🙊",
      "🐒",
      "🐔",
      "🐧",
      "🐦",
      "🐤",
      "🐣",
      "🐥",
      "🦆",
      "🦅",
      "🦉",
      "🦇",
      "🐺",
      "🐗",
      "🐴",
      "🦄",
      "🐝",
      "🐛",
      "🦋",
      "🐌",
      "🐞",
      "🐜",
      "🪲",
      "🪳",
      "🍏",
      "🍎",
      "🍐",
      "🍊",
      "🍋",
      "🍌",
      "🍉",
      "🍇",
      "🍓",
      "🫐",
      "🥝",
      "🍒",
      "🍑",
      "🥭",
      "🍍",
      "🥥",
      "🥑",
      "🍆",
      "🥔",
      "🥕",
      "🌽",
      "🌶",
      "🥒",
      "🥬",
      "🥦",
      "🧄",
      "🧅",
      "🍄",
      "🥜",
      "🌰",
      "🍞",
      "🥖",
      "🥨",
      "🥯",
      "🧇",
      "🧀",
      "🥗",
      "🥘",
      "🥙",
      "🥪",
      "🌮",
      "🌯",
      "🚗",
      "🚕",
      "🚙",
      "🚌",
      "🚎",
      "🏎",
      "🚓",
      "🚑",
      "🚒",
      "🚐",
      "🛻",
      "🚚",
      "🚛",
      "🚜",
      "🛵",
      "🏍",
      "🛺",
      "🚲",
      "🛴",
      "🚨",
      "🚔",
      "🚍",
      "🚘",
      "🚖",
      "🚡",
      "🚠",
      "🚟",
      "🚃",
      "🚋",
      "🚞",
      "🚝",
      "🚄",
      "🚅",
      "🚈",
      "🚂",
      "🚆",
      "🚇",
      "🚊",
      "🚉",
      "✈️",
      "🛫",
      "🛬",
      "⌚",
      "📱",
      "📲",
      "💻",
      "⌨️",
      "🖥️",
      "🖨️",
      "🖱️",
      "🖲️",
      "🕹️",
      "🗜️",
      "💽",
      "💾",
      "💿",
      "📀",
      "📼",
      "📷",
      "📸",
      "📹",
      "🎥",
      "📽️",
      "🎞️",
      "📞",
      "☎️",
      "📟",
      "📠",
      "🇺🇸",
      "🇨🇦",
      "🇬🇧",
      "🇫🇷",
      "🇩🇪",
      "🇮🇹",
      "🇪🇸",
      "🇯🇵",
      "🇨🇳",
      "🇷🇺",
      "🇧🇷",
      "🇮🇳",
      "🇰🇷",
      "🇲🇽",
      "🇿🇦",
      "🇦🇺",
      "🇳🇬",
      "🇦🇪",
      "🇸🇦",
      "🇹🇷",
      "🇮🇷",
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
    },
  };

  const handleSave = () => {
    const value = editor.current?.value;
    onSave?.(value || "");
  };

  return (
    <Card className="w-full p-0">
      <CardContent className="p-0">
        <JoditEditor ref={editor} value={content} config={config} />
        <div className="flex justify-end m-4">
          <Button onClick={handleSave}>Save Change</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomRichTextEditor;
