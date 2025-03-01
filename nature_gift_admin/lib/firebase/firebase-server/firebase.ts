import { serverConfig } from '@/config'
import { Database } from '@spreeloop/database'
import admin from 'firebase-admin'

function initializeAdminApp() {
  if (admin.apps.findIndex(item => !!item) == -1) {
    admin.initializeApp({
      credential: admin.credential.cert(serverConfig.serviceAccount),
    })
  }
}
initializeAdminApp()
type Backend = {
  database: Database
  db: admin.firestore.Firestore
  auth: admin.auth.Auth
}

const backend: Backend = {
  database: Database.createFirestore(admin.firestore()) as Database,
  db: admin.firestore(),
  auth: admin.auth(),
}

export { backend }
