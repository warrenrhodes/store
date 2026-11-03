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
3. **Tester sur les émulateurs Firebase** (Firestore 8085, Auth 9099, projet `demo-nature-gift`) avec `scripts/e2e/run.sh`. Il construit dans `.next-e2e` et lance les serveurs standalone sur :3101 (store) et :3102 (admin). Travailler **directement dans le dossier `/Volumes/Data/Project/store`**, pas dans un worktree (demande de l'utilisateur). **Ne jamais toucher aux serveurs de l'utilisateur** sur :3000 (admin) et :3001 (store) : ni `next dev` ni `npm run build` dans les dossiers des apps, car un build vide `.next/`, y compris le `.next/dev` de ses serveurs.
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
- `locations` devient **par boutique** (décision de l'utilisateur, 2026-11-03 : « chaque store doit gérer ses locations »). Ces documents portent un `storeId`, comme les autres collections de boutique, et les `shipments` d'une boutique ne référencent que ses propres `locations`. Fait en phase 2 (item 7).
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
- URL absolues : `NEXT_PUBLIC_PLATFORM_URL=https://<projet>.vercel.app` (env), en remplacement de `NEXT_PUBLIC_ECOMMERCE_STORE_URL`. L'URL d'une boutique se calcule **uniquement** par `storeUrl(store)` (= `${PLATFORM_URL}/boutique/${slug}` aujourd'hui), utilisé dans les liens de suivi, WhatsApp, sitemap, metadata et liens de promo copiés depuis l'admin.

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
- Les `locations` restent globales à la fin de la phase 1. Décision du 2026-11-03 : chaque boutique gère ses propres quartiers. C'est fait en phase 2 (item 7).
- Le middleware de l'admin saute la vérification de révocation de jeton quand `FIREBASE_AUTH_EMULATOR_HOST` est défini : elle demande un jeton OAuth Google, que l'émulateur ne fournit pas.
- e2e : `scripts/e2e/run.sh` fait le build (dans `.next-e2e`), le seed avant migration, la migration (dry run, apply, puis un second apply qui ne change rien), les 11 vérifications vitrine, 7 vérifications d'isolation dans l'admin et 8 sur les formulaires (console `/platform`, paiement cash, réglages avec plusieurs GTM et Pixels, équipe, sélecteur).

### Phase 2 : vitrine par boutique, routage par chemin (2 à 3 semaines)

1. Déplacer les pages sous `app/[site]/`, réécriture par chemin dans `src/proxy.ts` (3.2), `getSiteContext`, `siteHref` / `useSiteHref` sur tous les liens, clés de panier par site, `storeUrl()`.
2. Chargeurs paramétrés par scope (3.3) et route `/api/revalidate`, appelée par l'admin.
3. API : boutique résolue depuis le `site` envoyé par le client, puis vérifiée côté serveur. `priceOrder` et `placeOrder` en mode boutique (une boutique par commande). Rejeter un panier qui contient un produit d'une autre boutique.
4. Réglages par boutique : marque (nom, logo), WhatsApp (Footer, contact), tous les conteneurs GTM et tous les Pixels Meta de la boutique dans le layout, notifications et CAPI depuis `settings` / `storeSecrets`, avec secours sur les variables d'environnement.
5. SEO par boutique (sitemap, robots, metadata, canonique) via `storeUrl()`.
6. Admin : bouton « Voir ma boutique » et « Copier le lien » (`storeUrl(store)`), et liens de promo copiés avec le préfixe de la boutique.
7. **Quartiers par boutique** :
   - `storeId` sur `locations` ;
   - l'admin y accède par `lib/tenant.ts` : retirer `locations.actions.ts` de la liste blanche de `check-tenant`, et `listLocations` devient un `scopedList` ;
   - l'unicité (nom, ville) se vérifie dans la boutique, et une zone ne peut référencer que les quartiers de sa boutique ;
   - migration `scripts/migrate-locations-per-store.mjs`, en simulation par défaut et idempotente : un quartier utilisé par une seule boutique (par ses `shipments` ou par ses conditions de promo `LOCATION`) reçoit ce `storeId`. Un quartier partagé est copié pour chaque boutique, avec un nouvel id, et les `locationIds` et conditions concernés sont réécrits. Un quartier inutilisé va à la boutique N.Gift, à préciser avec `--default-store` ;
   - côté vitrine, les zones sont lues par boutique.
8. Unicité **par boutique** des slugs (produits, articles, catégories) et des codes promo : remplacer `isTakenAcrossStores` par `isTakenInStore` une fois la vitrine résolue par boutique.

Tests e2e émulateur :
- `localhost:3101/boutique/a` n'affiche que les produits, promos et zones de A ; tous les liens de la page restent sous `/boutique/a` ; une commande sur A a `storeId = A` et aucune promo de B ne s'y applique ;
- le panier de A et celui de B sont indépendants dans le même navigateur ;
- un `site` falsifié dans l'appel API (produit de B envoyé avec `site=a`) est rejeté ;
- un code promo de B saisi sur A renvoie `invalid` ;
- un slug inconnu renvoie 404, une boutique `pending` ou `suspended` renvoie 404 ;
- le sitemap de A ne contient que A ;
- une boutique avec deux Pixels et deux conteneurs GTM les charge tous les quatre, et une commande envoie l'achat CAPI aux deux Pixels avec le même `event_id` ;
- modifier un produit dans l'admin met à jour la vitrine via `/api/revalidate` sans attendre 5 minutes ;
- A ne voit ni ne modifie les quartiers de B. Après la migration des quartiers, une commande sur A trouve toujours sa zone et son tarif, et la migration relancée ne change rien ;
- deux boutiques peuvent avoir le même slug de produit et le même code promo.

**Réalisé (branche `multi-tenant`, 2026-11-03), avec ces écarts :**
- **Liens** : `SiteLink` (`src/components/Site.tsx`) remplace `next/link` partout et ajoute le préfixe lui-même, avec `useSiteRouter` pour `router.push` et `replace`. Les `href="/shop"` restent donc écrits tels quels. Le garde-fou `scripts/check-store-links.mjs` (en CI) interdit `next/link`, `useRouter` de `next/navigation`, `redirect('/…')` et `<a href="/…">` dans `nature_gift_store/src`, au lieu d'interdire `href="/`. Le paramètre `?redirect=` de la connexion est un chemin interne au site.
- **URL de la plateforme** : `NEXT_PUBLIC_PLATFORM_URL` (renommée depuis `NEXT_PUBLIC_ECOMMERCE_STORE_URL`) dans les deux apps. Elle est publique (`NEXT_PUBLIC_`) parce que les composants client de l'admin en ont besoin. `storeUrl()` et `siteHref()` sont dans `packages/core/src/site.ts` (avec `site.check.ts`).
- **Marketplace (racine) en phase 2** : c'est le site actuel. Elle affiche les produits `marketplaceListed` des boutiques actives et listées, et les liens publicitaires existants (`/shop/<slug>`, `/blogs/<slug>`) continuent de marcher. Prix, zones et promos viennent toujours de la boutique du produit ou de l'article. Un panier qui mélange deux boutiques est **refusé** (409 `MIXED_STORES`, message au paiement) jusqu'au découpage de la phase 4. Le bandeau promo de l'accueil marketplace montre les promos de toutes les boutiques (affichage seulement). Le paiement marketplace reçoit les zones de toutes les boutiques et ne garde que celles de la boutique du panier. Si deux boutiques ont le même slug, `/shop/<slug>` à la racine prend le premier produit listé (phase 4 : pages vendeur).
- **Paniers** : la marketplace garde les clés `cart-storage` et `promo-codes`, pour que les paniers existants survivent. Les boutiques utilisent `cart-storage:<slug>` et `promo-codes:<slug>`. La wishlist reste commune : elle ne contient que des chemins de produits, et la page Favoris de chaque site n'affiche que ses produits.
- **Variables d'environnement** : la liste exacte de chaque app est dans son `.env.example`. Aucune variable ne remplace un réglage de boutique : Flock, emails, SMS, GTM, Pixels et jetons CAPI de chaque boutique, N.Gift comprise, se règlent dans l'admin (Réglages). Restent seulement celles de la plateforme, préfixées `PLATFORM_` : `PLATFORM_GTM_ID` (GTM des pages marketplace), `PLATFORM_CONTACT_EMAIL` (formulaire de contact de la marketplace ; celui d'une boutique va à ses emails d'alerte, sinon à son email public), `PLATFORM_FLOCK_WEBHOOK_URL` (alerte quand la vitrine ne lit plus Firestore) et `PLATFORM_CONTACT_WHATSAPP` (admin). NotificationAPI passe en `NOTIFICATIONAPI_CLIENT_ID` et `NOTIFICATIONAPI_CLIENT_SECRET`, côté serveur uniquement. Sont supprimées : `LEGACY_STORE_ID`, `FLOCK_WEBHOOK_URL`, `META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`, `NEXT_PUBLIC_ADMIN_EMAIL`, `NEXT_PUBLIC_ADMIN_PHONE_NUMBER`, `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`, `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`, `NEXT_PUBLIC_RICH_TEXT_VERSION`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (vitrine), `CLOUDINARY_URL`, `OPENAI_API_KEY`, `DATABASE_URL` et `OPTIMIZE_*` (avec l'ancien seed Prisma de l'admin, déjà entièrement commenté).
- **Pixels navigateur** : le code de base Meta est chargé une fois, avec un `fbq('init')` par Pixel. L'achat part aussi par `fbq('track', 'Purchase', …, { eventID: <id commande> })`, le même id que l'événement CAPI. `META_GRAPH_URL` (vide en prod) permet aux tests de remplacer `graph.facebook.com`.
- **Revalidation** : les tags sont `store:<id>`, `market` (lectures sur plusieurs boutiques ou par chemin) et `stores` (slugs et statuts). L'admin envoie les trois après chaque écriture passée par `lib/tenant.ts` (`scopedCreate`, `Update`, `Delete`, `Transaction`), et après les réglages et les actions `/platform`. Il faut la variable `REVALIDATE_SECRET`, avec la même valeur, dans les deux apps.
- **SEO** : `app/[site]/robots.txt` et `app/[site]/sitemap.xml` sont des gestionnaires de route, pas les fichiers de métadonnées de Next. Les robots ne lisent que `/robots.txt` (celui de la marketplace), qui pointe vers le sitemap marketplace. Ce sitemap liste les produits à leur adresse dans leur boutique. Canonique d'un produit : sa page dans sa boutique, même vu depuis la marketplace.
- **Marque** : en mode boutique, le nom de la boutique en texte (le logo vient avec le thème en phase 3), son WhatsApp et son email (pied de page, contact, `<title>`). L'adresse physique de N.Gift ne s'affiche que sur la marketplace. Dans l'admin, les messages WhatsApp (commande, panier abandonné) et le bon d'impression utilisent le nom de la boutique.
- **Quartiers** : une zone qui cite le quartier d'une autre boutique est refusée (403) dans `scopedCreate` et `scopedUpdate`. La vitrine ignore aussi un tel quartier (`toShippingZones`). Les copies créées par la migration ont l'id `<id>_<storeId>`. Si la migration est interrompue, une relance réécrit les zones et les promos vers les copies déjà créées.
- **Produits** : un produit créé dans l'admin reçoit `marketplaceListed: true`, comme les produits migrés. Un suivi `/boutique/<slug>/order/<id>` n'ouvre que les commandes de cette boutique, et le profil client en mode boutique ne liste que ses commandes.
- Pas d'index composite : toutes les nouvelles requêtes ne font que des égalités.
- **Ordre de mise en prod** : (1) dans l'admin de prod, remplir les Réglages de N.Gift : emails et numéros d'alerte, Flock, GTM `GTM-PZPWRLKC`, Pixel Meta et son jeton CAPI. Sans ça, ses commandes n'alertent plus personne après le déploiement. (2) Créer le secret `REVALIDATE_SECRET` et y donner accès aux deux backends (`scripts/apphosting-secrets.sh` le fait). (3) Lancer `scripts/migrate-locations-per-store.mjs --default-store <id N.Gift>`, d'abord en simulation puis avec `--apply`, juste avant le déploiement des deux apps, puis une seconde fois juste après.
- e2e : `scripts/e2e/run.sh` ajoute la migration des quartiers (simulation, application, relance sans effet), 2 vérifications de quartiers dans l'admin (liste, zone avec le quartier d'une autre boutique, modification et suppression par A d'un quartier de B, unicité par boutique) et 13 vérifications vitrine par boutique (`site-checks.cjs`). Le test des paniers tourne dans un vrai Chromium (Playwright, déjà installé avec `react-scan`). Il est sauté si aucun navigateur n'est trouvé.
- Outillage e2e : la vitrine applique les réécritures du proxy à son propre chemin réécrit. Le proxy marque donc sa réécriture avec un en-tête interne (une valeur aléatoire par serveur) et laisse passer ce second passage. Le build e2e utilise `tsconfig.e2e.json` (`typescript.tsconfigPath` quand `E2E_DIST_DIR` est défini), qui ignore les types qu'un serveur de dev a laissés dans `.next/`. Il relance le build jusqu'à 3 fois quand `next/font` échoue : le 2026-11-03, Google Fonts renvoyait par moments des URL sans extension (`/l/font?kit=…`), que Next 16.1.5 ne sait pas lire. Le même échec peut toucher un build Vercel.

### Phase 3 : thèmes (2 à 4 semaines)

1. `StoreTheme`, préréglages, injection des variables CSS, polices, `contrastRatio` + check.
2. Page Thème de l'admin : couleurs, rayon, police, logo, favicon. Aperçu en direct par iframe et brouillon, puis publication.
3. Sections de la page d'accueil (3.7) : registre, schémas zod, éditeur (ajouter, réordonner, masquer, éditer).
4. Accessibilité : `@axe-core/playwright` sur l'accueil, une fiche produit, le panier et le paiement, pour chaque préréglage. Zéro violation sérieuse ou critique.

Tests : couleur à faible contraste refusée ; publier un thème change la vitrine ; le brouillon n'est visible qu'avec le jeton d'aperçu.

**Réalisé (branche `multi-tenant`, 2026-11-03), avec ces écarts :**
- **Cœur** : `packages/core/src/theme.ts` (types, préréglages `nature`, `minimal` et `bold`, `contrastRatio`, `contrastProblems`, `themeVariables`/`themeCss`, `DEFAULT_SECTIONS`, `videoEmbedUrl`) et `theme-preview.ts` (jeton d'aperçu), vérifiés par `theme.check.ts`. `Store` gagne `theme?` et `themeDraft?`.
- **Brouillon** : `stores/{id}.themeDraft` (champ à part) au lieu de `theme.draft`. « Publier » copie le formulaire dans `theme` et efface `themeDraft`. « Appliquer un préréglage » et « Abandonner le brouillon » sont deux petits formulaires séparés.
- **Aperçu en direct** : la page Thème affiche l'iframe à côté du formulaire. Les couleurs, la police et les coins arrondis y arrivent à l'instant par `postMessage`. La vitrine (`ThemePreviewListener`, actif seulement avec un jeton valide) n'accepte que les messages venant de `NEXT_PUBLIC_ADMIN_DASHBOARD_URL` et que des variables CSS aux valeurs simples. Chaque changement est aussi enregistré tout seul comme brouillon après 0,8 s de pause (`autosaveThemeDraft`), et l'iframe se recharge quand les sections, le logo ou le favicon ont changé.
- **Jeton d'aperçu** : sans lecture en base. L'admin signe `<expiration>.<HMAC-SHA256(storeId:expiration)>` (valable 1 h) avec `REVALIDATE_SECRET`, déjà partagé par les deux apps. Le proxy de la vitrine recopie `?preview=` dans l'en-tête `x-theme-preview`, parce que le layout n'a pas accès aux paramètres de recherche. Le layout vérifie le jeton, puis affiche le brouillon et ajoute `noindex`. L'aperçu ne vaut que pour la page ouverte : les liens cliqués dans l'iframe perdent `?preview=`, parce que les cookies tiers sont bloqués.
- **Pas de migration** : une boutique sans `theme` garde exactement le CSS actuel (`globals.css` = préréglage `nature`), rien n'est injecté. Dès qu'un thème est enregistré, toutes ses variables sont calculées (texte atténué, bordures, `--primary-foreground` noir ou blanc), donc le rendu de `nature` enregistré diffère très légèrement de l'actuel.
- **Contraste** : refus en dessous de 4.5:1 pour texte/fond, primary/fond (liens et prix), texte des boutons/primary, texte/accent, et pour les couleurs fixes d'erreur et de promo sur le fond. Ces deux dernières règles interdisent de fait les fonds sombres tant que ces couleurs ne dépendent pas du thème. La vitrine revérifie : un thème écrit en base en contournant l'admin, avec des couleurs non conformes ou qui ne sont pas des triplets HSL, retombe sur les couleurs du préréglage (pas d'injection CSS possible).
- **Polices** : `fredoka` (celle de N.Gift) ajoutée à la liste fermée. Les cinq polices sont déclarées dans le layout racine (variables sur `<html>`). Le navigateur ne télécharge que celle que `--font-theme` utilise.
- **Bandeau d'annonce** (la ligne au-dessus de l'en-tête) : `theme.announcement`, 160 caractères, réglé dans la page Thème avec le reste (brouillon, aperçu, publication). Une boutique sans texte n'a pas de bandeau ; la marketplace garde le texte traduit de la plateforme.
- **Logo, favicon et image du héros** : envoyés par le widget Cloudinary existant (`ImageUpload`). Une image qui n'est pas sur Cloudinary est affichée sans passer par l'optimiseur de Next.
- **Sections** : registre dans `components/Home/StoreSections.tsx`, schémas zod dans l'admin (`lib/validations/theme.ts`). La vitrine fait confiance aux données validées et ignore un type inconnu. FAQ en `<details>` natifs, texte sans HTML, vidéo YouTube (`youtube-nocookie`) ou Vimeo seulement, 20 sections au plus. Sans sections enregistrées, une boutique affiche `DEFAULT_SECTIONS` (héros, catégories, produits vedettes, promo, nouveautés). La marketplace garde sa page actuelle jusqu'à la phase 4.
- **Accessibilité** : `axe-core` (déjà installé avec `eslint-plugin-jsx-a11y`) injecté par Playwright, au lieu d'ajouter `@axe-core/playwright`. Accueil, fiche produit, panier et paiement de la boutique A, pour chacun des 3 préréglages : aucune violation sérieuse ou critique trouvée, sans correction nécessaire.
- e2e : `scripts/e2e/theme-checks.cjs` ajoute 6 vérifications, dont l'aperçu en direct dans Chromium sur la vraie page Thème (couleur reçue à l'instant, titre enregistré tout seul puis affiché, vitrine publiée inchangée) : refus (contraste avec le ratio cité, section invalide, valeur qui n'est pas une couleur, membre staff), brouillon visible seulement avec le lien signé de l'admin (ni falsifié ni sur une autre boutique, section masquée absente), publication immédiate sans effet sur B ni sur la marketplace, préréglage puis abandon du brouillon, audit axe.

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

**Réalisé (branche `multi-tenant`, 2026-11-03), avec ces écarts :**
- **Prix par boutique** : `src/lib/api/price-cart.ts`, commun à l'aperçu (`/api/promotions/calculate`) et à la commande. Il lit les produits côté serveur, puis les groupe par boutique (`resolveCartGroups`, qui remplace `resolveCartStore`). Chaque groupe reçoit sa zone, ses promos et son `PromotionCalculator`. L'aperçu renvoie les totaux plus `groups[]` (boutique, sous-total, livraison, remises, total, `shippingKnown`). Un code appliqué dans une boutique compte comme appliqué ; il n'est « invalide » que si aucune boutique ne le connaît. L'aperçu ne fait plus confiance au prix ni aux frais envoyés par le client.
- **Quartier commun** : le client choisit un seul quartier. Comme chaque boutique a ses propres `locations` (phase 2), chaque boutique retrouve le sien par id, sinon par même nom et même ville. Une boutique qui ne livre pas ce quartier a sa livraison « à confirmer », sans promo de livraison. Au paiement, un quartier proposé par plusieurs boutiques n'est listé qu'une fois.
- **Commande découpée** : une commande par boutique, toutes écrites dans une seule transaction (stock et usages de promos vérifiés pour toutes). Elles partagent `checkoutGroupId` (posé seulement s'il y a plusieurs boutiques) et `trackingToken`. La réponse de `/api/orders` garde la première commande à plat (compatibilité) et ajoute `orders`, `checkoutGroupId` et `trackingToken`. Les alertes (Flock, email, SMS, CAPI) partent par boutique après le commit. Le refus 409 `MIXED_STORES` de la phase 2 disparaît.
- **Suivi de groupe** : `/order/group/<id>?t=<jeton>`, marketplace seulement, avec une carte par boutique et le lien vers le suivi détaillé de chaque commande. La page de confirmation y renvoie quand il y a plusieurs commandes.
- **Paniers abandonnés** : un document par boutique pour un panier mixte (`<id>_<storeId>`), l'id de session seul sinon (`checkoutDocId`). Chaque commande marque le sien comme converti. Limite connue : si le panier passe de une à plusieurs boutiques (ou l'inverse) pendant la saisie, l'ancien document reste en panier abandonné.
- **Pixel navigateur** (`src/lib/analytics/pixel.ts`), en plus du GTM : `PageView` à chaque changement de page (`PixelPageViews` ; le code de base ne compte que le premier chargement), `ViewContent` (fiche produit et page pub), `AddToCart`, `RemoveFromCart` (événement personnalisé, Meta n'a pas d'événement standard pour ça), `InitiateCheckout` (paiement et formulaire de page pub) et `Purchase`. Les contenus portent les ids de produits, la quantité, le prix et la valeur en XAF. `Purchase` part une fois par commande, avec `eventID` = id de la commande, comme l'événement CAPI côté serveur. Ces appels ne font rien sur la marketplace, qui ne charge pas de Pixel. Au passage, les événements GTM `add_to_cart` et `remove_from_cart` envoyaient le panier avant l'ajout ou après le retrait : ils envoient désormais le produit concerné. Le GTM `purchase` du panier utilise l'id du groupe s'il y a plusieurs commandes.
- **Qualité de correspondance Meta** (la note sur 10 du Gestionnaire d'événements). Elle plafonnait à environ 6/10. Corrections :
  - la ville était hachée sans son accent supprimé correctement (`yaound` au lieu de `yaounde`) ;
  - l'email (quand il est saisi) et `external_id` (hash du téléphone) sont maintenant envoyés ;
  - `fbc` est reconstruit depuis le `fbclid` de l'adresse quand le cookie `_fbc` manque, côté serveur (référent) comme côté navigateur (cookie posé par `PixelPageViews`) ;
  - le code de base du Pixel fait de la correspondance avancée avec les données client gardées après une commande (`temporal-user-storage`) ;
  - `InitiateCheckout` part aussi par l'API Conversions, une fois par session, dès que le nom et le téléphone sont saisis (`/api/checkouts`), avec le même `event_id` que l'événement navigateur (l'id de session du paiement).

  `meta-capi.ts` expose `sendMetaEvent`, `getStorePixels` et `requestSignals`. Un 10/10 reste hors d'atteinte sur `PageView` et `ViewContent`, qui viennent de visiteurs anonymes. À faire côté Meta et GTM : activer la correspondance avancée automatique du Pixel, et limiter le tag Meta du conteneur GTM (il envoie `gtag.config` et `view_cart` comme événements Meta).
- **Pages marketplace** : la section « Nos boutiques » sur l'accueil, la page vendeur `/vendeur/<slug>` (marketplace seulement : produits listés et lien vers la boutique), et le badge « Vendu par » sur les cartes produit. Les liens produits de la marketplace (cartes, recherche) portent `?vendeur=<slug>` : deux boutiques peuvent ainsi avoir le même slug de produit. Sans ce paramètre (anciens liens publicitaires), c'est toujours le premier produit listé. La liste des boutiques listées (id, nom, slug) est lue une fois, en cache (tag `stores`), et transmise au client par le contexte du site.
- **Panier groupé** : sur la marketplace, le panier, le panneau latéral et le résumé de paiement affichent les articles par boutique. Le résumé montre le sous-total, la livraison, les promos et le total de chaque boutique, puis le total général.
- **Recherche** : `/api/search` était déjà scopée et en cache (phase 2). Elle renvoie en plus le `storeId`, pour les liens `?vendeur=`. Typesense n'est pas nécessaire pour l'instant.
- **Modération** : `/platform/products?store=<id>` (admin plateforme) masque ou relist un produit sur la marketplace. Le produit reste dans la boutique elle-même. `marketplaceListed` est verrouillé dans `scopedUpdate` (la boutique ne peut pas se relister) et toujours `true` à la création. Le masquage d'une boutique entière existait déjà (phase 1).
- e2e : `scripts/e2e/market-checks.cjs` ajoute 10 vérifications (dont les données client de l'API Conversions et les événements Pixel dans Chromium, `fbevents.js` intercepté) : aperçu par boutique, paniers abandonnés par boutique, rupture chez B sans aucune commande, 2 commandes avec le même groupe (frais et promos propres), suivi de groupe, chaque admin ne voit que sa commande, pages vendeur, badges et `?vendeur=`, modération. `scripts/e2e/admin-session.cjs` regroupe la connexion à l'admin et l'envoi de formulaires.

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
- Les `locations` (quartiers), les zones et les tarifs sont **par boutique** (2026-11-03).
- Pas d'éditeur libre de type Wix : préréglages, réglages et sections uniquement, pour garantir l'accessibilité.
- La commande marketplace est découpée en une commande par boutique, liées par `checkoutGroupId`.

## 6. Questions ouvertes (valeur par défaut entre parenthèses, à confirmer)

1. Nom commercial du SaaS (« N.Gift ») et, en phase 6, son domaine (`ngift.cm`).
2. URL canonique des produits présents sur la marketplace et sur la boutique (domaine de la boutique).
3. Commission marketplace sur les ventes : hors périmètre tant que le paiement en ligne n'existe pas (pas de commission, abonnement uniquement).
4. Comptes clients partagés entre boutiques (non, comptes locaux à chaque hôte, commande sans compte).
5. Prix et durée de l'abonnement payé en cash (montant mensuel fixe, saisi par le super-admin à chaque paiement, aucun prix codé en dur).

## 7. Démarrer la prochaine conversation

**État au 2026-11-03 :**
- **Phase 0 terminée** (commit `dabd94d`) : `packages/core` lié par `file:`, CI, e2e. Voir « Réalisé » en phase 0.
- **Phase 1 terminée** (commit `a406737`) : `lib/tenant.ts`, migration, Réglages (plusieurs GTM et Pixels), Équipe, `/platform`, règles Firestore. Voir « Réalisé » en phase 1.
- **Phase 2 terminée** (commit `adcd241`) : `app/[site]`, routage `/boutique/<slug>`, chargeurs par boutique, `/api/revalidate`, quartiers par boutique, nettoyage des variables d'environnement. Voir « Réalisé » en phase 2.
- **Phase 3 terminée** (commit `4b255fc`) : thèmes, page Thème avec brouillon et aperçu signé, sections d'accueil, audit axe. Voir « Réalisé » en phase 3.
- **Phase 4 terminée** (commit « Phase 4: marketplace… », juste après `4b255fc`) : commande découpée par boutique, suivi de groupe, pages vendeur, modération. Voir « Réalisé » en phase 4.
- Ne pas refaire ni relire en détail le code des phases 0 et 1 : partir des sections « Réalisé » et ne lire que les fichiers que la phase 2 touche.
- Le dev et le build sont en webpack (`--webpack`). Turbopack bloquait le dev avec `packages/core`.

> Lis `docs/MULTI_TENANT_PLAN.md` (sections 1, 3.2 à 3.4, la phase 2 et les notes « Réalisé » des phases 0 et 1) et les mémoires `work-in-main-checkout`, `emulator-testing` et `firestore-quota-incident`. Les phases 0 et 1 sont terminées : ne les refais pas. Travaille directement dans `/Volumes/Data/Project/store`, sur la branche `multi-tenant`. Exécute la **phase 2** en entier, quartiers par boutique compris, en respectant la section 1. Teste avec `scripts/e2e/run.sh`, en y ajoutant les tests de la phase 2. Ensuite, fais un résumé et attends mon feu vert pour la phase 3.
