'use server'

// The current store's own documents: stores/{id}, storeSecrets/{id}, its memberships and
// invites. Allowed to use `backend` directly by scripts/check-tenant.mjs; every function works
// on requireStore()'s store only.
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import {
  Invite,
  isValidStoreSlug,
  Membership,
  StoreRole,
  StoreSecrets,
} from '@/lib/firebase/models'
import {
  getMyStores,
  getStoreContext,
  inviteId,
  membershipId,
  requireStore,
  STORE_COOKIE,
} from '@/lib/tenant'
import {
  parseEmails,
  parseGtmIds,
  parseMetaPixels,
  parsePhones,
  parseWhatsapp,
} from '@ngift/core/store-rules'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const back = (path: string, params: Record<string, string>): never =>
  redirect(`${path}?${new URLSearchParams(params)}`)

/** Store switcher: remembers the store, if the user may work on it. */
export async function switchStore(formData: FormData) {
  const storeId = String(formData.get('storeId') ?? '')
  const ctx = await getStoreContext()
  const allowed = ctx?.platformAdmin || (await getMyStores()).some(s => s.id === storeId)
  if (allowed) {
    ;(await cookies()).set(STORE_COOKIE, storeId, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365,
    })
  }
  redirect('/')
}

/** Which secrets are set, never their values (the settings page shows "saved"). */
export async function getSecretsStatus() {
  const { storeId } = await requireStore({ owner: true })
  const secrets = (
    await backend.db.collection(CollectionsName.StoreSecrets).doc(storeId).get()
  ).data() as StoreSecrets | undefined
  return {
    pixelsWithToken: Object.keys(secrets?.metaCapiTokens ?? {}),
    flock: !!secrets?.flockWebhookUrl,
  }
}

export async function saveStoreSettings(formData: FormData) {
  const ctx = await requireStore({ owner: true })
  const text = (name: string) => String(formData.get(name) ?? '').trim()
  const fail = (error: string) => back('/settings', { error })

  const name = text('name')
  if (name.length < 2 || name.length > 80) return fail('Name: 2 to 80 characters.')
  const slug = text('slug').toLowerCase()
  if (!isValidStoreSlug(slug)) {
    return fail('Address: 3 to 40 lower-case letters, digits and single dashes.')
  }
  const whatsapp = parseWhatsapp(text('whatsapp'))
  if (whatsapp === undefined) return fail('WhatsApp: international number, digits only.')
  const contactEmail = text('contactEmail').toLowerCase() || null
  const emails = parseEmails(text('notificationEmails'))
  const phones = parsePhones(text('notificationPhones'))
  const gtm = parseGtmIds(text('gtmIds'))
  const pixels = parseMetaPixels(text('metaPixels'))
  const invalid = [
    ...(contactEmail && parseEmails(contactEmail).invalid.length ? [contactEmail] : []),
    ...emails.invalid,
    ...phones.invalid,
    ...gtm.invalid,
    ...pixels.invalid,
  ]
  if (invalid.length) return fail(`Invalid: ${invalid.join(', ')}`)
  const flock = text('flockWebhookUrl')
  if (flock && !/^https:\/\/\S+$/.test(flock)) return fail('Flock webhook: an https:// URL.')

  const storeRef = backend.db.collection(CollectionsName.Stores).doc(ctx.storeId)
  const secretsRef = backend.db.collection(CollectionsName.StoreSecrets).doc(ctx.storeId)
  const taken = await backend.db.runTransaction(async tx => {
    const [store, secretsDoc] = await Promise.all([tx.get(storeRef), tx.get(secretsRef)])
    const oldSlug = store.get('slug') as string
    if (slug !== oldSlug) {
      const newSlugRef = backend.db.collection(CollectionsName.StoreSlugs).doc(slug)
      if ((await tx.get(newSlugRef)).exists) return true
      tx.create(newSlugRef, { storeId: ctx.storeId })
      tx.delete(backend.db.collection(CollectionsName.StoreSlugs).doc(oldSlug))
    }
    // A Pixel listed without a token keeps the one saved before; a removed Pixel loses it.
    const saved = (secretsDoc.data() as StoreSecrets | undefined)?.metaCapiTokens ?? {}
    const metaCapiTokens = Object.fromEntries(
      pixels.values.flatMap(p => {
        const token = p.token ?? saved[p.id]
        return token ? [[p.id, token]] : []
      }),
    )
    const oldFlock = (secretsDoc.data() as StoreSecrets | undefined)?.flockWebhookUrl ?? null
    tx.set(secretsRef, {
      metaCapiTokens,
      flockWebhookUrl: formData.get('removeFlock') ? null : flock || oldFlock,
    } satisfies StoreSecrets)
    tx.update(storeRef, {
      name,
      slug,
      'settings.whatsapp': whatsapp,
      'settings.contactEmail': contactEmail,
      'settings.notificationEmails': emails.values,
      'settings.notificationPhones': phones.values,
      'settings.gtmIds': gtm.values,
      'settings.metaPixelIds': pixels.values.map(p => p.id),
      updatedAt: new Date().toISOString(),
    })
    return false
  })
  if (taken) return fail(`The address ${slug} is already taken.`)
  back('/settings', { saved: '1' })
}

