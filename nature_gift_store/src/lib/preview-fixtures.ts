// The sample catalogue of the theme preview (/theme_preview): the owner sees their theme on
// these, without a database read. Only the fields the home sections read.
import { Category, Product, Promotion, Review } from './firebase/models'

const DAY = 86_400_000
const now = Date.now()
const image = (n: number) => ({
  fileName: `sample-${n}.svg`,
  type: 'image',
  url: `/preview/sample-${n}.svg`,
})

const SAMPLES: [title: string, category: string, price: number, sale: number | null][] = [
  ['Savon au karité', 'Soins', 3500, 2800],
  ['Miel de forêt', 'Épicerie', 6000, null],
  ['Bougie parfumée', 'Maison', 8500, null],
  ['Panier tressé', 'Cadeaux', 12000, 9500],
  ["Huile de coco", 'Soins', 4500, null],
  ["Café d'altitude", 'Épicerie', 5500, null],
  ["Thé à l'hibiscus", 'Épicerie', 3000, null],
  ['Coffret découverte', 'Cadeaux', 15000, null],
]

export const SAMPLE_PRODUCTS = SAMPLES.map(
  ([title, category, regular, sale], i) =>
    ({
      path: `products/sample-${i}`,
      slug: `sample-${i}`,
      title,
      categories: [category],
      medias: [image((i % 4) + 1)],
      price: {
        regular,
        sale,
        saleStartDate: new Date(now - DAY).toISOString(),
        saleEndDate: new Date(now + 30 * DAY).toISOString(),
      },
      inventory: { quantity: 10, lowStockThreshold: 2, stockQuantity: 10 },
      isFeature: i < 4,
      isNewProduct: i >= 4,
    }) as unknown as Product,
)

export const SAMPLE_CATEGORIES = ['Soins', 'Épicerie', 'Maison', 'Cadeaux'].map(
  (name, i) =>
    ({ path: `categories/sample-${i}`, slug: `sample-${i}`, name, image: image(i + 1) }) as unknown as Category,
)

export const SAMPLE_REVIEWS = [
  ['Aminata', 'Livraison rapide et produits de qualité. Je recommande !'],
  ['Paul', 'Très bien emballé, conforme à la description.'],
  ['Grace', 'Mon cadeau a fait plaisir, je repasserai commande.'],
].map(([userName, comment]) => ({ userName, comment, rating: 5 }) as Review)

export const SAMPLE_PROMOTIONS = [
  {
    path: 'promotions/sample',
    name: '-20 % sur les soins',
    description: 'Exemple de promotion : vos promotions en cours s’afficheront ici.',
  } as Promotion,
]
