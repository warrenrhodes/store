# Plan : plateforme multi-boutiques + marketplace

Branche de travail : `multi-tenant`, créée depuis `shopify-parity`. Une fois `shopify-parity` fusionnée dans `main`, rebaser sur `main`.
Chaque phase est livrable seule : une PR par phase, et la boutique actuelle continue de tourner entre les phases.

## 0. Objectif

Transformer le produit actuel (un admin séparé par fournisseur, mais une seule vitrine commune) en **plateforme vendable** :

- **Chaque fournisseur a sa boutique** : son adresse, son thème, son catalogue, ses promos, ses zones de livraison, ses commandes, ses réglages (WhatsApp, Pixels Meta, conteneurs GTM, notifications). Un fournisseur peut avoir **plusieurs** Pixels Meta et **plusieurs** conteneurs GTM.
- **Une marketplace publique** à la racine du site, qui affiche les produits de toutes les boutiques visibles, comme aujourd'hui.
- **Un seul tableau de bord** (l'admin actuel) pour tous les fournisseurs, et une console super-admin pour le propriétaire de la plateforme.

**Lancement à coût minimal (choix de l'utilisateur, 2026-11-02) :**
- **Adresses** : on reste d'abord sur le lien gratuit Vercel (`<projet>.vercel.app`). Chaque boutique est servie **par chemin** : `<projet>.vercel.app/boutique/<slug>`. Les sous-domaines (`<slug>.ngift.cm`) et les domaines personnalisés viendront **plus tard**, quand il y aura plusieurs fournisseurs (phase 6). Le code est prévu pour que ce passage ne touche que le middleware et les réglages.
- **Paiement des abonnements** : en **espèces**. Une boutique créée est en attente (`pending`). Le super-admin l'**active à la main** une fois le paiement confirmé. Le paiement Mobile Money automatique viendra aussi en phase 6.

## 1. Règles à respecter pendant l'exécution (à lire en premier)

1. **Ne jamais lire ni écrire la base Firestore de production.** Les migrations et les seeds sont des scripts que l'utilisateur lance lui-même. Ils ont un mode `--dry-run` par défaut et sont relançables sans risque.
2. **Ne jamais pousser sur `main`** : le push déclenche le déploiement en prod. Pousser des branches de fonctionnalité, l'utilisateur fusionne.
3. **Tester sur les émulateurs Firebase** (Firestore 8085, Auth 9099, projet `demo-nature-gift`), dans un `git worktree` avec `node_modules` en liens symboliques et `next dev --webpack` sur les ports 3101 (store) et 3102 (admin). **Ne jamais toucher aux serveurs de l'utilisateur** sur :3000 (admin) et :3001 (store).
   - Variables d'environnement : `FIRESTORE_EMULATOR_HOST`, `FIREBASE_AUTH_EMULATOR_HOST`, `NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-nature-gift`.
   - Laisser vides Flock, NotificationAPI, Meta et les emails/téléphones admin.
4. **Lectures Firestore** : jamais de lecture d'une collection entière à chaque page vue (incident de quota du 2026-11-01). Tout chargeur de la vitrine passe par les helpers en cache de `nature_gift_store/src/lib/api/utils.ts` (`shared()` / `safe()` avec `unstable_cache`). Les vérifications de prix, de stock et de limites d'usage au moment de la commande restent des lectures fraîches, en transaction.
5. **Isolation des données** : aucune requête de l'admin ou de la vitrine sur une collection de boutique sans filtre `storeId`. C'est la règle de sécurité n°1 du SaaS.
6. **Commits** : se terminent par `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Commit et push uniquement si l'utilisateur l'a demandé pour la phase en cours.

## 2. État actuel (point de départ)

| Élément | Aujourd'hui | Fichiers |
|---|---|---|
| Monorepo | Deux apps Next.js 16 indépendantes, chacune avec son `package.json`, sans workspace | `nature_gift_store/` (sources dans `src/`), `nature_gift_admin/` (à la racine) |
| Modèles | **Copiés** dans les deux apps (phase 0 : regroupés dans `packages/core`, les anciens chemins réexportent) | `*/lib/firebase/models.ts`, `collection-name.ts` |
| Logique partagée | Calcul des promos dans le store, règles de commande dans l'admin, `normalize` présent des deux côtés | `store/src/lib/utils/promotion-calculator.ts` (+ `.check.ts`), `admin/lib/orders/order-logic.ts` (+ `.check.ts`) |
| Séparation admin | `creatorId == uid` (produits, catégories, zones, articles, promos, avis), `partnersPaths array-contains users/<uid>` (commandes, paniers abandonnés). Les `locations` sont globales. | `admin/lib/actions/*.actions.ts`, `admin/lib/actions/server.ts`, `admin/app/api/*/route.ts` |
| Vitrine | Tous les produits, toutes les promos sur tous les paniers, toutes les zones mélangées. Une commande peut contenir plusieurs fournisseurs (`partnersPaths`). | `store/src/app/api/orders/route.ts`, `store/src/lib/api/utils.ts` |
| Marque | « N.Gift » / « Nature Gift » codé en dur, WhatsApp `237696689073` codé en dur | `store/src/app/layout.tsx`, `components/Header/MainNav.tsx`, `NavMobile.tsx`, `components/Footer.tsx`, `app/(root)/contact/page.tsx`, `shop/[slug]/page.tsx`, `blogs/[slug]/page.tsx` |
| Réglages | Variables d'environnement globales | `NEXT_PUBLIC_ECOMMERCE_STORE_URL`, `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`, `NEXT_PUBLIC_ADMIN_EMAIL`, `NEXT_PUBLIC_ADMIN_PHONE_NUMBER`, `NEXT_PUBLIC_ADMIN_DASHBOARD_URL`, `FLOCK_WEBHOOK_URL`, `META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`, `NOTIFICATIONAPI_*` |
| Thème | Déjà des variables CSS HSL façon shadcn (`--primary`, `--radius`…), mappées dans Tailwind 3 | `store/src/app/globals.css`, `store/tailwind.config.ts` |
| Panier | zustand `persist`, clé `cart-storage` (localStorage, donc séparé par domaine) | `store/src/hooks/useCart.tsx` |
| Middleware | `next-firebase-auth-edge`, liste `PUBLIC_PATHS` | `store/src/proxy.ts`, `admin/proxy.ts` |
| Règles Firestore | Obsolètes (`creatorPath`, `token.admin`). Tout passe par firebase-admin côté serveur. | `firestore.rules`, `firestore.indexes.json` |
| Hébergement | Store sur Vercel. Fichiers `apphosting*.yaml` présents. | |

## 3. Architecture cible

### 3.1 Modèle de données

Nouvelles collections :

```ts
// stores/{storeId}
interface Store {
  name: string
  slug: string                 // unique, [a-z0-9-], sert dans l'URL /boutique/<slug> (plus tard <slug>.ngift.cm)
  ownerUid: string
  status: 'pending' | 'active' | 'suspended'  // pending = créée, en attente du paiement cash
  plan: 'free' | 'pro'
  paidUntil?: string           // ISO, posé par le super-admin à la confirmation du paiement
  domains: string[]            // phase 6 : hôtes normalisés, minuscules, sans port
  marketplaceListed: boolean   // visible sur la marketplace
  theme: StoreTheme
  settings: {
    whatsapp?: string          // format international, sans +
    contactEmail?: string
    currency: 'XAF'
    gtmIds: string[]           // plusieurs conteneurs GTM possibles, tous chargés dans le layout
    metaPixelIds: string[]     // plusieurs Pixels Meta possibles ; chaque événement part vers chacun
    notificationEmails: string[]
    notificationPhones: string[]
  }
  createdAt: string
  updatedAt: string
}

// storeSecrets/{storeId}: lu uniquement côté serveur, jamais renvoyé au navigateur
interface StoreSecrets {
  metaCapiTokens: Record<string, string>  // pixelId → jeton Conversions API (un jeton par Pixel)
  flockWebhookUrl?: string
}

// storeSlugs/{slug}: résolution slug → boutique en une lecture, et unicité du slug (création en transaction)
interface StoreSlug { storeId: string }

// phase 6 — domains/{hostname}: résolution hôte → boutique en une lecture (id du doc = hôte)
interface DomainRecord { storeId: string; kind: 'subdomain' | 'custom'; verified: boolean }

// storePayments/{autoId}: journal des paiements cash enregistrés par le super-admin
interface StorePayment {
  storeId: string
  amount: number               // XAF
  method: 'cash'               // 'mobile_money' en phase 6
  periodMonths: number
  paidUntil: string            // nouvelle échéance
  recordedBy: string           // uid du super-admin
  note?: string
  createdAt: string
}

// memberships/{storeId}_{uid}
interface Membership { storeId: string; uid: string; role: 'owner' | 'staff'; createdAt: string }

interface StoreTheme {
  preset: 'nature' | 'minimal' | 'bold'
  colors: { primary: string; background: string; foreground: string; accent?: string } // HSL "163 94% 24%"
  radius: number               // rem
  font: 'inter' | 'poppins' | 'playfair' | 'dm-sans'  // liste fermée, chargée via next/font
  logoUrl?: string
  faviconUrl?: string
  sections: Section[]          // phase 3
}
```

Un champ **`storeId: string`** est ajouté sur `products`, `categories`, `blogs`, `shipments`, `promotions`, `reviews`, `orders` et `checkouts`.

- `creatorId` est **conservé** pendant la transition (écrit et lu en secours), puis retiré en phase 5.
- `locations` reste **global** : c'est le répertoire des quartiers. Chaque boutique crée ses `shipments` (zones et tarifs) qui référencent des `locations`.
- Les commandes gagnent `checkoutGroupId?: string`, qui lie les commandes d'un même panier marketplace. `partnersPaths` est conservé pour compatibilité, mais une commande ne concerne plus **qu'une seule** boutique.
- Unicité : un slug de produit est unique **par boutique**, un code promo est unique **par boutique**, une catégorie est unique par `(storeId, name)`.
- Index composites à ajouter dans `firestore.indexes.json`, par exemple `storeId + createdAt desc` sur products, orders, checkouts et reviews, `storeId + slug`, `storeId + status`.

Décision : collections de premier niveau avec `storeId`, **pas** de sous-collections `stores/{id}/products`. La marketplace peut ainsi lister tous les produits publiés en une requête (`where('marketplaceListed','==',true)` dénormalisé sur le produit), et la migration reste un simple ajout de champ.

### 3.2 Routage (vitrine)

Une seule app `nature_gift_store` sert la marketplace et toutes les boutiques. Les pages passent de `app/(root)/...` à `app/[site]/(root)/...` (idem `(auth)`). `robots.ts`, `sitemap.ts` et `opengraph-image` passent sous `[site]`. `site` vaut `_market` ou le slug d'une boutique.

**Maintenant : routage par chemin, sur le lien gratuit Vercel**

```
<projet>.vercel.app/                      → site = "_market"  (marketplace)
<projet>.vercel.app/boutique/<slug>/...   → site = <slug>
localhost:3001/boutique/<slug>/...        → idem en dev
```

- `src/proxy.ts` calcule `site` à partir du chemin **sans lire la base** :
  - `/boutique/<slug>/rest` est réécrit en `/<slug>/rest` ;
  - tout autre chemin est réécrit en `/_market/<chemin>`.
  - On garde `authMiddleware` en l'enveloppant : la réécriture se fait dans `handleValidToken`, `handleInvalidToken` et le chemin public. `PUBLIC_PATHS` doit accepter le préfixe `/boutique/<slug>`.
- Les liens internes d'une boutique doivent garder le préfixe. Un seul helper, `siteHref(site, path)`, plus un hook client `useSiteHref()` qui lit le site depuis un contexte posé dans `app/[site]/layout.tsx`. **Tous** les `<Link href="/...">`, `router.push` et `redirect` de la vitrine passent par lui. Un garde-fou en CI interdit `href="/` en dur dans `src/components` et `src/app`.
- Le panier est en localStorage, partagé par toutes les boutiques puisqu'elles ont la même origine. La clé zustand devient donc **`cart-storage:{site}`** (idem pour les codes promo de `usePromoCodes` et la wishlist si elle est locale). Un panier de boutique ne contient ainsi que ses produits.
- `getSiteContext(site)` (cache React + `unstable_cache` 5 min, tag `store:{id}`) renvoie `{ mode: 'market' } | { mode: 'store', store }`. Il lit `storeSlugs/{slug}` puis `stores/{id}`. Un slug inconnu ou une boutique non `active` (`pending`, `suspended`) renvoie une 404.
- Les routes API (`/api/orders`, `/api/promotions/calculate`, `/api/checkouts`, `/api/reviews`, `/api/search`) ne sont **pas** réécrites. Le client envoie le `site` (slug ou `_market`), le serveur le résout avec `getSiteContext` et **vérifie** que chaque produit du panier appartient bien à la boutique. Le serveur ne fait jamais confiance à un `storeId` envoyé par le client.
- URL absolues : `PLATFORM_URL=https://<projet>.vercel.app` (env), en remplacement de `NEXT_PUBLIC_ECOMMERCE_STORE_URL`. L'URL d'une boutique se calcule **uniquement** par `storeUrl(store)` (= `${PLATFORM_URL}/boutique/${slug}` aujourd'hui), utilisé dans les liens de suivi, WhatsApp, sitemap, metadata et liens de promo copiés depuis l'admin.

**Plus tard (phase 6) : routage par hôte**

```
ngift.cm, www.ngift.cm          → site = "_market"
<slug>.ngift.cm                 → site = <slug>
boutique-client.com             → lookup domains/{host} → site = <slug>
```

Seuls le middleware (lire `host` en plus du chemin), `storeUrl()` et les clés de panier changent. Les anciens liens `/boutique/<slug>/...` redirigent en 308 vers le nouveau domaine de la boutique.

### 3.3 Chargeurs de données

Tous les chargeurs de `src/lib/api/utils.ts` et des pages prennent un `scope` :

- **mode store** : filtre `storeId == store.id`, tag de cache `store:{id}` ;
- **mode market** : produits `marketplaceListed == true` et `status` publié, tag `market`. Les promos et les zones restent **toujours** résolues par la boutique du produit, jamais globalement.

Invalidation : nouvelle route `POST /api/revalidate` dans le store, protégée par `REVALIDATE_SECRET`, qui reçoit `{ tags: string[] }` et appelle `revalidateTag`. L'admin l'appelle après chaque écriture (produit, promo, zone, thème, réglages). En cas d'échec, le TTL de 5 minutes sert de filet.

### 3.4 Panier et commandes

- **Page boutique** (`/boutique/<slug>`) : le panier ne contient que les produits de cette boutique (clé `cart-storage:{site}`, voir 3.2). Une commande = une boutique.
- **Marketplace** : le panier peut mélanger plusieurs boutiques. L'interface groupe les articles par boutique, avec leurs frais de livraison et leurs promos par groupe. Au paiement, `placeOrder` crée **une commande par boutique** dans **une seule transaction** :
  - stock et usage des promos vérifiés pour tous les groupes ;
  - toutes les commandes portent le même `checkoutGroupId` ;
  - si un groupe échoue, aucune commande n'est créée (comportement 409 actuel).
- `PromotionCalculator` est appelé **par groupe de boutique**, avec uniquement les promos de cette boutique. Un code saisi sur la marketplace s'applique à la boutique qui le possède.
- `priceOrder` et `/api/promotions/calculate` renvoient un résumé par groupe plus un total général.
- Suivi : `/order/[orderId]?token=` reste valable. Ajouter `/order/group/[groupId]?token=`, qui liste les commandes du groupe. Le jeton est partagé par le groupe.
- Notifications après commit, **par boutique** : Flock (`storeSecrets.flockWebhookUrl`), email et SMS (`settings.notificationEmails` / `notificationPhones`), Meta CAPI : l'achat part vers **chaque** Pixel de `settings.metaPixelIds` qui a un jeton dans `storeSecrets.metaCapiTokens`, avec le même `event_id` partout pour la déduplication navigateur/serveur. L'échec d'un Pixel ne bloque ni les autres ni la commande. Les variables d'environnement actuelles servent de secours pour la boutique N.Gift jusqu'à la phase 5.
- Avis : `storeId` copié depuis le produit, modération par la boutique.
- Paniers abandonnés : `storeId` = boutique de la page (en mode market, un document par groupe).

### 3.5 Admin multi-boutiques

- `lib/tenant.ts` (nouveau, **seul point d'entrée** des lectures et écritures de collections de boutique) :
  - `requireStore()` lit le token (`getUserTokens`), lit le cookie `current-store`, vérifie `memberships/{storeId}_{uid}` (cache React), puis renvoie `{ uid, storeId, role }` ou lève `Unauthorized`.
  - `scopedCollection(name, filters?)` ajoute `storeId == ctx.storeId`.
  - `getScopedDoc(path)` lit le doc et vérifie que `doc.storeId === ctx.storeId`, sinon renvoie `null`.
  - `createScoped(name, data)` force `storeId`, `creatorId` et les dates.
  - `updateScoped(path, data)` vérifie l'appartenance puis écrit, en retirant `storeId` des données entrantes.
- Remplacer **tous** les filtres `creatorId` / `partnersPaths` dans `lib/actions/*.actions.ts`, `lib/actions/server.ts`, `app/api/*/route.ts` et `components/orders/OrderDetail.tsx`. Corriger au passage `updateProduct`, qui ne vérifie pas le propriétaire aujourd'hui (voir le commentaire dans `products.actions.ts`).
- Garde-fou : un script `scripts/check-tenant.mjs`, lancé en CI, échoue si `backend.database.getCollection`, `backend.db.collection` ou `setRecord` sur une collection de boutique apparaît **hors** de `lib/tenant.ts` (liste blanche explicite pour `locations`, `stores`, `memberships`, `domains`).
- Interface :
  - sélecteur de boutique dans la barre latérale (`AppSibar`), qui écrit le cookie `current-store` ;
  - page **Réglages boutique** (nom, slug, WhatsApp, emails, téléphones, liste des conteneurs GTM, liste des Pixels Meta avec un jeton CAPI par Pixel, Flock). Les identifiants sont validés à l'enregistrement (`GTM-XXXXXXX`, Pixel = chiffres), sans doublon ;
  - page **Domaines** (phase 6) ;
  - page **Thème** (phase 3) ;
  - page **Équipe** (inviter par email avec le rôle staff, retirer).
- Rôles : `owner` peut tout faire ; `staff` ne peut pas accéder aux réglages, domaines, équipe et thème.
- Super-admin : custom claim Firebase `platformAdmin: true`, posé par un script local. Section `/platform` :
  - liste des boutiques avec filtre par statut (`pending` en premier) et échéance `paidUntil` (les boutiques qui expirent dans les 7 jours ou déjà expirées sont mises en évidence) ;
  - **« Enregistrer un paiement cash »** : montant, nombre de mois, note. Crée un `storePayments`, repousse `paidUntil` et passe la boutique en `active`, dans une transaction ;
  - suspension et réactivation manuelles. Pas de suspension automatique à l'échéance pour l'instant : le super-admin décide ;
  - plan, `marketplaceListed`, modération.
- Tant que la boutique est `pending`, son propriétaire peut déjà se connecter à l'admin et préparer son catalogue. Un bandeau lui indique comment payer (numéro WhatsApp de la plateforme, `PLATFORM_CONTACT_WHATSAPP` en env). Sa vitrine reste en 404 jusqu'à l'activation.

### 3.6 Règles Firestore

Réécrire `firestore.rules` : **tout refuser côté client** (`allow read, write: if false`) sauf ce que le navigateur utilise réellement, à vérifier en greppant `firebase/firestore` côté client (wishlist `users/{uid}/wishlist` probablement). Tout le reste passe par firebase-admin, qui ignore les règles. L'isolation repose donc sur `lib/tenant.ts` et ses tests.

### 3.7 Thèmes (phase 3)

- Les préréglages définissent des valeurs par défaut. La boutique les surcharge avec `theme.colors`, `radius` et `font`.
- `app/[site]/layout.tsx` injecte `<style>:root{--primary:…;--radius:…}</style>` depuis le thème : aucun JS côté client, et rien à changer dans Tailwind, puisque les couleurs sont déjà `hsl(var(--…))`.
- `--primary-foreground` est **calculé** (noir ou blanc selon le contraste). L'enregistrement est **refusé** si le contraste texte/fond ou primary/primary-foreground est inférieur à 4.5:1 (WCAG AA). Une fonction pure `contrastRatio()` dans le paquet partagé, avec son `.check.ts`.
- Polices : liste fermée chargée via `next/font/google` dans le layout, sélectionnée par variable CSS.
- Sections de la page d'accueil (`theme.sections`) : `hero`, `featuredProducts`, `categoryGrid`, `reviews`, `faq`, `richText`, `video`, `promoBanner`. Chacune est validée par zod, rendue par un registre `{ type → composant }`, et réordonnée ou masquée dans l'admin. L'aperçu en direct est un `<iframe>` de la boutique avec `?preview=<token>`, qui lit le brouillon `theme.draft`.
- La marque codée en dur (Header, Footer, layout, contact, métadonnées) est remplacée par `store.name`, `logoUrl` et `settings.whatsapp`. En mode market, ce sont les valeurs de la plateforme.

### 3.8 Domaines (phase 6, plus tard)

- Sous-domaines : wildcard `*.ngift.cm` sur le projet Vercel du store (domaine sur les nameservers Vercel, requis pour le certificat wildcard). Le doc `domains/{slug}.ngift.cm` est créé à la création de la boutique.
- Domaines personnalisés : l'admin appelle l'API Vercel depuis une server action (`VERCEL_TOKEN`, `VERCEL_PROJECT_ID_STORE`, `VERCEL_TEAM_ID`) :
  - `POST /v10/projects/{id}/domains` pour ajouter ;
  - `GET /v9/projects/{id}/domains/{domain}` et `/v6/domains/{domain}/config` pour l'état ;
  - `DELETE` pour retirer.
  - La page Domaines affiche l'enregistrement DNS à créer (CNAME `cname.vercel-dns.com` ou A `76.76.21.21`) et l'état de vérification. `domains/{host}.verified` est mis à jour à la vérification.
- SEO : dès la phase 2, `metadataBase`, `sitemap.ts`, `robots.ts` et l'URL canonique sont calculés depuis `getSiteContext` et `storeUrl()`. Par défaut, **la page produit de la marketplace a pour canonique l'URL du produit dans la boutique**. Décision réversible, à confirmer avec l'utilisateur.
- Auth client : les cookies sont par domaine. Les clients commandent comme aujourd'hui sans compte (téléphone). Le compte client reste local à chaque hôte. Pas de SSO inter-domaines : à ajouter seulement si c'est demandé.

## 4. Phases

Chaque phase se termine par :
- les vérifications `.check.ts` ;
- `tsc --noEmit` et `next build` des deux apps (la lecture de la base dev au build peut échouer en PERMISSION_DENIED : ce n'est pas un bug) ;
- les tests e2e sur l'émulateur listés dans la phase ;
- une PR.

### Phase 0 : fondations (1 à 2 semaines)

But : arrêter la duplication et rendre les phases suivantes sûres. Aucun changement visible pour les clients.

1. **Workspaces npm** à la racine : `package.json` avec `"workspaces": ["nature_gift_store", "nature_gift_admin", "packages/*"]`. Turborepo seulement si les builds deviennent lents (pas nécessaire au départ).
   - Vérifier que les déploiements Vercel (Root Directory = dossier de l'app) installent toujours correctement : soit « Include files outside root directory », soit garder des lockfiles par app.
   - Voir les branches passées `fix-npm11-lockfiles` et `fix-lock` : les lockfiles ont déjà posé problème.
2. **Paquet `packages/core`** (TypeScript source, consommé via `transpilePackages: ['@ngift/core']` dans les deux `next.config`) :
   - `models.ts` et `collection-name.ts`, fusion des deux copies. Les différences entre les copies sont à résoudre explicitement ;
   - `promotion-calculator.ts` et son check ;
   - `order-logic.ts` et son check ;
   - `normalize` et les helpers de zones utilisés des deux côtés ;
   - les schémas zod partagés (promotion, commande).
   - Les apps réexportent depuis leurs anciens chemins (`@/lib/firebase/models` → `export * from '@ngift/core/models'`) pour limiter le diff.
3. **CI GitHub Actions** (`.github/workflows/ci.yml`) sur chaque PR : install, `tsc --noEmit` des deux apps, les `*.check.ts` via `npx tsx`, lint. Le build complet est optionnel, car il lit la base.
4. **Script e2e émulateur** reproductible : `scripts/e2e/` démarre les émulateurs, injecte les données de test et lance les vérifications API (reprendre les 11 vérifications faites pour `shopify-parity` : aperçu, panier abandonné, code promo, limites d'usage, 409 sur rupture de stock, zones, montant minimum, suivi, avis).
5. Optionnel : Sentry (`@sentry/nextjs`) sur les deux apps, désactivé sans DSN.

Critère de fin : les deux apps compilent avec `@ngift/core`, zéro type dupliqué, CI verte, script e2e vert.

**Réalisé (branche `multi-tenant-phase0`, 2026-11-02), avec ces écarts :**
- **Pas de workspaces npm.** Avec un `package.json` racine en workspaces, un `npm ci` lancé dans le dossier d'une app (ce que font App Hosting et Vercel) passerait au lockfile racine. Chaque app dépend donc de `"@ngift/core": "file:../packages/core"` : un lien symbolique, des lockfiles par app inchangés à part cette entrée. `packages/core` n'a **aucune dépendance npm**, et doit le rester : un import de paquet depuis `packages/core/src` ne se résoudrait pas.
- **Build de prod en webpack** (`next build --webpack`). Turbopack exige une racine au niveau du dépôt pour lire `packages/core`, ce qui imbrique `.next/standalone` sous `nature_gift_*/`. Or l'adaptateur App Hosting cherche `.next/standalone/server.js`, sauf en monorepo Nx/Turborepo détecté. Le dev passe aussi en webpack (`next dev --webpack`) : avec la racine Turbopack au niveau du dépôt, le dev de l'admin restait bloqué sur « Compiling », avec des centaines de workers PostCSS (2026-11-03).
- Schémas zod partagés : aucun n'était dupliqué (le store n'a que ses formulaires, l'admin ses validations), donc rien à déplacer. Restent par app les alias `IProduct`, `IOrder`… sur `DatabaseDocument` (`@spreeloop/database`), qui diffèrent d'une app à l'autre (`IProduct`), et les composants shadcn.
- Lint du store réparé : il était cassé avant la phase 0 (`eslint-config-next` 16 en flat config, zod 3.23 trop ancien pour `zod-validation-error`). zod passe à 3.25.76, dans la plage `^3.23.8`. Les nouvelles règles React Compiler sont en `warn`, à corriger plus tard. Les scripts `lint` passent à `eslint .`, puisque `next lint` n'existe plus en Next 16.
- e2e : `scripts/e2e/run.sh` (11 vérifications, `E2E_STANDALONE=1` pour tester le build de prod). Sentry non ajouté (optionnel).

### Phase 1 : multi-boutiques dans les données et l'admin (2 à 3 semaines)

1. Types `Store`, `StoreSecrets`, `DomainRecord`, `Membership` et `storeId` dans `@ngift/core`. Collections ajoutées à `CollectionsName`.
2. **Script de migration** `scripts/migrate-multi-tenant.mjs` (idempotent, `--dry-run` par défaut, `--apply` pour écrire, par lots de 400) :
   - chaque `creatorId` distinct sur products, categories, blogs, shipments et promotions devient une boutique (`stores`, slug dérivé du nom de l'utilisateur, à compléter avec `--map uid=slug,name`), avec un `memberships` owner et un `storeSlugs/{slug}`. Les boutiques migrées sont créées en `active` ;
   - pose `storeId` sur products, categories, blogs, shipments, promotions et reviews via `creatorId` ;
   - orders et checkouts : via `partnersPaths[0]`. Le dry-run **compte les commandes à plusieurs fournisseurs** et les liste, elles gardent `partnersPaths` ;
   - `marketplaceListed: true` sur les produits ;
   - réglages des boutiques migrées : `gtmIds` et `metaPixelIds` vides (les variables d'environnement actuelles servent de secours, voir 3.4) ;
   - n'écrase jamais un `storeId` déjà présent ;
   - fonctionne contre l'émulateur (`FIRESTORE_EMULATOR_HOST`) ou contre un projet via un service account passé en argument. **C'est l'utilisateur qui lance la version prod.**
3. `lib/tenant.ts` dans l'admin et remplacement de tous les accès (liste en 3.5), plus `scripts/check-tenant.mjs` en CI.
4. Écritures : chaque création pose `storeId`. Les unicités (slug produit, code promo, catégorie) sont vérifiées **dans la boutique**.
5. Interface : sélecteur de boutique, page Réglages, page Équipe (invitation : créer le membership si l'email a un compte, sinon une invitation en attente `invites/{email}`), rôles.
6. Création de boutique depuis l'admin, pour l'instant réservée au super-admin, et console `/platform`.
7. `firestore.rules` réécrites (3.6) et index ajoutés.

Tests e2e émulateur :
- deux boutiques A et B, un utilisateur par boutique ;
- A ne voit, ne lit (par URL directe `/orders/<id B>`, `/products/<id B>`) et ne modifie **rien** de B : produits, commandes, promos, zones, avis, paniers abandonnés, export CSV, statistiques du tableau de bord ;
- un staff ne peut pas ouvrir les réglages ;
- la migration lancée deux fois produit le même résultat ;
- la vitrine fonctionne toujours (elle ignore encore `storeId`).

**Réalisé (branche `multi-tenant`, 2026-11-03), avec ces écarts :**
- **La vitrine écrit déjà `storeId`** sur les commandes, les paniers abandonnés et les avis. La valeur vient du produit ; pour une commande, c'est le produit de la première ligne. Sans ça, les nouvelles commandes n'apparaîtraient plus dans l'admin entre les phases 1 et 2. Une commande qui mélange deux boutiques n'apparaît que dans la première, comme les anciennes commandes multi-fournisseurs après la migration.
- **Unicité des slugs (produits, articles, catégories) et des codes promo : vérifiée sur toutes les boutiques, pas par boutique**, tant que la vitrine les cherche globalement. Phase 2 : passer à `isTakenInStore` (déjà écrit dans `lib/tenant.ts`).
- Ordre de mise en prod : lancer la migration en `--apply` **juste avant** le déploiement de l'admin, puis une seconde fois juste après (rattrapage des documents créés entre-temps). Avant la migration, le nouvel admin n'affiche rien : aucun document n'a de `storeId`, et aucun utilisateur n'a de boutique.
- Pas de `DomainRecord` (phase 6) ni de `theme` (phase 3) dans les types, et pas d'index composite : les nouvelles requêtes ne font que des égalités.
- Les `locations` restent modifiables par toutes les boutiques, comme avant. À décider : les réserver au super-admin ?
- Le middleware de l'admin saute la vérification de révocation de jeton quand `FIREBASE_AUTH_EMULATOR_HOST` est défini : elle demande un jeton OAuth Google, que l'émulateur ne fournit pas.
- e2e : `scripts/e2e/run.sh` fait le build (dans `.next-e2e`), le seed avant migration, la migration (dry run, apply, puis un second apply qui ne change rien), les 11 vérifications vitrine, 7 vérifications d'isolation dans l'admin et 8 sur les formulaires (console `/platform`, paiement cash, réglages avec plusieurs GTM et Pixels, équipe, sélecteur).

### Phase 2 : vitrine par boutique, routage par chemin (2 à 3 semaines)

1. Déplacer les pages sous `app/[site]/`, réécriture par chemin dans `src/proxy.ts` (3.2), `getSiteContext`, `siteHref` / `useSiteHref` sur tous les liens, clés de panier par site, `storeUrl()`.
2. Chargeurs paramétrés par scope (3.3) et route `/api/revalidate`, appelée par l'admin.
3. API : boutique résolue depuis le `site` envoyé par le client, puis vérifiée côté serveur. `priceOrder` et `placeOrder` en mode boutique (une boutique par commande). Rejeter un panier qui contient un produit d'une autre boutique.
4. Réglages par boutique : marque (nom, logo), WhatsApp (Footer, contact), tous les conteneurs GTM et tous les Pixels Meta de la boutique dans le layout, notifications et CAPI depuis `settings` / `storeSecrets`, avec secours sur les variables d'environnement.
5. SEO par boutique (sitemap, robots, metadata, canonique) via `storeUrl()`.
6. Admin : bouton « Voir ma boutique » et « Copier le lien » (`storeUrl(store)`), et liens de promo copiés avec le préfixe de la boutique.

Tests e2e émulateur :
- `localhost:3101/boutique/a` n'affiche que les produits, promos et zones de A ; tous les liens de la page restent sous `/boutique/a` ; une commande sur A a `storeId = A` et aucune promo de B ne s'y applique ;
- le panier de A et celui de B sont indépendants dans le même navigateur ;
- un `site` falsifié dans l'appel API (produit de B envoyé avec `site=a`) est rejeté ;
- un code promo de B saisi sur A renvoie `invalid` ;
- un slug inconnu renvoie 404, une boutique `pending` ou `suspended` renvoie 404 ;
- le sitemap de A ne contient que A ;
- une boutique avec deux Pixels et deux conteneurs GTM les charge tous les quatre, et une commande envoie l'achat CAPI aux deux Pixels avec le même `event_id` ;
- modifier un produit dans l'admin met à jour la vitrine via `/api/revalidate` sans attendre 5 minutes.

### Phase 3 : thèmes (2 à 4 semaines)

1. `StoreTheme`, préréglages, injection des variables CSS, polices, `contrastRatio` + check.
2. Page Thème de l'admin : couleurs, rayon, police, logo, favicon. Aperçu en direct par iframe et brouillon, puis publication.
3. Sections de la page d'accueil (3.7) : registre, schémas zod, éditeur (ajouter, réordonner, masquer, éditer).
4. Accessibilité : `@axe-core/playwright` sur l'accueil, une fiche produit, le panier et le paiement, pour chaque préréglage. Zéro violation sérieuse ou critique.

Tests : couleur à faible contraste refusée ; publier un thème change la vitrine ; le brouillon n'est visible qu'avec le jeton d'aperçu.

### Phase 4 : marketplace (2 à 3 semaines)

1. Mode `_market` : accueil, catalogue de toutes les boutiques listées, page vendeur `/vendeur/[slug]`, badge boutique sur chaque produit.
2. Recherche : commencer par la route existante `/api/search`, scopée et en cache. Passer à **Typesense** (open source, auto-hébergeable) ou Algolia seulement si la recherche Firestore ne suffit plus (plus de quelques centaines de produits, ou besoin de tolérance aux fautes de frappe). La synchronisation se ferait depuis les actions produit de l'admin.
3. Panier groupé par boutique, commande découpée (3.4), suivi de groupe.
4. Modération marketplace dans `/platform` : `marketplaceListed` par boutique et par produit.

Tests :
- panier A+B qui produit 2 commandes avec le même `checkoutGroupId`, chacune avec ses frais et ses promos ;
- rupture de stock sur B : aucune commande créée ;
- A ne voit que sa commande ;
- le lien de suivi de groupe affiche les deux.

### Phase 5 : commercialisation (2 à 3 semaines)

1. Inscription d'un fournisseur sur `/signup` dans l'admin : compte, création de boutique (slug unique via `storeSlugs` en transaction, nom), préréglage de thème, premier produit, zones de livraison. La boutique est créée en **`pending`**.
2. Paiement **cash**, activation manuelle : le fournisseur voit le bandeau « en attente de paiement » (3.5). Le super-admin enregistre le paiement dans `/platform`, ce qui active la boutique et fixe `paidUntil`. Un email ou une notification au fournisseur à l'activation si NotificationAPI est configuré, sinon rien.
3. Nettoyage : retirer la lecture de `creatorId` et les secours sur les variables d'environnement de marque et de notifications.
4. Pages légales par boutique et pour la plateforme : CGU, confidentialité (loi camerounaise sur la protection des données personnelles), mentions légales.

### Phase 6 : plus tard, quand il y aura plusieurs fournisseurs

À ne lancer que sur demande de l'utilisateur.

1. **Domaines** (3.8) :
   - achat du domaine de la plateforme et passage au plan Vercel Pro, nécessaire pour un usage commercial et pour les domaines en nombre ;
   - routage par hôte en plus du chemin (3.2, « Plus tard »), wildcard `*.<domaine>`, `domains/{host}` créé pour chaque boutique ;
   - page Domaines de l'admin avec l'API Vercel ;
   - redirection 308 des anciens liens `/boutique/<slug>`.
2. **Paiement Mobile Money des abonnements** via **NotchPay**, **CinetPay** ou **Campay** (Stripe n'est pas ouvert aux entreprises camerounaises). Un webhook enregistre un `storePayments` avec `method: 'mobile_money'` et repousse `paidUntil`, avec la même logique que le paiement cash. Suspension automatique optionnelle après un délai de grâce.

## 5. Décisions déjà prises

- Firestore est conservé. La couche `lib/tenant.ts` permettra un passage à Postgres (Supabase ou Neon, avec isolation par ligne) plus tard, sans toucher aux pages.
- Vercel pour la vitrine. **Au départ, lien gratuit `*.vercel.app` et routage par chemin `/boutique/<slug>`** ; sous-domaines et domaines personnalisés en phase 6. L'admin reste sur son propre lien.
- **Abonnements payés en cash au départ**, boutique `pending` jusqu'à l'activation manuelle par le super-admin ; Mobile Money en phase 6.
- Les `locations` sont globales, les zones et tarifs par boutique.
- Pas d'éditeur libre de type Wix : préréglages, réglages et sections uniquement, pour garantir l'accessibilité.
- La commande marketplace est découpée en une commande par boutique, liées par `checkoutGroupId`.

## 6. Questions ouvertes (valeur par défaut entre parenthèses, à confirmer)

1. Nom commercial du SaaS (« N.Gift ») et, en phase 6, son domaine (`ngift.cm`).
2. URL canonique des produits présents sur la marketplace et sur la boutique (domaine de la boutique).
3. Commission marketplace sur les ventes : hors périmètre tant que le paiement en ligne n'existe pas (pas de commission, abonnement uniquement).
4. Comptes clients partagés entre boutiques (non, comptes locaux à chaque hôte, commande sans compte).
5. Prix et durée de l'abonnement payé en cash (montant mensuel fixe, saisi par le super-admin à chaque paiement, aucun prix codé en dur).

## 7. Démarrer la prochaine conversation

> Lis `docs/MULTI_TENANT_PLAN.md` et les mémoires `emulator-testing` et `firestore-quota-incident`. Travaille sur la branche `multi-tenant`. Exécute la **phase 0** en entier en respectant la section 1, teste sur l'émulateur, puis fais un résumé et attends mon feu vert pour la phase suivante.
