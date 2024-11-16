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
    createAttributes: {
      ol: {
        style: {
          "list-style-position": "inside",
        },
      },
      ul: {
        style: {
          "list-style-position": "inside",
        },
      },
    },
    controls: {
      paragraph: {
        list: {
          p: "Normal",
          h1: "Heading 1",
          h2: "Heading 2",
          h3: "Heading 3",
          h4: "Heading 4",
          h5: "Heading 5",
          h6: "Heading 6",
          blockquote: "Quote",
          pre: "Source code",
          code: "Code",
        },
      },
    },
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
    sort: true,
    preview: true,
    // beautifyHTML: true,
    // enter: "br" as "br",
    removeButtons: [
      "about",
      "video",
      "superscript",
      "subscript",
      "file",
      "cut",
    ],
    events: {
      afterInit: (jodit: any) => {
        // Add custom styles after initialization
        const style = document.createElement("style");
        style.innerHTML = `
          .jodit-wysiwyg {
            padding: 10px;
          }
          .jodit-wysiwyg h1 {
            font-size: 2em;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
            font-weight: bold;
          }
          .jodit-wysiwyg h2 {
            font-size: 1.5em;
            margin-top: 0.83em;
            margin-bottom: 0.83em;
            font-weight: bold;
          }
          .jodit-wysiwyg h3 {
            font-size: 1.17em;
            margin-top: 1em;
            margin-bottom: 1em;
            font-weight: bold;
          }
          .jodit-wysiwyg h4 {
            font-size: 1em;
            margin-top: 1.33em;
            margin-bottom: 1.33em;
            font-weight: bold;
          }
          .jodit-wysiwyg pre {
            font-family: monospace;
            white-space: pre;
            margin: 1em 0;
            padding: 1em;
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            border-radius: 4px;
            overflow-x: auto;
          }
          .jodit-wysiwyg code {
            font-family: monospace;
            background-color: #f5f5f5;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-size: 0.85em;
          }
          .jodit-wysiwyg blockquote {
            margin: 1em 0;
            padding: 0.5em 1em;
            border-left: 5px solid #ccc;
            background-color: #f9f9f9;
          }
        `;
        jodit.ownerDocument.head.appendChild(style);
      },
    },
    clearHTML: {
      timeout: 0,
      removeEmptyElements: false,
      fillEmptyParagraph: false,
      replaceNBSP: false,
    },
    cleanHTML: {
      timeout: 0,
      removeEmptyElements: false,
      fillEmptyParagraph: false,
      replaceNBSP: false,
    },
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
