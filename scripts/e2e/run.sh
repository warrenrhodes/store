#!/usr/bin/env bash
# Store end-to-end checks against the Firebase emulators (project demo-nature-gift, never a real
# one). Needs Java 17+, firebase-tools, and nature_gift_store/node_modules installed.
# Starts its own store on :3101 (E2E_STORE_PORT). E2E_STANDALONE=1 runs the built server
# (npm run build first) instead of next dev. Run it from a worktree if your own `next dev` is
# running in this checkout's nature_gift_store.
set -euo pipefail
cd "$(dirname "$0")"
exec firebase emulators:exec --config firebase.json --project demo-nature-gift --only firestore,auth \
  "node store.cjs"
