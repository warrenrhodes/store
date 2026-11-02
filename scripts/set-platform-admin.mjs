#!/usr/bin/env node
// Gives (or removes with --remove) the platform admin custom claim: access to /platform in the
// admin. The user signs out and in again for it to apply.
// usage: node scripts/set-platform-admin.mjs <email> [--remove] [--env nature_gift_admin/.env | --service-account key.json]
import { connect, flag } from './lib/firebase-admin.mjs'

const email = process.argv[2]
if (!email || email.startsWith('--')) {
  console.error('usage: node scripts/set-platform-admin.mjs <email> [--remove]')
  process.exit(2)
}
const { admin, target } = connect()
const user = await admin.auth().getUserByEmail(email)
const claims = { ...(user.customClaims ?? {}) }
if (flag('remove')) delete claims.platformAdmin
else claims.platformAdmin = true
await admin.auth().setCustomUserClaims(user.uid, claims)
console.log(`${target}: ${email} platformAdmin=${!!claims.platformAdmin}`)
process.exit(0)
