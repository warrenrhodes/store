'use client'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/third_party/embedly.min.js'
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/save.min.js'
import 'froala-editor/js/third_party/font_awesome.min.js'
import 'froala-editor/js/third_party/image_tui.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@clerk/nextjs'
import { X } from 'lucide-react'
import { PreviewText } from './PreviewText'
import SpeechToText from '../plugin/SpeechToText'
import EmojiPicker from '../plugin/EmojiPicker'

interface FroalaEditorInstance {
  opts: {
    imageUploadURL: string
    videoUploadURL: string
  }
  destroy: () => void
}

// Component props
interface CustomRichTextProps {
  content: string
  onSave: (value: string) => void
  onClose: () => void
}

const MAX_VIDEO_FILE_SIZE = 100 * 1024 * 1024

function RichTextV2(props: CustomRichTextProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorInstanceRef = useRef<any>(null)
  const { getToken } = useAuth()

  const adminDashboardUrl = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL

  const handleInitialize = useCallback((editor: any) => {
    editorInstanceRef.current = editor
  }, [])

  useEffect(() => {
    return () => {
      if (
        editorInstanceRef.current?.destroy &&
        typeof editorInstanceRef.current.destroy === 'function'
      ) {
        try {
          editorInstanceRef.current.destroy()
        } catch (error) {
          console.error('Error destroying editor:', error)
        }
      }
    }
  }, [])

  const insertMedia = useCallback((mediaUrl: string, isImage: boolean) => {
    if (editorInstanceRef.current) {
      const editor = editorInstanceRef.current
      if (isImage) {
        editor.image.insert(mediaUrl, null, null, editor.image.get())
        return
      }
      editor.html.insert(
        `<video src="${mediaUrl}" style="width: 600px;" controls="" class="fr-draggable">Your browser does not support HTML5 video.</video>`,
      )
    }
  }, [])

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file) return

      const isImage = file.type.startsWith('image/')
      const isValidSize = isImage ? file.size < 5 * 1024 * 1024 : file.size < MAX_VIDEO_FILE_SIZE

      if (!isValidSize) {
        toast({
          description: 'File size must be less than 5MB',
          variant: 'destructive',
        })
        return
      }

      try {
        const formData = new FormData()
        formData.append('files', file)

        const authToken = await getToken()

        const response = await fetch(
          adminDashboardUrl ? `${adminDashboardUrl}/api/media/upload` : '/api/media/upload',
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        )
        if (!response.ok) {
          const errorText = await response.text()
          console.error('Upload error details:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            errorText,
          })
          throw new Error(`Upload failed: ${response.status} ${response.statusText}\n${errorText}`)
        }

        const result = await response.json()

        if (result.link) {
          insertMedia(result.link, isImage)
          toast({
            description: 'Image uploaded successfully',
          })
        } else if (result.data?.files?.[0]?.url) {
          // Handle the case where the URL is in a different structure
          insertMedia(result.data.files[0].url, isImage)
          toast({
            description: 'Media uploaded successfully',
          })
        } else {
          console.error('Unexpected response structure:', result)
          throw new Error(result.error || 'Failed to upload image')
        }
      } catch (error) {
        console.error('Error uploading media:', error)
        toast({
          description: 'Failed to upload media. Please try again.',
          variant: 'destructive',
        })
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    },
    [adminDashboardUrl, getToken, insertMedia],
  )

  const config = useMemo(
    () => ({
      placeholderText: 'Edit Your Content!',
      charCounterCount: true,
      key: 'YOUR-FROALA-LICENSE-KEY',
      toolbarStickyOffset: 50,
      saveInterval: 6000,
      toolbarBottom: false,
      toolbarSticky: false,
      toolbarButtons: {
        moreText: {
          buttons: [
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'subscript',
            'superscript',
            'fontFamily',
            'fontSize',
            'textColor',
            'backgroundColor',
            'inlineClass',
            'inlineStyle',
            'clearFormatting',
          ],
        },

        moreParagraph: {
          buttons: [
            'alignLeft',
            'alignCenter',
            'formatOLSimple',
            'alignRight',
            'alignJustify',
            'formatOL',
            'formatUL',
            'paragraphFormat',
            'paragraphStyle',
            'lineHeight',
            'outdent',
            'indent',
            'quote',
          ],
        },
        moreRich: {
          buttons: [
            'insertLink',
            'insertImage',
            'insertVideo',
            'insertTable',
            'emoticons',
            'fontAwesome',
            'specialCharacters',
            'embedly',
            'insertFile',
            'insertHR',
          ],
        },
        moreMisc: {
          buttons: ['undo', 'redo', 'fullscreen', 'print', 'selectAll', 'html'],

          align: 'right',

          buttonsVisible: 2,
        },
      },
      imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
      imageMaxSize: 5 * 1024 * 1024,
      imageDefaultWidth: 150,
      heightMin: 500,
      imageUpload: true,
      imageManagerLoadURL: '/api/media/filebrowser',
      imageUploadParam: 'files',
      imageDefaultAlign: 'left',
      imageDefaultDisplay: 'inline-block',
      imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
      imageResizeWithPercent: true,
      videoMaxSize: MAX_VIDEO_FILE_SIZE,
      videoUpload: true,
      videoUploadURL: '/api/media/upload',
      videoInsertButtons: ['videoUpload', 'videoByURL'],
      videoAllowedTypes: ['mp4', 'webm', 'ogg'],
      videoDefaultDisplay: 'inline',
      videoResizeWithPercent: true,
      tableStyles: {
        'table-bordered': 'Bordered',
        'table-striped': 'Striped',
        'table-hover': 'Hover',
      },
      tableResizer: true,
      tableResizerOffset: 10,
      tableDefaultWidth: '100%',
      events: {
        'save.before': function (html: string) {
          props.onSave(html)
        },
        'image.beforeUpload': async function (this: any, images: any) {
          const file = images[0]

          await handleFileUpload(file)

          return false
        },
        'image.error': function (error: any) {
          if (error?.status === 404 && !error?.body) {
            return
          }
          console.error('Image upload error:', error)
          toast({
            description: 'Image upload failed. Please try again.',
            variant: 'destructive',
          })
        },
        'video.beforeUpload': async function (this: any, videos: any) {
          const file = videos[0]
          await handleFileUpload(file)

          return false
        },
        'video.error': function (error: any) {
          if (error?.status === 404 && !error?.body) {
            return false
          }
          toast({
            description: 'Video upload failed. Please try again.',
            variant: 'destructive',
          })

          return false
        },
        initialized: function (this: any) {
          handleInitialize(this)
        },
        error: function (this: FroalaEditorInstance, error: unknown) {
          console.error('Froala Editor Error:', error)
          if (this.opts) {
            this.opts.imageUploadURL = '/api/media/upload'
            this.opts.videoUploadURL = '/api/media/upload'
          }
        },
        destroy: function (this: any) {
          editorInstanceRef.current = null
        },
      },
    }),
    [handleFileUpload, handleInitialize, props],
  )

  if (!process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL) {
    console.error('Missing NEXT_PUBLIC_ADMIN_DASHBOARD_URL environment variable')
  }

  const handleSpeechTranscript = useCallback((transcript: string, isEmoticon: boolean) => {
    if (editorInstanceRef.current) {
      const editor = editorInstanceRef.current
      if (isEmoticon) {
        editor.emoticons.insert(transcript)
      } else {
        editor.html.insert(`${transcript} `) // Add a space after each insertion
      }
      editor.events.focus()
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Editor</h2>
          <PreviewText content={props.content} />
        </div>

        <button
          onClick={props.onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
          title="Close"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1  p-4 overflow-scroll h-full gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <SpeechToText onTranscript={value => handleSpeechTranscript(value, false)} />
            <EmojiPicker onSelect={value => handleSpeechTranscript(value, true)} />
          </div>
          <div className="overflow-auto">
            <FroalaEditor
              ref={editorInstanceRef}
              tag="textarea"
              model={props.content}
              config={config}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RichTextV2
