// Firebase Admin connection for the local scripts. Never picks a project implicitly: the
// emulators (FIRESTORE_EMULATOR_HOST set), a service account key file (--service-account), or
// an app's .env file (--env, the same FIREBASE_* variables the app uses).
import { readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const require = createRequire(path.join(root, 'nature_gift_store/package.json'))

/** `--name value` from argv, or undefined. */
export const arg = name => {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? undefined : process.argv[i + 1]
}
export const flag = name => process.argv.includes(`--${name}`)

/** { admin, db, target }: target is printed so the user sees which database is used. */
export function connect() {
  const admin = require('firebase-admin')
  const serviceAccount = arg('service-account')
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    const projectId = arg('project') ?? 'demo-nature-gift'
    admin.initializeApp({ projectId })
    return {
      admin,
      db: admin.firestore(),
      target: `emulator ${process.env.FIRESTORE_EMULATOR_HOST} (${projectId})`,
    }
  }
  const envFile = arg('env')
  if (envFile) {
    const vars = parseEnv(readFileSync(envFile, 'utf8'))
    const projectId = vars.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    if (!projectId || !vars.FIREBASE_CLIENT_EMAIL || !vars.FIREBASE_PRIVATE_KEY) {
      console.error(
        `${envFile}: needs NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY`,
      )
      process.exit(2)
    }
    const credential = admin.credential.cert({
      projectId,
      clientEmail: vars.FIREBASE_CLIENT_EMAIL,
      privateKey: vars.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
    admin.initializeApp({ credential, projectId })
    return { admin, db: admin.firestore(), target: `project ${projectId} (from ${envFile})` }
  }
  if (!serviceAccount) {
    console.error(
      'No database: set FIRESTORE_EMULATOR_HOST for the emulators, or pass\n' +
        '--env <app .env file> or --service-account <key.json> for a real project.',
    )
    process.exit(2)
  }
  const key = JSON.parse(readFileSync(serviceAccount, 'utf8'))
  admin.initializeApp({ credential: admin.credential.cert(key), projectId: key.project_id })
  return { admin, db: admin.firestore(), target: `project ${key.project_id}` }
}
