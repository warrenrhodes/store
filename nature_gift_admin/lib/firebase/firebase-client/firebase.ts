import { clientConfig } from '@/config'
import { initializeApp, getApps } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

const app = getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

// Local development and tests against the Firebase emulators (never set in production).
const authEmulator = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST
const firestoreEmulator = process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST
if (authEmulator && !auth.emulatorConfig) {
  connectAuthEmulator(auth, `http://${authEmulator}`, { disableWarnings: true })
}
if (
  firestoreEmulator &&
  typeof window !== 'undefined' &&
  !(db as { _settingsFrozen?: boolean })._settingsFrozen
) {
  const [host, port] = firestoreEmulator.split(':')
  connectFirestoreEmulator(db, host, Number(port))
}

export { auth, db, app }
