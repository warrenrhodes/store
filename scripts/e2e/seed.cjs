// Test data for the e2e checks. Only ever called against the emulators (see run.sh).
const UID = 'admin-uid'
const now = new Date().toISOString()
const day = 86400000
const img = 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
const base = { creatorId: UID, createdAt: now, updatedAt: now }

module.exports = async function seed(admin) {
  const db = admin.firestore()
  // Fresh start
  for (const c of [
    'products',
    'categories',
    'locations',
    'shipments',
    'promotions',
    'blogs',
    'orders',
    'checkouts',
    'reviews',
    'users',
  ]) {
    const docs = await db.collection(c).listDocuments()
    await Promise.all(docs.map(d => d.delete()))
  }
  try {
    await admin.auth().deleteUser(UID)
  } catch {}
  await admin
    .auth()
    .createUser({
      uid: UID,
      email: 'admin@test.cm',
      password: 'Test1234!',
      displayName: 'Admin Test',
      emailVerified: true,
    })
  await db
    .doc(`users/${UID}`)
    .set({
      authId: UID,
      email: 'admin@test.cm',
      fullName: 'Admin Test',
      userType: 'ADMIN',
      isAnonymous: false,
      whitelists: [],
      createdAt: now,
      updatedAt: now,
    })

  await db
    .doc('categories/cat-cafe')
    .set({
      ...base,
      name: 'Café',
      slug: 'cafe',
      featured: true,
      description: null,
      image: null,
      parentPath: null,
    })
  const product = (title, slug, price, inventory) => ({
    ...base,
    title,
    slug,
    status: 'PUBLISHED',
    visibility: true,
    isFeature: true,
    isNewProduct: false,
    description: { contentType: 'TEXT', content: `${title} — test product` },
    medias: [{ fileName: 'sample.jpg', type: 'IMAGE', url: img }],
    categories: ['Café'],
    tags: [],
    features: [],
    price: { regular: price, sale: null },
    inventory,
    metadata: { seoTitle: title, seoDescription: title, keywords: [] },
  })
  await db
    .doc('products/cafe')
    .set(
      product('Café Ginseng', 'cafe-ginseng', 12000, {
        quantity: 5,
        stockQuantity: 5,
        lowStockThreshold: 2,
      }),
    )
  await db
    .doc('products/the')
    .set(product('Thé vert', 'the-vert', 5000, { quantity: 0, lowStockThreshold: 0 }))

  await db
    .doc('locations/mendong')
    .set({ ...base, name: 'Mendong – Marché', city: 'Yaoundé', isActive: true })
  await db
    .doc('locations/etoudi')
    .set({ ...base, name: 'Etoudi – Carrefour', city: 'Yaoundé', isActive: true })
  await db.doc('locations/akwa').set({ ...base, name: 'Akwa', city: 'Douala', isActive: true })
  await db
    .doc('shipments/z-yde')
    .set({
      ...base,
      method: 'DELIVERY',
      cost: 1500,
      isActive: true,
      locationIds: ['mendong', 'etoudi'],
    })
  await db
    .doc('shipments/z-dla')
    .set({ ...base, method: 'DELIVERY', cost: 2500, isActive: true, locationIds: ['akwa'] })

  const promo = (id, data) =>
    db.doc(`promotions/${id}`).set({
      ...base,
      description: null,
      startDate: new Date(Date.now() - day).toISOString(),
      endDate: new Date(Date.now() + 7 * day).toISOString(),
      status: 'ACTIVE',
      priority: 0,
      usageCount: 0,
      metadata: { createdBy: 'seed', updatedBy: 'seed' },
      ...data,
    })
  await promo('p-ship-yde', {
    code: 'LIVRAISON-YDE',
    name: 'Livraison offerte café Yaoundé',
    requiresCode: false,
    conditions: [
      { type: 'CITY', value: '["Yaoundé"]' },
      { type: 'SPECIFIC_PRODUCTS', value: '["products/cafe"]' },
    ],
    actions: [{ type: 'FREE_SHIPPING', value: '' }],
  })
  await promo('p-pub', {
    code: 'PUB-CAFE',
    name: 'Pub café -10%',
    requiresCode: true,
    conditions: [],
    actions: [{ type: 'PERCENTAGE_DISCOUNT', value: '10' }],
    usageLimit: { total: 2, perCustomer: 1 },
  })
  await promo('p-min', {
    code: 'DES30K',
    name: '-2000 dès 30 000',
    requiresCode: false,
    conditions: [{ type: 'MINIMUM_AMOUNT', value: '30000' }],
    actions: [{ type: 'FIXED_DISCOUNT', value: '2000' }],
  })

  await db
    .doc('blogs/pub')
    .set({
      ...base,
      slug: 'test-pub',
      title: 'Le café qui donne la pêche',
      status: 'PUBLISHED',
      publishedAt: now,
      content: {
        type: 'HTML',
        content: '<p>Article de test pour la page de pub.</p>',
        excerpt: 'Test',
      },
      metadata: {
        title: 'Le café qui donne la pêche',
        description: 'Test',
        keywords: [],
        author: { name: 'N.Gift' },
        featured: false,
        coverImage: { fileName: 'sample.jpg', type: 'IMAGE', url: img },
      },
      categories: ['Café'],
      tags: [],
      customFields: [],
      associateProductPath: 'products/cafe',
      layout: 'DEFAULT',
    })
  console.log('seeded emulator')
}
