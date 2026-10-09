#!/usr/bin/env bash
# Pushes App Hosting secrets to Cloud Secret Manager from the local .env files,
# then grants both backends access. Run once after creating the backends.
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT=nature-s-gift
STORE=nature-gift-store
ADMIN=nature-gift-admin

# Reads a value from an app's .env/.env.production the same way Next.js does.
val() {
  NODE_ENV=production node -e '
    const { combinedEnv } = require(process.argv[1] + "/node_modules/@next/env").loadEnvConfig(process.argv[1], false, { info() {}, error() {} })
    process.stdout.write(combinedEnv[process.argv[2]] ?? "")' "$PWD/$1" "$2"
}

set_secret() { printf '%s' "$2" | firebase apphosting:secrets:set "$1" --data-file - --project "$PROJECT"; }

set_secret FIREBASE_CLIENT_EMAIL "$(val nature_gift_admin FIREBASE_CLIENT_EMAIL)"
set_secret FIREBASE_PRIVATE_KEY "$(val nature_gift_admin FIREBASE_PRIVATE_KEY)"
# Old cookie keys are committed in the public Dockerfiles: rotate them (users get logged out once).
set_secret AUTH_COOKIE_SIGNATURE_KEY_CURRENT "$(openssl rand -base64 32)"
set_secret AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS "$(openssl rand -base64 32)"
set_secret FLOCK_WEBHOOK_URL "$(val nature_gift_store FLOCK_WEBHOOK_URL)"
set_secret CLOUDINARY_API_KEY "$(val nature_gift_admin CLOUDINARY_API_KEY)"
set_secret CLOUDINARY_API_SECRET "$(val nature_gift_admin CLOUDINARY_API_SECRET)"

COMMON=FIREBASE_CLIENT_EMAIL,FIREBASE_PRIVATE_KEY,AUTH_COOKIE_SIGNATURE_KEY_CURRENT,AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS
firebase apphosting:secrets:grantaccess "$COMMON,FLOCK_WEBHOOK_URL" --backend "$STORE" --project "$PROJECT"
firebase apphosting:secrets:grantaccess "$COMMON,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET" --backend "$ADMIN" --project "$PROJECT"
