// Adds the Yaoundé neighbourhoods and sectors to the `locations` collection. Safe to run twice:
// a name already in the city (ignoring case, accents, dashes and spaces) is skipped.
//
//   node scripts/seed-yaounde-locations.mjs .env              # dry run: lists what would be created
//   node scripts/seed-yaounde-locations.mjs .env --apply      # writes them
//
// A location only shows on the store once it is added to an active shipment (delivery zone).
// Source: doc "Quartiers et secteurs de Yaoundé – zones de livraison"; edit the list below before running.
import { readFileSync } from 'node:fs'
import admin from 'firebase-admin'

const CITY = 'Yaoundé'
const NAMES = [
  // Yaoundé I
  'Centre-ville – Hippodrome', 'Centre-ville – Carrefour Warda', 'Centre-ville – Montée Anne-Rouge',
  'Centre-ville – Poste centrale',
  'Bastos – Carrefour', 'Bastos – Ambassades', 'Bastos – Nouvelle route',
  'Nlongkak – Carrefour', 'Nlongkak – Bata', 'Nlongkak – Ntaba',
  'Etoudi – Carrefour', 'Etoudi – Palais', 'Etoudi – Marché à bétail',
  'Emana – Carrefour', 'Emana – Pont',
  'Olembé – Stade', 'Olembé – Centre',
  'Mballa II', 'Mballa IV',
  'Elig-Edzoa – Carrefour', 'Etoa-Meki – Carrefour', 'Messassi – Carrefour',
  'Nkolondom', 'Djoungolo', 'Ekombitié', 'Manguier', 'Tongolo', 'Okolo', 'Njon-Essi',
  'Ngoulemakong', 'Mfandena',
  // Yaoundé II
  'Mokolo – Marché', 'Mokolo – Quartier',
  'Tsinga – Carrefour', 'Tsinga – Lycée', 'Tsinga – Mairie Yaoundé 2',
  'Messa – Carrière', 'Messa – Plateau', 'Messa – Administratif', 'Messa – Azegue Mezala', 'Grand Messa',
  'Briqueterie – Centre', 'Briqueterie – Grande Mosquée',
  'Cité Verte – Marché', 'Cité Verte – Carrefour',
  'Madagascar', 'Fébé – Mont Fébé', 'Oliga', 'Nkomkana', 'Ntougou', 'Ekoudou', 'Angono', 'Doumassi',
  'Ekoazon',
  // Yaoundé III
  'Ngoa-Ekélé – Université Yaoundé I', 'Ngoa-Ekélé – Carrefour',
  'Obili – Carrefour', 'Obili – Chapelle',
  'Mvan – Tradex', 'Mvan – Carrefour',
  'Nsimeyong – Chapelle', 'Nsimeyong',
  'Nsam – Dépôt SCDP', 'Nsam – Carrefour',
  'Mvolyé – Basilique', 'Nlong-Mvolyé',
  'Efoulan – Mairie Yaoundé 3', 'Ahala – Carrefour',
  'Centre administratif – Quartier du Lac', 'Plateau gouvernemental',
  'Elig-Efa', 'Afanoyoa', 'Dakar', 'Etoa', 'Mekoumbou', 'Messong', 'Obobogo', 'Olezoa', 'Nkol-Mbenda',
  'Nkolfon', 'Nkolguet', 'Mfoundassi',
  // Yaoundé IV
  'Odza – Borne 10', 'Odza – Borne 12', 'Odza – Entrée Minkam', 'Odza – Commissariat',
  'Ekounou – Marché', 'Ekounou – Campus UCAC', 'Ekounou – Tribunal', 'Ekounou – Supermarché Carrefour',
  'Mimboman – Terminus', 'Mimboman – Gare routière', 'Mimboman – Plateau', 'Mimboman – Dispensaire',
  'Kondengui – Prison centrale', 'Kondengui – Mairie Yaoundé 4',
  'Mvog-Mbi – Marché', 'Anguissa',
  'Awaé – Mvog-Manga', 'Awaé – Carrefour',
  'Nkolndongo', 'Nkomo – Nord', 'Nkomo – Sud', 'Ekié – Nord', 'Ekié – Sud', 'Mvan – Nord', 'Mvan – Sud',
  'Biteng', 'Ewonkan', 'Nkolo', 'Mbog-Abang', 'Ekoumdoum', 'Tropicana', 'Ndamvout', 'Ntouessong',
  'Messamendongo', 'Toutouli', 'Meyo', 'Abomé', 'Minkan',
  // Yaoundé V
  'Essos – Centre', 'Essos – Nord', 'Essos – Sud', 'Essos – Marché', 'Essos – Camp Sonel',
  'Mfandena – Stade Ahmadou-Ahidjo',
  'Ngousso – Cimetière', 'Ngousso – Marché Total', 'Ngousso – Hôpital Général', 'Ngousso-Ntem',
  'Mvog-Ada', 'Mvog-Ada – Carrefour',
  'Nkolmesseng – Mairie Yaoundé 5', 'Nkolmesseng – Lycée bilingue',
  'Mvog-Ebanda – Marché', 'Fougerolle – Marché', 'Quartier Fouda', 'Eleveur',
  // Yaoundé VI
  'Mendong – Rond-point Express', 'Mendong – Jouvence', 'Mendong – Marché', 'Mendong – TKC',
  'Mendong – Camp SIC', 'Mendong – Total', 'Mendong – Avant Fokou', 'Mendong – Palais de justice',
  'Biyem-Assi – Carrefour', 'Biyem-Assi – Acacias', 'Biyem-Assi – Tam-Tam Week-end',
  'Biyem-Assi – Carrefour Tam-Tam', 'Biyem-Assi – Montée du Lycée', 'Biyem-Assi – Lac',
  'Melen I', 'Melen III', 'Melen IV', 'Melen V', 'Melen VI', 'Melen VII A', 'Melen VII B', 'Melen VIII C',
  'Melen IX', 'Melen – Carrefour',
  'Mvog-Betsi – Zoo', 'Mvog-Betsi – Carrefour',
  'Etoug-Ebé – Carrefour', 'Simbock – Carrefour', 'Nkolbikok', 'Eba Biyem-Assi',
  // Yaoundé VII
  'Nkolbisson – Centre', 'Nkolbisson – Marché',
  'Oyom-Abang', 'Oyom-Abang – Carrefour',
  'Etetak', 'Nnom-Nnam', 'Ndamvouth', 'Nkomassi', 'Nkol-So', 'Mbog-Doum', 'Abobo', 'Ebot-Mefou',
]

