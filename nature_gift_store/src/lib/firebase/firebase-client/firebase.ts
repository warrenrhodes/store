import { clientConfig } from 'config'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0]
const auth = getAuth(app)

setPersistence(auth, inMemoryPersistence)
const db = getFirestore(app)

export { auth, db, app }
