'use client'

import { forwardRef } from 'react'
import { Card, CardContent } from '../ui/card'
import dynamic from 'next/dynamic'
import { IJodit } from 'jodit/esm/types'
import * as uuid from 'uuid'
import { toast } from '@/hooks/use-toast'

const JoditEditor = dynamic(() => import('jodit-react').then(mod => mod.default), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-muted" />,
})

const MAX_VIDEO_SIZE_MB = 98
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024

interface CustomRichTextProps {
  content: string
  onSave: (value: string) => void
}

interface FileSelectionResult {
  files: FileList | null
  cleanup: () => void
}

interface UploadResponse {
  success: boolean
  data: {
    files: Array<{
      url: string
      name: string
    }>
  }
  message?: string
}

// Helper function to create and handle file input
const createFileInput = (accept: string): Promise<FileSelectionResult> => {
  return new Promise(resolve => {
    // Create elements
    const input = document.createElement('input')
    const container = document.createElement('div')

    // Configure input
    input.type = 'file'
    input.accept = accept
    input.style.display = 'none'

    // Configure container
    container.style.display = 'none'
    container.appendChild(input)
    document.body.appendChild(container)

    // Cleanup function
    const cleanup = () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    }

    // Handle file selection
    input.onchange = () => {
      resolve({
        files: input.files,
        cleanup,
      })
    }

    // Handle cancellation
    input.oncancel = () => {
      resolve({
        files: null,
        cleanup,
      })
    }

    // Trigger file selection
    input.click()
  })
}

// Helper function to upload file
const uploadFile = async (file: File, uploadUrl: string): Promise<UploadResponse | null> => {
  const formData = new FormData()
  formData.append('files', file)

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    console.error(`Upload failed with status ${response.status}`)
    return null
  }

  return response.json()
}

const formatFileSize = (bytes: number): string => {
  const mb = bytes / (1024 * 1024)
  return mb.toFixed(2) + ' MB'
}

const validateVideoSize = (file: File): { valid: boolean; message?: string } => {
  if (file.size > MAX_VIDEO_SIZE_BYTES) {
    return {
      valid: false,
      message: `Video size (${formatFileSize(file.size)}) exceeds maximum allowed size of ${MAX_VIDEO_SIZE_MB}MB`,
    }
  }
  return { valid: true }
}

