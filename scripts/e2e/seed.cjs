// Test data for the e2e checks, shaped like the database before the multi-store migration
// (no storeId, vendors told apart by creatorId / partnersPaths). Emulators only (see run.sh).
// Vendor A ('admin-uid') has the storefront test catalogue; vendor B ('vendor-b') has its own
// product, zone, promotion, order, checkout and review, which A must never see.
const UID = 'admin-uid'
const B = 'vendor-b'
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
    'stores',
    'storeSlugs',
    'storeSecrets',
    'storePayments',
    'memberships',
    'invites',
  ]) {
    const docs = await db.collection(c).listDocuments()
    await Promise.all(docs.map(d => d.delete()))
  }
  const { users } = await admin.auth().listUsers()
  await Promise.all(users.map(u => admin.auth().deleteUser(u.uid)))
  const account = async (uid, email, displayName, userType) => {
    await admin
      .auth()
      .createUser({ uid, email, password: 'Test1234!', displayName, emailVerified: true })
    await db.doc(`users/${uid}`).set({
      authId: uid,
      email,
      fullName: displayName,
      userType,
      isAnonymous: false,
      whitelists: [],
      createdAt: now,
      updatedAt: now,
    })
  }
  await account(UID, 'admin@test.cm', 'Admin Test', 'ADMIN')
  await account(B, 'vendorb@test.cm', 'Boutique Bertrand', 'PARTNER')
  await account('staff-a', 'staff@test.cm', 'Staff A', 'PARTNER')
  await account('platform-uid', 'platform@test.cm', 'Platform Owner', 'ADMIN')
  await admin.auth().setCustomUserClaims('platform-uid', { platformAdmin: true })

  await db.doc('categories/cat-cafe').set({
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
  await db.doc('products/cafe').set(
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
  await db.doc('shipments/z-yde').set({
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
  await promo('p-welcome', {
    code: 'BIENVENUE',
    name: '-1000 sur la première commande',
    requiresCode: true,
    conditions: [{ type: 'FIRST_ORDER', value: '' }],
    actions: [{ type: 'FIXED_DISCOUNT', value: '1000' }],
  })
  await promo('p-min', {
    code: 'DES30K',
    name: '-2000 dès 30 000',
    requiresCode: false,
    conditions: [{ type: 'MINIMUM_AMOUNT', value: '30000' }],
    actions: [{ type: 'FIXED_DISCOUNT', value: '2000' }],
  })

  await db.doc('blogs/pub').set({
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
    countdown: { mode: 'loop', endsAt: new Date(Date.now() - 3600_000).toISOString(), cycleHours: 24, label: 'Plus que quelques heures' },
  })
  // Vendor B
  const baseB = { creatorId: B, createdAt: now, updatedAt: now }
  await db.doc('categories/cat-b').set({
    ...baseB,
    name: 'Miel',
    slug: 'miel',
    featured: false,
    description: null,
    image: null,
    parentPath: null,
  })
  await db.doc('products/b-miel').set({
    ...product('Miel de B', 'miel-de-b', 8000, {
      quantity: 9,
      stockQuantity: 9,
      lowStockThreshold: 1,
    }),
    ...baseB,
    categories: ['Miel'],
  })
  await db
    .doc('locations/bonamoussadi')
    .set({ ...base, name: 'Bonamoussadi', city: 'Douala', isActive: true })
  // Akwa is also in A's Douala zone: the locations migration copies it for B.
  await db.doc('shipments/z-b').set({
    ...baseB,
    method: 'DELIVERY',
    cost: 3000,
    isActive: true,
    locationIds: ['bonamoussadi', 'akwa'],
  })
  // Used by no zone or promotion: goes to the default store.
  await db
    .doc('locations/unused-loc')
    .set({ ...base, name: 'Ekounou', city: 'Yaoundé', isActive: true })
  await db.doc('promotions/p-b').set({
    ...baseB,
    code: 'B-PROMO',
    name: 'Promo de B',
    description: null,
    requiresCode: true,
    startDate: new Date(Date.now() - day).toISOString(),
    endDate: new Date(Date.now() + 7 * day).toISOString(),
    status: 'ACTIVE',
    priority: 0,
    usageCount: 0,
    metadata: { createdBy: 'seed', updatedBy: 'seed' },
    conditions: [{ type: 'SPECIFIC_PRODUCTS', value: '["products/b-miel"]' }],
    actions: [{ type: 'PERCENTAGE_DISCOUNT', value: '5' }],
  })
  await db.doc('promotions/p-b-akwa').set({
    ...baseB,
    code: 'B-AKWA',
    name: 'Livraison offerte à Akwa (B)',
    description: null,
    requiresCode: false,
    startDate: new Date(Date.now() - day).toISOString(),
    endDate: new Date(Date.now() + 7 * day).toISOString(),
    status: 'ACTIVE',
    priority: 0,
    usageCount: 0,
    metadata: { createdBy: 'seed', updatedBy: 'seed' },
    conditions: [{ type: 'LOCATION', value: '["akwa"]' }],
    actions: [{ type: 'FREE_SHIPPING', value: '' }],
  })
  const line = (path, title, price, creatorId) => ({
    product: { path, title, medias: [], price: { regular: price }, creatorId },
    quantity: 1,
    price,
    createdAt: now,
    updatedAt: now,
  })
  const order = (id, partners, items, name, phone) =>
    db.doc(`orders/${id}`).set({
      createdAt: now,
      updatedAt: now,
      status: 'COMPLETED',
      userPath: null,
      partnersPaths: partners.map(p => `users/${p}`),
      deliveryInfo: {
        address: 'Bonamoussadi',
        location: 'Bonamoussadi',
        locationId: 'bonamoussadi',
        city: 'Douala',
      },
      userData: { id: '', email: '', fullName: name, phone },
      items,
      promotions: [],
      orderPrices: { subtotal: 8000, shipping: 3000, discount: 0, total: 11000 },
      trackingToken: 'b'.repeat(32),
      stockReserved: false,
    })
  await order(
    'order-b',
    [B],
    [line('products/b-miel', 'Miel de B', 8000, B)],
    'Bertrand Bee',
    '690000009',
  )
  await order(
    'order-ab',
    [UID, B],
    [line('products/the', 'Thé vert', 5000, UID), line('products/b-miel', 'Miel de B', 8000, B)],
    'Mixte Client',
    '690000010',
  )
  await db.doc('checkouts/chk-b').set({
    createdAt: now,
    updatedAt: now,
    fullName: 'Bella Panier',
    phone: '690000011',
    items: [{ productPath: 'products/b-miel', title: 'Miel de B', quantity: 1, price: 8000 }],
    total: 8000,
    location: null,
    source: null,
    partnersPaths: [`users/${B}`],
    orderPath: null,
    contactedAt: null,
  })
  await db.doc('reviews/order-b_b-miel').set({
    createdAt: now,
    updatedAt: now,
    productPath: 'products/b-miel',
    blogPath: null,
    userName: 'Bertrand B.',
    rating: 5,
    comment: 'Miel B excellent',
    imageUrl: null,
    helpful: 0,
    notHelpful: 0,
    verify: true,
    status: 'PENDING',
    orderPath: 'orders/order-b',
    creatorId: B,
  })
  console.log('seeded emulator')
}
