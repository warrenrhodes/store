#!/usr/bin/env bash
# End-to-end checks against the Firebase emulators (project demo-nature-gift, never a real
# one): builds both apps, seeds, runs the migration, then the storefront and admin checks on
# the built servers (:3101 store, :3102 admin). Needs Java 17+, firebase-tools and both apps'
# node_modules. The builds (.next-e2e) are deleted at the end. See run.cjs.
set -euo pipefail
cd "$(dirname "$0")"
exec firebase emulators:exec --config firebase.json --project demo-nature-gift --only firestore,auth \
  "node run.cjs"
