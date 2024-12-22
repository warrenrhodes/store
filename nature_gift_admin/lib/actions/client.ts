export const getMediaById = async (mediaId: string): Promise<string | null> => {
  const media = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/media/${mediaId}`)
  if (media.ok) {
    const url = await media.json()
    return url.mediaUrl
  }
  return null
}

export const uploadImages = async (files: File[]): Promise<string | null> => {
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
    console.log(data.files[0].file.url)
    return data.files[0].file.url
  }
  return null
}
