'use client'
import { create } from 'zustand'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  AuthError,
  signInAnonymously,
  EmailAuthProvider,
  linkWithCredential,
} from 'firebase/auth'
import { getAuthErrorMessage } from '@/lib/firebase/firebase-client/error-handler'
import { auth, db } from '@/lib/firebase/firebase-client/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { getDatabasePath } from '@spreeloop/database'
import { User, UserType } from '@/lib/firebase/models'
import { getEdgeToken } from './get_token.action'

export const getUserById = async (id: string) => {
  const userRef = doc(db, getDatabasePath(CollectionsName.Users, id))
  const docSnap = await getDoc(userRef)
  if (!docSnap.exists()) {
    return null
  }
  return docSnap.data()
}

export const setToDatabaseUser = async (data: any) => {
  const user = await fetch(`/api/user`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (user.ok) {
    return true
  }
  return false
}

interface AuthState {
  user: Omit<User, 'whitelists' | 'createdAt' | 'updatedAt'> | null
  loading: boolean
  error: string | null
  initializeAuth: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  convertAnonymous: (email: string, password: string, name: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const useAuthStore = create<AuthState>(set => ({
  user: null,
  loading: false,
  error: null,
  setUser: user => set({ user }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  initializeAuth: async () => {
    try {
      set({ loading: true, error: null })
      const currentToken = await getEdgeToken()

      if (currentToken.decodedToken) {
        set({
          user: {
            email: currentToken.decodedToken.email,
            fullName: currentToken.decodedToken.name,
            authId: currentToken.decodedToken.uid,
            photoURL: currentToken.decodedToken.picture,
            isAnonymous: !currentToken.decodedToken.email_verified,
            userType: UserType.CLIENT,
          },
        })
      }
    } catch (error) {
      const authError = error as AuthError
      set({ error: getAuthErrorMessage(authError.code) })
    } finally {
      set({ loading: false })
    }
  },
  convertAnonymous: async (email, password, name) => {
    try {
      set({ loading: true, error: null })
      const currentUser = auth.currentUser

      if (!currentUser?.isAnonymous) {
        throw new Error('User is not anonymous')
      }

      const credential = EmailAuthProvider.credential(email, password)
      const userCredential = await linkWithCredential(currentUser, credential)

      await updateProfile(userCredential.user, {
        displayName: name,
      })

      const userData = {
        email: email,
        fullName: name,
        authId: userCredential.user.uid,
        photoURL: userCredential.user.photoURL,
        isAnonymous: userCredential.user.isAnonymous,
        userType: UserType.CLIENT,
        createdAtInUTC: new Date().toISOString(),
      }

      await setToDatabaseUser(userData)
      await sendEmailVerification(userCredential.user)

      set({ user: userData })
    } catch (error) {
      const authError = error as AuthError
      set({ error: getAuthErrorMessage(authError.code) })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null })
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      const userData = {
        email: email,
        fullName: null,
        authId: userCredential.user.uid,
        photoURL: userCredential.user.photoURL,
        isAnonymous: userCredential.user.isAnonymous,
        userType: UserType.CLIENT,
      }

      set({ user: userData })
    } catch (error) {
      const authError = error as AuthError
      set({ error: getAuthErrorMessage(authError.code), loading: false })
      throw error
    }
  },

  signUp: async (email, password, name) => {
    try {
      set({ loading: true, error: null })
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update Firebase profile
      await updateProfile(userCredential.user, {
        displayName: name,
      })

      // Store user in firebase
      const userData = {
        email: email,
        fullName: name,
        authId: userCredential.user.uid,
        photoURL: null,
        isAnonymous: userCredential.user.isAnonymous,
        userType: UserType.CLIENT,
        createdAtInUTC: new Date().toISOString(),
      }

      const result = await setToDatabaseUser(userData)
      if (!result) {
        set({
          error: getAuthErrorMessage('auth/failed-to-add-user'),
          loading: false,
        })
        return
      }

      await sendEmailVerification(userCredential.user)
      set({ user: userData })
    } catch (error) {
      const authError = error as AuthError
      set({ error: getAuthErrorMessage(authError.code), loading: false })
      throw error
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null })
      const provider = new GoogleAuthProvider()

      const userCredential = await signInWithPopup(auth, provider)

      // Check if user exists in database
      const isUserExist = await getUserById(userCredential.user.uid)
      const userData = {
        email: userCredential.user.email,
        fullName: userCredential.user.displayName,
        authId: userCredential.user.uid,
        photoURL: userCredential.user.photoURL,
        isAnonymous: userCredential.user.isAnonymous,
        userType: UserType.CLIENT,
        createdAtInUTC: new Date().toISOString(),
      }
      // If user doesn't exist, create them
      if (!isUserExist) {
        const result = await setToDatabaseUser({
          ...userData,
        })
        if (!result) {
          set({
            error: getAuthErrorMessage('auth/failed-to-add-user'),
            loading: false,
          })
          return
        }
      }
      const idToken = await userCredential.user.getIdToken()

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      set({ user: userData, loading: false })
    } catch (error) {
      const authError = error as AuthError
      set({ error: getAuthErrorMessage(authError.code), loading: false })
      throw error
    }
  },

  resetPassword: async email => {
    try {
      set({ loading: true, error: null })
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      const authError = error as AuthError
      set({ error: getAuthErrorMessage(authError.code) })
      throw error
    } finally {
      set({ loading: false })
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null })
      await signOut(auth)
      await signInAnonymously(auth)
      await fetch('/api/logout')
      set({ user: null })
    } catch (error) {
      const authError = error as AuthError
      set({ error: getAuthErrorMessage(authError.code) })
      throw error
    } finally {
      set({ loading: false })
    }
  },
}))

export { useAuthStore }
