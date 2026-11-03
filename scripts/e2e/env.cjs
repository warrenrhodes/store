// Environment for building and running both apps against the emulators. The apps' own .env
// files may hold real values (Next loads them, and inlines NEXT_PUBLIC_* at build time), so
// every variable that could reach a real service or project is overridden, blank if unused.
const crypto = require('node:crypto')

const STORE_PORT = process.env.E2E_STORE_PORT || '3101'
const ADMIN_PORT = process.env.E2E_ADMIN_PORT || '3102'
// Stands in for graph.facebook.com: records the Conversions API calls (run.cjs).
const META_PORT = process.env.E2E_META_PORT || '3109'

const { privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' },
})

const env = {
  ...process.env,
  NODE_ENV: 'production',
  // Builds next to, not over, the .next of a dev server running in the same folder.
  E2E_DIST_DIR: '.next-e2e',
  NEXT_TELEMETRY_DISABLED: '1',
  // Firebase: the emulators only.
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'demo-nature-gift',
  NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
  NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST,
  NEXT_PUBLIC_FIREBASE_API_KEY: 'e2e-fake-api-key',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'demo-nature-gift.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_APP_ID: 'e2e',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: 'e2e',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'demo-nature-gift.appspot.com',
  FIREBASE_CLIENT_EMAIL: 'e2e@demo-nature-gift.iam.gserviceaccount.com',
  FIREBASE_PRIVATE_KEY: privateKey,
  AUTH_COOKIE_SIGNATURE_KEY_CURRENT: 'e2e-current-signature-key-0123456789',
  AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS: 'e2e-previous-signature-key-0123456789',
  USE_SECURE_COOKIES: 'false',
  // URLs between the two apps.
  NEXT_PUBLIC_PLATFORM_URL: `http://localhost:${STORE_PORT}`,
  NEXT_PUBLIC_ADMIN_DASHBOARD_URL: `http://localhost:${ADMIN_PORT}`,
  // Nothing real gets sent.
  PLATFORM_FLOCK_WEBHOOK_URL: '',
  PLATFORM_CONTACT_EMAIL: '',
  NOTIFICATIONAPI_CLIENT_ID: '',
  NOTIFICATIONAPI_CLIENT_SECRET: '',
  META_TEST_EVENT_CODE: '',
  META_GRAPH_URL: `http://127.0.0.1:${META_PORT}`,
  // Admin → storefront cache invalidation (POST /api/revalidate).
  REVALIDATE_SECRET: 'e2e-revalidate-secret',
  PLATFORM_GTM_ID: '',
  CLOUDINARY_API_KEY: '',
  CLOUDINARY_API_SECRET: '',
  PLATFORM_CONTACT_WHATSAPP: '237600000000',
}

module.exports = { env, STORE_PORT, ADMIN_PORT, META_PORT }
