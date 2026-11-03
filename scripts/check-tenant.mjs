#!/usr/bin/env node
// CI guard for store isolation (docs/MULTI_TENANT_PLAN.md, 3.5): in the admin, only the files
// below may use the server Firestore handle. Everything else goes through lib/tenant.ts, which
// filters every read and stamps every write with the current store (locations included).
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ADMIN = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../nature_gift_admin')
const ALLOWED = new Set([
  'lib/tenant.ts', // the scoped access layer
  'lib/firebase/firebase-server/firebase.ts', // creates the handle
  'lib/actions/store.actions.ts', // the current store's own doc, secrets, members, invites
  'lib/actions/theme.actions.ts', // the current store's theme and draft (stores/{id})
  'lib/store-creation.ts', // a new store's documents (platform console and self-service sign-up)
  'lib/actions/platform.actions.ts', // platform admin: every store, payments
  'app/api/users/route.ts', // users/{uid} profile on sign-up
])
const DIRS = ['app', 'lib', 'components', 'hooks']
const SERVER_HANDLE = /firebase-server\/firebase['"]|\bbackend\s*\.\s*(db|database|auth)\b/

const files = []
const walk = dir => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) walk(full)
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(name)) files.push(full)
  }
}
DIRS.forEach(d => walk(path.join(ADMIN, d)))

const offenders = files
  .map(f => path.relative(ADMIN, f).split(path.sep).join('/'))
  .filter(f => !ALLOWED.has(f) && SERVER_HANDLE.test(readFileSync(path.join(ADMIN, f), 'utf8')))

if (offenders.length) {
  console.error('Direct Firestore access outside lib/tenant.ts (use the scoped helpers):')
  offenders.forEach(f => console.error(`  nature_gift_admin/${f}`))
  process.exit(1)
}
console.log(
  `check-tenant: ${files.length} admin files, no direct Firestore access outside the allow list`,
)
