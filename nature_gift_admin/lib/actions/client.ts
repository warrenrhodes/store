export const uploadImages = async (files: File[], token: string): Promise<string | null> => {
  const formData = new FormData()
  files.forEach(file => {
    formData.append(`files`, file)
  })
  const result = await fetch('/api/media/upload', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (result.ok) {
    const data = await result.json()
    return data.data.files[0].url
  }
  return null
}

export const getMediaById = async (mediaId: string, token: string): Promise<string | null> => {
  const media = await fetch(`/api/media/${mediaId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (media.ok) {
    const url = await media.json()
    return url.mediaUrl
  }
  return null
}
