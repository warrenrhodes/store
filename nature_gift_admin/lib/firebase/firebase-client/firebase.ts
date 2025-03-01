import { clientConfig } from '@/config'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db, app }
