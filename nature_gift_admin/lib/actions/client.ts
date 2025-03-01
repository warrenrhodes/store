import { doc, getDoc } from 'firebase/firestore'
import { getDatabasePath } from '@spreeloop/database'
import { CollectionsName } from '../firebase/collection-name'
import { db } from '../firebase/firebase-client/firebase'

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

export const getUserById = async (id: string) => {
  const userRef = doc(db, getDatabasePath(CollectionsName.Users, id))
  const docSnap = await getDoc(userRef)
  if (!docSnap.exists()) {
    return null
  }
  return docSnap.data()
}

export const setUser = async (data: any) => {
  const user = await fetch(`/api/users`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (user.ok) {
    return true
  }
  return false
}