export async function getTeam() {
  const { storeId } = await requireStore({ owner: true })
  const [members, invites] = await Promise.all([
    backend.db.collection(CollectionsName.Memberships).where('storeId', '==', storeId).get(),
    backend.db.collection(CollectionsName.Invites).where('storeId', '==', storeId).get(),
  ])
  return {
    members: members.docs.map(d => d.data() as Membership),
    invites: invites.docs.map(d => d.data() as Invite),
  }
}

/**
 * Staff invitation by email: an existing admin account joins right away, otherwise the
 * invitation waits until that email signs in (tenant.ts acceptInvites).
 */
export async function inviteMember(formData: FormData) {
  const ctx = await requireStore({ owner: true })
  const [email] = parseEmails(String(formData.get('email') ?? '')).values
  if (!email) return back('/team', { error: 'Enter a valid email.' })
  const user = await backend.auth.getUserByEmail(email).catch(() => undefined)
  const now = new Date().toISOString()
  if (user) {
    const ref = backend.db
      .collection(CollectionsName.Memberships)
      .doc(membershipId(ctx.storeId, user.uid))
    if ((await ref.get()).exists) return back('/team', { error: `${email} is already a member.` })
    await ref.set({
      storeId: ctx.storeId,
      uid: user.uid,
      role: StoreRole.STAFF,
      email,
      createdAt: now,
    } satisfies Membership)
    return back('/team', { saved: `${email} joined the team.` })
  }
  await backend.db
    .collection(CollectionsName.Invites)
    .doc(inviteId(ctx.storeId, email))
    .set({
      storeId: ctx.storeId,
      email,
      role: StoreRole.STAFF,
      invitedBy: ctx.email ?? ctx.uid,
      createdAt: now,
    } satisfies Invite)
  back('/team', { saved: `${email} will join when they sign in to the admin.` })
}

/** Removes a staff member or a pending invitation. The owner can't be removed. */
export async function removeMember(formData: FormData) {
  const ctx = await requireStore({ owner: true })
  const uid = String(formData.get('uid') ?? '')
  const email = String(formData.get('email') ?? '')
  if (uid) {
    const ref = backend.db
      .collection(CollectionsName.Memberships)
      .doc(membershipId(ctx.storeId, uid))
    const member = (await ref.get()).data() as Membership | undefined
    if (!member || member.role === StoreRole.OWNER) {
      return back('/team', { error: 'The owner cannot be removed.' })
    }
    await ref.delete()
  } else if (email) {
    await backend.db.collection(CollectionsName.Invites).doc(inviteId(ctx.storeId, email)).delete()
  }
  back('/team', { saved: 'Removed.' })
}
