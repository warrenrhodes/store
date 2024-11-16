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
      ajax: {
        cache: true,
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/filebrowser`,
        method: "GET",
        // method: "POST",
        // prepareData: (data: any) => {
        //   return {
        //     path: data.path || "noting",
        //     search: data.search || "noting",
        //     sortBy: data.sortBy || "changed-desc",
        //   };
        // },
        process: (resp: any) => {
          console.log("resp", resp);
          if (!resp.success) {
            throw new Error(resp.message);
          }
          return resp;
        },
      },
      // defaultCallback: (data: any) => {
      //   // Handle selected file
      //   if (data.files && data.files.length) {
      //     return data.files[0].url;
      //   }
      // },
      getThumbTemplate: function (
        this: any,
        item: any,
        source: any,
        source_name: string
      ) {
        console.log("item", item);
        const opt = this.options,
          IC = this.files.getFullElName("item"),
          showName = opt.showFileName,
          showSize = opt.showFileSize && item.size,
          showTime = opt.showFileChangeTime && item.time;

        let name: string = "";

        if (item.file !== undefined) {
          name = item.file;
        }

        const info = `<div class="${IC}-info">${
          showName ? `<span class="${IC}-info-filename">${name}</span>` : ""
        }${
          showSize
            ? `<span class="${IC}-info-filesize">${item.size}</span>`
            : ""
        }${
          showTime
            ? `<span class="${IC}-info-filechanged">${showTime}</span>`
            : ""
        }</div>`;

        return `<a
          data-jodit-file-browser-item="true"
          data-is-file="${item.isImage ? 0 : 1}"
          draggable="true"
          class="${IC}"
          href="${item.fileURL}"
          data-source="${source_name}"
          data-path="${item.path}"
          data-name="${name}"
          title="${name}"
          data-url="${item.fileURL}">
            <img
              data-is-file="${item.isImage ? 0 : 1}"
              data-src="${item.fileURL}"
              src="${item.imageURL}"
              alt="${name}"
              loading="lazy"
            />
            ${showName || showSize || showTime ? info : ""}
          </a>`;
      },
      layoutImage: "tiles",
      filter: (file: string) => {
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
      },
      sortBy: "changed-desc",
      buttons: ["filebrowser.update", "filebrowser.select"],
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
