'use client'
import { useState } from 'react'
import { DataTable } from '@/components/custom-ui/DataTable'
import { Button } from '@/components/ui/button'
import { mediColumns as mediaColumns } from '@/components/medias/MediasColumns'
import Image from 'next/image'
import { SimpleLoader } from '@/components/custom-ui/Loader'
import { Plus, XCircle } from 'lucide-react'
import DialogBox from '@/components/custom-ui/CustomDialogue'
import { useToast } from '@/hooks/use-toast'
import { Prisma } from '@prisma/client'
import { useAuth } from '@clerk/nextjs'

interface MediaListProps {
  medias: Prisma.MediaGetPayload<{}>[]
}

export function MediaList({ medias }: MediaListProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Medias</h2>
        {/* <ImageUpload
          value={[]}
          onChange={url => {
            console.log(url)
          }}
          onRemove={url => {
            console.log(url)
          }}
        /> */}
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Media
        </Button>
      </div>
      <DataTable columns={mediaColumns} data={medias} searchKey="fileName" />
      <DialogBox open={open} setOpen={setOpen}>
        <AddMedia />
      </DialogBox>
    </div>
  )
}

const AddMedia = () => {
  const { toast } = useToast()
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const { getToken } = useAuth()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setFiles([...files, file])
  }

  const updateFile = async (file: File) => {
    const formData = new FormData()
    formData.append('files', file)

    await fetch('/api/media/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
  }

  const handleUpload = async () => {
    const updatesPromises: Promise<void>[] = []
    setUploading(true)
    for (const file of files) {
      updatesPromises.push(updateFile(file))
    }
    await Promise.allSettled(updatesPromises).then(results => {
      let isValidRequest: boolean = true
      results.forEach(result => {
        if (result.status === 'rejected') {
          isValidRequest = false
        }
      })
      if (!isValidRequest) {
        toast({
          variant: 'destructive',
          description: 'An error occurred. Please try again.',
        })
        return
      }
      window.location.href = '/medias'
    })
    setUploading(false)
  }

  const handleDeleteFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-7">
        {files.map((file, index) => (
          <div key={index} className="bg-gray-100 rounded-lg overflow-hidden relative">
            {file.type.startsWith('image/') ? (
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={300}
                height={300}
                className="w-full h-40 object-cover"
              />
            ) : file.type.startsWith('video/') ? (
              <video
                className="w-full h-40 object-cover"
                controls
                src={URL.createObjectURL(file)}
              />
            ) : (
              <div className="flex items-center justify-center h-40">
                <span className="text-gray-600">{file.name}</span>
              </div>
            )}
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-700"
              onClick={() => handleDeleteFile(index)}
            >
              <XCircle size={12} />
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <div className="flex justify-end mt-4">
        {uploading ? (
          <SimpleLoader />
        ) : (
          <Button variant="default" onClick={handleUpload} disabled={files.length < 1}>
            Save
          </Button>
        )}
      </div>
    </div>
  )
}