// Same rule as the admin (lib/actions/locations.actions.ts): no case, accents, dashes or extra spaces.
const key = (text = '') =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[\s\-–—_'’.]+/g, ' ')
    .trim()

const [envFile, ...flags] = process.argv.slice(2)
if (!envFile) {
  console.error('Usage: node scripts/seed-yaounde-locations.mjs <env file> [--apply]')
  process.exit(1)
}
const apply = flags.includes('--apply')

const env = {}
for (const m of readFileSync(envFile, 'utf8').matchAll(/^([A-Z_]+)=(?:"([\s\S]*?)"|(.*))$/gm)) {
  env[m[1]] = m[2] ?? m[3]
}
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
})
const db = admin.firestore()

console.log(`Project: ${env.NEXT_PUBLIC_FIREBASE_PROJECT_ID} — ${apply ? 'APPLY' : 'dry run'}\n`)
const taken = new Set(
  (await db.collection('locations').get()).docs
    .filter(doc => key(doc.get('city')) === key(CITY))
    .map(doc => key(doc.get('name'))),
)
const batch = db.batch() // ponytail: one batch, 500 writes max; the list is ~200
const now = new Date().toISOString()
let created = 0
for (const name of NAMES) {
  if (taken.has(key(name))) {
    console.log(`skip   ${name} (exists)`)
    continue
  }
  taken.add(key(name))
  batch.set(db.collection('locations').doc(), {
    name,
    city: CITY,
    isActive: true,
    creatorId: 'seed-yaounde-locations',
    createdAt: now,
    updatedAt: now,
  })
  created++
  console.log(`create ${name}`)
}

if (created === 0) console.log('Nothing to create.')
else if (apply) {
  await batch.commit()
  console.log(`\n${created} location(s) created.`)
} else console.log(`\n${created} location(s) would be created. Re-run with --apply to write.`)
process.exit(0)
