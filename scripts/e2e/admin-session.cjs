// Admin sessions for the e2e checks: real sign-in against the Auth emulator, and forms posted
// to server actions like a browser without JavaScript would.
const path = require('node:path')

module.exports = function adminSession({ ADMIN, AUTH_HOST, apiKey, ADMIN_APP }) {
  const manifest = require(
    path.join(ADMIN_APP, process.env.E2E_DIST_DIR || '.next-e2e', 'server/server-reference-manifest.json'),
  )
  const actionId = name =>
    Object.entries(manifest.node).find(([, v]) => JSON.stringify(v).includes(`"exportedName":"${name}"`))[0]

  /** Session cookies for this account, as the admin's sign-in page gets them. */
  const signIn = async email => {
    const r = await fetch(
      `http://${AUTH_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'Test1234!', returnSecureToken: true }),
      },
    )
    const login = await fetch(`${ADMIN}/api/login`, {
      headers: { Authorization: `Bearer ${(await r.json()).idToken}` },
    })
    return login.headers
      .getSetCookie()
      .map(c => c.split(';')[0])
      .join('; ')
  }

  /** Posts a form to `action` from `page`; returns the decoded redirect target. */
  const submit = async (cookie, page, action, fields) => {
    const body = new FormData()
    body.append(`$ACTION_ID_${actionId(action)}`, '')
    for (const [k, v] of Object.entries(fields)) body.append(k, v)
    const res = await fetch(ADMIN + page, { method: 'POST', headers: { cookie }, body, redirect: 'manual' })
    return decodeURIComponent((res.headers.get('location') ?? '').replace(/\+/g, ' '))
  }

  const get = async (cookie, page) => {
    const res = await fetch(ADMIN + page, { headers: { cookie }, redirect: 'manual' })
    return { status: res.status, html: await res.text() }
  }

  return { signIn, submit, get }
}
