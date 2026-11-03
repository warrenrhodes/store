// Creates a store: stores/{id}, its slug reservation, its (empty) secrets and the owner's
// membership, in one transaction. Used by the platform console and by self-service sign-up
// (/onboarding). Not a 'use server' module: never callable from the browser. Allowed to use
// `backend` by scripts/check-tenant.mjs.
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import {
  defaultStoreSettings,
  Membership,
  Store,
  StorePlan,
  StoreRole,
  StoreSecrets,
  StoreStatus,
} from '@/lib/firebase/models'
import { membershipId } from '@/lib/tenant'
import { PRESETS, StoreTheme, ThemePreset, themeOf } from '@ngift/core/theme'

/** The new store's id, or 'taken' when the slug already belongs to another store. */
export async function createStoreDocs(props: {
  name: string
  slug: string
  ownerUid: string
  ownerEmail: string | null
  /** Self-service sign-up: the preset picked, published as the store's first theme. */
  preset?: ThemePreset
  /** Self-service sign-up: when the owner accepted the platform's seller terms. */
  termsAcceptedAt?: string
}) {
  const storeRef = backend.db.collection(CollectionsName.Stores).doc()
  const slugRef = backend.db.collection(CollectionsName.StoreSlugs).doc(props.slug)
  const now = new Date().toISOString()
  const taken = await backend.db.runTransaction(async tx => {
    if ((await tx.get(slugRef)).exists) return true
    tx.create(slugRef, { storeId: storeRef.id })
    tx.create(storeRef, {
      name: props.name,
      slug: props.slug,
      ownerUid: props.ownerUid,
      // Paid in cash and activated by the platform (/platform): the storefront opens then.
      status: StoreStatus.PENDING,
      plan: StorePlan.FREE,
      paidUntil: null,
      marketplaceListed: true,
      settings: defaultStoreSettings(),
      ...(props.preset && {
        theme: { ...themeOf(null), ...PRESETS[props.preset] } satisfies StoreTheme,
      }),
      ...(props.termsAcceptedAt && { termsAcceptedAt: props.termsAcceptedAt }),
      createdAt: now,
      updatedAt: now,
    } satisfies Store)
    tx.create(backend.db.collection(CollectionsName.StoreSecrets).doc(storeRef.id), {
      metaCapiTokens: {},
      flockWebhookUrl: null,
    } satisfies StoreSecrets)
    tx.set(
      backend.db
        .collection(CollectionsName.Memberships)
        .doc(membershipId(storeRef.id, props.ownerUid)),
      {
        storeId: storeRef.id,
        uid: props.ownerUid,
        role: StoreRole.OWNER,
        email: props.ownerEmail,
        createdAt: now,
      } satisfies Membership,
    )
    return false
  })
  return taken ? ('taken' as const) : storeRef.id
}
