import { useToast } from '@/hooks/use-toast'
import { Film, ImageIcon, Loader2, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'
import { Media, MediaType } from '@/lib/firebase/models'
export enum MediaIdentity {
  'ID' = 'ID',
  'URL' = 'URL',
}

interface FileUploaderProps {
  medias: Media[]
  setContent: (value: Media[]) => void
  fileType: MediaType
  maxFiles?: number
  maxFileSize?: number
  multiple?: boolean
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  medias,
  setContent,
  fileType = MediaType.IMAGE,
  maxFiles = 5,
  maxFileSize = 5 * 1024 * 1024, // 5MB
  multiple = true,
}) => {
  const { toast } = useToast()
  const [files, setFiles] = useState<(File | Media)[]>(medias)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getMediaTypeText = (type: MediaType) => {
    switch (type) {
      case MediaType.IMAGE:
        return 'images (JPEG, PNG, GIF, WEBP)'
      case MediaType.VIDEO:
        return 'videos (MP4, WEBM, OGG)'
      default:
        return 'files'
    }
  }
  const validateFile = useCallback(
    (file: File) => {
      const fileType = file.type.split('/')[0]
      if (fileType === MediaType.IMAGE && ![MediaType.IMAGE].includes(fileType)) {
        return 'Only image files are allowed'
      }
      if (fileType === MediaType.VIDEO && ![MediaType.VIDEO].includes(fileType)) {
        return 'Only video files are allowed'
      }
      if (file.size > maxFileSize) {
        return `File size must be less than ${maxFileSize / (1024 * 1024)}MB`
      }
      return null
    },
    [maxFileSize],
  )

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null)

      if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles.map(file => {
          if (file.size > maxFileSize) return 'File too large'
          return 'Invalid file type'
        })
        setError(errorMessages[0])
        return
      }

      // Validate each file
      for (const file of acceptedFiles) {
        const error = validateFile(file)
        if (error) {
          setError(error)
          return
        }
      }

      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`)
        return
      }

      setFiles(prev => [...prev, ...acceptedFiles])
    },
    [files.length, maxFiles, maxFileSize, validateFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      fileType === MediaType.VIDEO
        ? {
            'video/*': ['.mp4', '.webm', '.ogg'],
          }
        : { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    maxSize: maxFileSize,
    multiple: multiple, // Use the multiple prop to determine if multiple files can be selected
  })

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
    if (files.length === 1) {
      setContent([])
    }
    setError(null)
  }
  const renderPreview = (file: File | Media, index: number) => {
    if ('url' in file) {
      return <ImageRender key={index} mediaUrl={file.url} removeFile={() => removeFile(index)} />
    } else {
      const isVideo = file.type.startsWith('video/')
      const isImage = file.type.startsWith('image/')

      return (
        <div key={index} className="relative group">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
            {isImage && (
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                fill
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {isVideo && (
              <div className="relative w-full h-full">
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                  onLoadedMetadata={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Film className="w-8 h-8 text-white" />
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-1 left-1 right-1 px-2 py-1 text-xs text-white bg-black/50 rounded truncate">
            {file.name}
          </div>
          <button
            onClick={e => {
              e.stopPropagation()
              removeFile(index)
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5
                    shadow-lg transition-opacity"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  }
  const updateFile = async (files: File[]): Promise<Media[] | null> => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append(`files`, file)
    })
    const result = await fetch('/api/media/upload', {
      method: 'POST',
      body: formData,
    })

    if (result.ok) {
      const data = await result.json()
      return data.data.files
    }
    return null
  }

  const handleImport = async () => {
    const existingFiles = files.filter(f => 'url' in f) as Media[]
    const updatedFiles = files.filter(f => f instanceof File)
    if (files.length === 0) {
      setError('Please select at least one file')
      return
    }

    setIsLoading(true)
    try {
      const result = await updateFile(updatedFiles)
      if (result) {
        existingFiles.push(...result)
        setIsLoading(false)
        toast({ description: 'File uploaded successfully!' })
        setContent(existingFiles)
        return
      }
      setError(null)
      setIsLoading(false)
      toast({ description: 'Failed to upload file' })
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      setError('Upload failed. Please try again.')
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white shadow-lg p-6">
        <div
          {...getRootProps()}
          className={`relative rounded-lg border-2 border-dashed transition-colors
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
              ${error ? 'border-red-500' : ''}
              hover:border-blue-500`}
        >
          <input {...getInputProps()} id="fileInput" />
          <div className="p-8 text-center">
            {fileType === MediaType.IMAGE ? (
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            ) : fileType === MediaType.VIDEO ? (
              <Film className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            ) : (
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            )}
            <p className="text-base text-gray-600">
              {isDragActive ? (
                <span className="text-blue-500">Drop files here...</span>
              ) : (
                <span>
                  Drag & drop {getMediaTypeText(fileType)}, or{' '}
                  <span className="text-blue-500 cursor-pointer">browse</span>
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Maximum {maxFiles} files, up to {maxFileSize / (1024 * 1024)}MB each
            </p>
          </div>
        </div>

        {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

        {files.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((file, index) => renderPreview(file, index))}
            </div>
          </div>
        )}

        <div className="mt-6 border-t border-gray-200 pt-6 flex gap-4">
          <Button
            onClick={() => {
              setFiles([])
              setError(null)
            }}
            variant="outline"
            className="flex-1"
            disabled={isLoading || files.length === 0}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-md"
            disabled={isLoading || files.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Save Data'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

const ImageRender = ({ mediaUrl, removeFile }: { mediaUrl: string; removeFile: () => void }) => {
  return (
    <div className="relative group">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        {!mediaUrl ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Image
            src={mediaUrl}
            alt={`Preview image`}
            fill
            className="w-full h-full object-cover rounded-lg"
            onLoad={() => URL.revokeObjectURL(mediaUrl || '')}
            sizes="(max-width: 768px) 100vw,"
          />
        )}
      </div>
      <button
        onClick={e => {
          e.stopPropagation()
          removeFile()
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5
          shadow-lg transition-opacity"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
