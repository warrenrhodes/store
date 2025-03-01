import { create } from 'zustand'
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  AuthError,
} from 'firebase/auth'
import { getAuthErrorMessage } from '@/lib/firebase/firebase-client/error-handler'
import { auth } from '@/lib/firebase/firebase-client/firebase'
import { setUser, getUserById } from '@/lib/actions/client'
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserType } from '@/lib/firebase/models'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: get()?.user || null,
      loading: false,
      error: null,
      setUser: user => set({ user }),
      setLoading: loading => set({ loading }),
      setError: error => set({ error }),
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

          set({ user: userCredential.user })
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
            name: name,
            authId: userCredential.user.uid,
            photoURL: null,
            userType: UserType.PARTNER,
            createdAtInUTC: new Date().toISOString(),
          }

          const result = await setUser(userData)
          if (!result) {
            set({
              error: getAuthErrorMessage('auth/failed-to-add-user'),
              loading: false,
            })
            return
          }

          await sendEmailVerification(userCredential.user)
          set({ user: userCredential.user })
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

          // If user doesn't exist, create them
          if (!isUserExist) {
            const result = await setUser({
              email: userCredential.user.email,
              name: userCredential.user.displayName,
              authId: userCredential.user.uid,
              photoURL: userCredential.user.photoURL,
              userType: UserType.PARTNER,
              createdAtInUTC: new Date().toISOString(),
            })
            if (!result) {
              console.log('ufail to update the userser not exist22222222222')
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
          set({ user: userCredential.user, loading: false })
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
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
export { useAuthStore }