const CustomRichTextEditor = forwardRef<HTMLDivElement, CustomRichTextProps>(
  function CustomRichTextEditor(props: CustomRichTextProps, ref) {
    const config = {
      showXPathInStatusbar: false,
      showCharsCounter: true,
      showWordsCounter: true,
      createAttributes: {
        ol: {
          style: {
            'list-style-position': 'inside',
          },
        },
        ul: {
          style: {
            'list-style-position': 'inside',
          },
        },
      },
      controls: {
        paragraph: {
          list: {
            p: 'Normal',
            h1: 'Heading 1',
            h2: 'Heading 2',
            h3: 'Heading 3',
            h4: 'Heading 4',
            h5: 'Heading 5',
            h6: 'Heading 6',
            blockquote: 'Quote',
            pre: 'Source code',
            code: 'Code',
          },
        },
        symbols: {
          icon: '😊',
          name: '😊',
          tooltip: 'Insert Special Character 😊',
          title: 'Special Character',
        },
      },
      height: 300,
      readonly: false,
      toolbar: true,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      enableDragAndDropFileToEditor: true,
      spellcheck: true,
      triggerChangeEvent: true,
      showFoldersPanel: false,
      createNewFolder: false,
      deleteFolder: false,
      moveFolder: false,
      moveFile: false,
      showPreviewNavigation: true,
      showSelectButtonInPreview: true,
      sort: true,
      preview: true,
      enter: 'br' as 'br',
      zIndex: 0,
      useSplitMode: false,
      extraButtons: [
        {
          name: 'uploadVideo',
          icon: 'video',
          tooltip: 'Upload Video',
          exec: async function (editor: IJodit) {
            if (!editor || !editor.s) {
              console.error('Editor instance not available')
              return
            }

            try {
              const { files, cleanup } = await createFileInput('video/mp4,video/webm,video/ogg')
              const file = files && files[0]
              if (file) {
                try {
                  const validation = validateVideoSize(file)
                  if (!validation.valid) {
                    toast({
                      description: validation.message || 'File size error',
                      variant: 'destructive',
                    })
                    cleanup()
                    return
                  }

                  const result = await uploadFile(
                    file,
                    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/media/upload`,
                  )
                  if (result?.success && result?.data.files && result?.data?.files[0]) {
                    const videoUrl = result?.data.files[0].url
                    const fileExtension = file.name.split('.').pop() || ''

                    const videoHtml = `
                      <video id="${uuid.v4()}" controls>
                        <source src="${videoUrl}" type="video/${fileExtension}">
                        Your browser does not support the video tag.
                      </video>
                    `
                    editor.s.insertHTML(videoHtml)
                  }
                } catch (error) {
                  console.error('Error uploading video:', error)
                  if (editor.e && editor.e.fire) {
                    editor.e.fire('errorMessage', 'Failed to upload video')
                  }
                }
              }

              cleanup()
            } catch (error) {
              console.error('Error in video upload process:', error)
              if (editor.e && editor.e.fire) {
                editor.e.fire('errorMessage', 'Error processing video upload')
              }
            }
          },
        },
      ],
      removeButtons: [
        'about',
        'video',
        'superscript',
        'subscript',
        'file',
        'cut',
        'superscript',
        'file',
        'print',
        'symbol',
      ],
      events: {
        afterInit: (jodit: any) => {
          // Add custom styles after initialization
          const style = document.createElement('style')
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
        `
          jodit.ownerDocument.head.appendChild(style)
        },
      },
      clearHTML: {
        timeout: 0,
        removeEmptyElements: true,
        fillEmptyParagraph: true,
        replaceNBSP: false,
      },
      usePopupForSpecialCharacters: true,
      specialCharacters: [
        '😀',
        '😃',
        '😄',
        '😁',
        '😆',
        '😅',
        '😂',
        '🤣',
        '😊',
        '😇',
        '🙂',
        '🙃',
        '😉',
        '😌',
        '😍',
        '🥰',
        '😘',
        '😗',
        '😙',
        '😚',
        '😋',
        '😜',
        '😝',
        '😛',
        '🤑',
        '🤗',
        '🤭',
        '🤫',
        '🤔',
        '🤐',
        '🤨',
        '😐',
        '😑',
        '😶',
        '😏',
        '😒',
        '🙄',
        '😬',
        '🤥',
        '😌',
        '😔',
        '😪',
        '🤤',
        '😴',
        '😷',
        '🤒',
        '🤕',
        '🤢',
        '🤮',
        '🤧',
        '😵',
        '🤯',
        '🤠',
        '🥳',
        '🥺',
        '😳',
        '😡',
        '😠',
        '🤬',
        '😤',
        '😩',
        '😫',
        '😰',
        '😱',
        '🥵',
        '🥶',
        '😓',
        '😥',
        '😢',
        '😭',
        '😤',
        '😮',
        '🤯',
        '😲',
        '🤥',
        '😏',
        '😜',
        '😛',
        '🧑',
        '👩',
        '👨',
        '👧',
        '👦',
        '👶',
        '🧒',
        '👩‍🦱',
        '👨‍🦱',
        '👩‍🦰',
        '👨‍🦰',
        '👩‍🦳',
        '👨‍🦳',
        '👩‍🦲',
        '👨‍🦲',
        '🧔',
        '🧔‍♂️',
        '🧔‍♀️',
        '👳',
        '👳‍♂️',
        '👳‍♀️',
        '👲',
        '🧕',
        '🧙',
        '🧚',
        '🧛',
        '🧜',
        '🧝',
        '🧞',
        '🧟',
        '💆',
        '💇',
        '🧖',
        '🧗',
        '🧘',
        '🐶',
        '🐱',
        '🐭',
        '🐹',
        '🐰',
        '🦊',
        '🐻',
        '🐼',
        '🐨',
        '🐯',
        '🦁',
        '🐮',
        '🐷',
        '🐽',
        '🐸',
        '🐵',
        '🙈',
        '🙉',
        '🙊',
        '🐒',
        '🐔',
        '🐧',
        '🐦',
        '🐤',
        '🐣',
        '🐥',
        '🦆',
        '🦅',
        '🦉',
        '🦇',
        '🐺',
        '🐗',
        '🐴',
        '🦄',
        '🐝',
        '🐛',
        '🦋',
        '🐌',
        '🐞',
        '🐜',
        '🪲',
        '🪳',
        '🍏',
        '🍎',
        '🍐',
        '🍊',
        '🍋',
        '🍌',
        '🍉',
        '🍇',
        '🍓',
        '🫐',
        '🥝',
        '🍒',
        '🍑',
        '🥭',
        '🍍',
        '🥥',
        '🥑',
        '🍆',
        '🥔',
        '🥕',
        '🌽',
        '🌶',
        '🥒',
        '🥬',
        '🥦',
        '🧄',
        '🧅',
        '🍄',
        '🥜',
        '🌰',
        '🍞',
        '🥖',
        '🥨',
        '🥯',
        '🧇',
        '🧀',
        '🥗',
        '🥘',
        '🥙',
        '🥪',
        '🌮',
        '🌯',
        '🚗',
        '🚕',
        '🚙',
        '🚌',
        '🚎',
        '🏎',
        '🚓',
        '🚑',
        '🚒',
        '🚐',
        '🛻',
        '🚚',
        '🚛',
        '🚜',
        '🛵',
        '🏍',
        '🛺',
        '🚲',
        '🛴',
        '🚨',
        '🚔',
        '🚍',
        '🚘',
        '🚖',
        '🚡',
        '🚠',
        '🚟',
        '🚃',
        '🚋',
        '🚞',
        '🚝',
        '🚄',
        '🚅',
        '🚈',
        '🚂',
        '🚆',
        '🚇',
        '🚊',
        '🚉',
        '✈️',
        '🛫',
        '🛬',
        '⌚',
        '📱',
        '📲',
        '💻',
        '⌨️',
        '🖥️',
        '🖨️',
        '🖱️',
        '🖲️',
        '🕹️',
        '🗜️',
        '💽',
        '💾',
        '💿',
        '📀',
        '📼',
        '📷',
        '📸',
        '📹',
        '🎥',
        '📽️',
        '🎞️',
        '📞',
        '☎️',
        '📟',
        '📠',
        '🇺🇸',
        '🇨🇦',
        '🇬🇧',
        '🇫🇷',
        '🇩🇪',
        '🇮🇹',
        '🇪🇸',
        '🇯🇵',
        '🇨🇳',
        '🇷🇺',
        '🇧🇷',
        '🇮🇳',
        '🇰🇷',
        '🇲🇽',
        '🇿🇦',
        '🇦🇺',
        '🇳🇬',
        '🇦🇪',
        '🇸🇦',
        '🇹🇷',
        '🇮🇷',
      ],
      uploader: {
        url: `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/media/upload`,
        insertImageAsBase64URI: false,
        imagesExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        filesVariableName: (i: number): string => {
          return `files`
        },
        process: (resp: any) => {
          return {
            files: resp.data.files.map((file: any) => ({
              url: file.url,
              name: file.name,
            })),
            error: resp.success ? 0 : 1,
            message: resp.message,
          }
        },
        defaultHandlerSuccess: function (this: any, response: any) {
          if (response.files && response.files.length > 0) {
            response.files.forEach((fileInfo: any) => {
              if (fileInfo.url) {
                try {
                  if (this && this.s) {
                    this.s.insertImage(fileInfo.url)
                  }
                } catch (error) {
                  console.error('Error inserting image:', error)
                }
              }
            })
          }
        },
      },
      filebrowser: {
        ajax: {
          cache: true,
          url: `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/media/filebrowser`,
          method: 'GET',
          process: (resp: any) => {
            if (!resp.success) {
              throw new Error(resp.message)
            }

            return resp
          },
        },
        layoutImage: 'tiles',
        sortBy: 'changed-desc',
        showFoldersPanel: true,
        storeLastOpenedFolder: true,
        buttons: ['filebrowser.select'],
      },
    }

    return (
      <Card className="w-full p-0">
        <CardContent className="p-0">
          <JoditEditor
            value={props.content}
            config={config}
            onBlur={e => props.onSave?.(e || '')}
          />
        </CardContent>
      </Card>
    )
  },
)

CustomRichTextEditor.displayName = 'CustomRichTextEditor'

export default CustomRichTextEditor
