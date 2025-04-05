export enum Locale {
  en = 'en',
  fr = 'fr',
}

export interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export function localIsValid(data: string): boolean {
  return localization.locales.find(locale => locale.localeCompare(data)) != undefined
}

export const localization = {
  locales: [Locale.en, Locale.fr],
  defaultLocale: Locale.fr,
  localeDetection: false,
}

export const dictionary: Record<DictWords, Record<Locale, string>> = {
  backToBlogs: {
    en: 'Back to blogs',
    fr: 'Retour aux blogs',
  },
  featuredArticle: {
    en: 'Featured Article',
    fr: 'Article En Vedette',
  },
  comments: {
    en: 'Comments',
    fr: 'Commentaires',
  },
  postComment: {
    en: 'Post Comment',
    fr: 'Publier Un Commentaire',
  },
  relatedBlogs: {
    en: 'Related Blogs',
    fr: 'Blogs Similaires',
  },
  readMore: {
    en: 'Read More',
    fr: 'Lire Plus',
  },
  clearAll: {
    en: 'Clear All',
    fr: 'Tout effacer',
  },
  search: {
    en: 'Search',
    fr: 'Recherche',
  },
  stepTitle: {
    en: 'Step',
    fr: 'Étape',
  },
  sendMessage: {
    en: 'Send Message',
    fr: 'Envoyer le message',
  },
  filters: {
    en: 'Filters',
    fr: 'Filtres',
  },
  noResultsFoundFor: {
    en: 'No results found for',
    fr: 'Aucun resultat trouve pour',
  },
  removeConfirmation: {
    en: 'Remove this item?',
    fr: 'Supprimer cet article?',
  },
  remove: {
    en: 'Remove',
    fr: 'Supprimer',
  },
  featured: {
    en: 'Feature',
    fr: 'En vedette',
  },
  each: {
    en: 'each',
    fr: 'chaque',
  },
  shoppingCart: {
    en: 'Shopping Cart',
    fr: 'Panier',
  },
  promotions: {
    en: 'Promotions',
    fr: 'Promotions',
  },
  appliedPromotions: {
    en: 'Applied Promotions',
    fr: 'Promotions Appliquées',
  },
  failedToLoadPromotions: {
    en: 'Failed to load promotions',
    fr: 'Échec du chargement des promotions',
  },
  checkout: {
    en: 'Checkout',
    fr: 'Commander',
  },
  cartEmpty: {
    en: 'Your cart is empty',
    fr: 'Votre panier est vide',
  },
  addItemsToCart: {
    en: "Looks like you haven't added any items to your cart yet",
    fr: "Il semble que vous n'ayez pas encore ajouté d'articles à votre panier",
  },
  deliveryInformation: {
    en: 'Delivery Information',
    fr: 'Informations de livraison',
  },
  reviewYourOrder: {
    en: 'Review Your Order',
    fr: 'Vérifiez votre commande',
  },
  reviewOrderDetails: {
    en: 'Please review your order details before placing the order.',
    fr: 'Veuillez vérifier les détails de votre commande avant de passer la commande.',
  },
  backToCart: {
    en: 'Back to Cart',
    fr: 'Retour au panier',
  },
  paymentInformation: {
    en: 'Payment Information',
    fr: 'Informations de paiement',
  },
  selectDateFirst: {
    en: ' Please select a date first',
    fr: "Veuillez choisir une date d'achat",
  },
  fullName: {
    en: 'Full Name',
    fr: 'Nom Complet',
  },
  phone: {
    en: 'Phone (WhatsApp/Other)',
    fr: 'Téléphone (WhatsApp/Autre)',
  },
  city: {
    en: 'City',
    fr: 'Ville',
  },
  deliveryDate: {
    en: 'Delivery Date',
    fr: 'Date de livraison',
  },
  deliveryTime: {
    en: 'Delivery Time',
    fr: 'Heure de livraison',
  },
  optional: {
    en: 'Optional',
    fr: 'Optionnel',
  },
  additionalNotes: {
    en: 'Additional Notes',
    fr: 'Notes supplémentaires',
  },
  delivery: {
    en: 'Delivery',
    fr: 'Livraison',
  },
  expedition: {
    en: 'Expedition',
    fr: 'Expedition',
  },
  shipmentMethod: {
    en: 'Sending option',
    fr: "Méthode d'envoie",
  },
  pickADate: {
    en: 'Pick a date',
    fr: 'Choisissez une date',
  },

  reviewOrder: {
    en: 'Review Order',
    fr: 'Vérifier la commande',
  },
  shipmentCost: {
    en: 'Shipment Cost',
    fr: 'Coût de livraison',
  },
  discount: {
    en: 'Discount',
    fr: 'Remise',
  },
  total: {
    en: 'Total',
    fr: 'Total',
  },
  shipping: {
    en: 'Shipping',
    fr: 'livraison',
  },
  subtotal: {
    en: 'Subtotal',
    fr: 'Sous-total',
  },
  cardNumber: {
    en: 'Card Number',
    fr: 'Numéro de carte',
  },
  shipmentInformation: {
    en: 'Your order will be delivered to',
    fr: 'Votre commande sera livraison vers',
  },
  address: {
    en: 'Address',
    fr: 'Adresse',
  },
  placeOrder: {
    en: 'Place Order',
    fr: 'Passer Commander',
  },
  ctaButton: {
    en: 'See Our Products',
    fr: 'Voir nos produits',
  },
  ctaTitle: {
    en: 'Match Made Perfect',
    fr: 'Correspondance parfaite',
  },
  ctaDescription: {
    en: 'Find your ideal products with ease. From gourmet delights to the latest tech and baby essentials, discover a world of quality choices tailored just for you!',
    fr: 'Trouvez facilement les produits qui vous conviennent. Des délices gastronomiques aux dernières technologies en passant par les articles de puériculture, découvrez un monde de choix de qualité conçus spécialement pour vous !',
  },
  store: {
    en: 'Store',
    fr: 'Boutique',
  },
  cart: {
    en: 'Cart',
    fr: 'Panier',
  },
  createAccount: {
    en: 'Create Account',
    fr: 'Créer un compte',
  },
  signIn: {
    en: 'Sign In',
    fr: 'Se connecter',
  },
  signUp: {
    en: 'Sign Up',
    fr: "S'inscrire",
  },
  myAccount: {
    en: 'My Account',
    fr: 'Mon compte',
  },
  signOut: {
    en: 'Sign Out',
    fr: 'Se déconnecter',
  },
  orders: {
    en: 'Orders',
    fr: 'Commandes',
  },
  whyChooseUs: {
    en: 'Why Choose Us',
    fr: 'Pourquoi nous choisir',
  },
  whyChooseUsDescription: {
    en: "We're committed to providing the best shopping experience",
    fr: 'Nous sommes engagés dans la fourniture de la meilleure experience de shopping',
  },
  fastDeliveryTitle: {
    en: 'Fast Delivery',
    fr: 'Livraison rapide',
  },
  fastDeliveryDescription: {
    en: 'Quick and reliable shipping worldwide',
    fr: 'Livraison rapide et fiable mondiale',
  },
  exploreCategories: {
    en: 'Explore Categories',
    fr: 'Explorer les Categories',
  },
  featuredBlogs: {
    en: 'Featured Blogs',
    fr: 'Blogs en vedette',
  },
  exploreTopRatedBlogs: {
    en: 'Explore our top-rated blogs for quality content and innovative ideas',
    fr: 'Découvrez nos blogs les mieux notés pour un contenu de qualité et des idées innovantes',
  },
  featuredProducts: {
    en: 'Featured Products',
    fr: 'Produits en vedette',
  },
  topRatedProducts: {
    en: 'Top-rated products chosen for quality and innovation',
    fr: 'Produits les mieux notés choisis pour leur qualité et leur innovation',
  },
  heroSectionTitle: {
    en: 'Everything You Need, All in One Place',
    fr: 'Tout ce dont vous avez besoin, au même endroit',
  },
  heroSectionDescription: {
    en: 'From health & wellness to the latest tech gadgets. Discover quality products that enhance your lifestyle.',
    fr: 'De la santé et du bien-être aux derniers gadgets technologiques. Découvrez des produits de qualité qui améliorent votre style de vie.',
  },
  newArrivals: {
    en: 'New Arrivals',
    fr: 'Nouveaux Arrivages',
  },
  latestAdditions: {
    en: 'The latest additions to our collection',
    fr: 'Les dernières additions à notre collection',
  },
  flashSale: {
    en: 'Flash Sale',
    fr: 'Vente Flash',
  },
  viewDetails: {
    en: 'View Details',
    fr: 'Voir les détails',
  },
  exploreMore: {
    en: 'Explore More',
    fr: 'Découvrez plus',
  },
  lowToHighPrice: {
    en: 'Price: Low to High',
    fr: 'Prix: plus bas au plus haut',
  },
  newest: {
    en: 'Newest',
    fr: 'Plus recent',
  },
  highToLowPrice: {
    en: 'Price: High to Low',
    fr: 'Prix: plus haut au plus bas',
  },
  topRates: {
    en: 'Top Rated',
    fr: 'Les mieux notés',
  },
  categories: {
    en: 'Categories',
    fr: 'Categories',
  },
  priceRange: {
    en: 'Price Range',
    fr: 'Plage de prix',
  },
  noProductsFound: {
    en: 'No products found',
    fr: 'Aucun produit trouvé',
  },
  heroTitle: {
    en: 'Discover Amazing Product',
    fr: 'Découvrez des produits fantastiques',
  },
  heroDescription: {
    en: 'Explore our collection of premium products designed to enhance your lifestyle',
    fr: 'Découvrez notre collection de produits premium concu pour améliorer votre style de vie',
  },
  specialOffer: {
    en: 'Special Offer',
    fr: 'Offre spécielle',
  },
  activePromotions: {
    en: 'Available Promotions',
    fr: 'Promotions Disponibles',
  },
  advancedFeatures: {
    en: 'A few benefit',
    fr: 'Quelques avantages',
  },
  discoverMessage: {
    en: 'Discover what makes our',
    fr: 'Découvrez ce qui rend notre',
  },
  new: {
    en: 'New',
    fr: 'Nouveau',
  },
  customerReviews: {
    en: 'Customer Reviews',
    fr: 'Avis des clients',
  },
  learnMore: {
    en: 'Learn More',
    fr: 'En savoir plus',
  },
  youMayAlsoLike: {
    en: 'You May Also Like',
    fr: 'Vous pourriez aussi aimer',
  },
  keyFeatures: {
    en: 'Key Features',
    fr: 'Caractéristiques clés',
  },
  quantity: {
    en: 'Quantity',
    fr: 'Quantité',
  },
  addToCart: {
    en: 'Add to Cart',
    fr: 'Ajouter au panier',
  },
  buyNow: {
    en: 'Buy Now',
    fr: 'Acheter maintenant',
  },
  reviews: {
    en: 'Reviews',
    fr: 'Avis',
  },
  save: {
    en: 'Save',
    fr: 'Economisé',
  },
  baseOn: {
    en: 'Based on',
    fr: 'Base sur',
  },
  stars: {
    en: 'Stars',
    fr: 'Etoiles',
  },
  loadMoreReviews: {
    en: 'Load More Reviews',
    fr: "Charger Plus d'Avis",
  },
  noRessourceFound: {
    en: 'No ressource found',
    fr: 'Aucune ressource trouvée',
  },
  lowStock: {
    en: 'Low Stock',
    fr: 'Faible Stock',
  },
  shopName: {
    en: 'Shop Name',
    fr: 'Nom de la boutique',
  },
  footerDescription: {
    en: 'Your trusted destination for quality products and exceptional service.',
    fr: 'Votre destination de confiance pour des produits de qualité et un service exceptionnel.',
  },
  quickLinks: {
    en: 'Quick Links',
    fr: 'Liens rapides',
  },
  contactUs: {
    en: 'Contact Us',
    fr: 'Contactez-nous',
  },
  trustBadges: {
    en: 'Trust Badges',
    fr: 'Badges de confiance',
  },
  copyright: {
    en: "Nature's Gift. All rights reserved.",
    fr: "Nature's Gift. Tous droits réservés.",
  },
  freeShipping: {
    en: 'Free Shipping',
    fr: 'Livraison gratuite',
  },
  securePayment: {
    en: 'Secure Payment',
    fr: 'Paiement sécurisé',
  },
  safeShopping: {
    en: 'Safe Shopping',
    fr: 'Achats sécurisés',
  },
  fastDelivery: {
    en: 'Fast Delivery',
    fr: 'Livraison rapide',
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    fr: 'Politique de confidentialité',
  },
  termsOfService: {
    en: 'Terms of Service',
    fr: "Conditions d'utilisation",
  },
  cookiePolicy: {
    en: 'Cookie Policy',
    fr: 'Politique de cookies',
  },
  continueShopping: {
    en: 'Continue Shopping',
    fr: 'Continuer vos achats',
  },
  startShopping: {
    en: 'Start Shopping',
    fr: 'Products',
  },
  proceedToCheckout: {
    en: 'Proceed to Checkout',
    fr: 'Passer à la caisse',
  },
  orderSuccessful: {
    en: 'Order Successful!',
    fr: 'Commande réussie!',
  },
  thankYouForYourPurchase: {
    en: 'Thank you for your purchase!',
    fr: 'Merci pour votre achat!',
  },
  confirmationEmailSent: {
    en: ' ',
    fr: ' ',
  },
  createAccountMessage: {
    en: 'Create an account to track your orders and get exclusive offers!',
    fr: 'Créez un compte pour suivre vos commandes et obtenir des offres exclusives!',
  },
  returnToHome: {
    en: 'Return to Home',
    fr: "Retour à l'accueil",
  },
  noOrders: {
    en: 'You have no orders',
    fr: "Vous n'avez aucune commande",
  },
  noOrdersMessage: {
    en: 'You need to place an order to see your orders.',
    fr: 'Vous devez passer une commande pour voir vos commandes.',
  },
  personalInformation: {
    en: 'Personal Information',
    fr: 'Informations personnelles',
  },
  settings: {
    en: 'Settings',
    fr: 'Paramètres',
  },
  getInTouch: {
    en: 'Get in Touch',
    fr: 'Contactez-nous',
  },
  contactDescription: {
    en: "Have questions or want to collaborate? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.",
    fr: 'Avez-vous des questions ou souhaitez-vous collaborer ? Nous serions ravis de vous entendre. Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.',
  },
  ourLocation: {
    en: 'Our Location',
    fr: 'Notre emplacement',
  },
  locationAddress: {
    en: 'Yaoundé, Carrefour Ekoudoum, lieu dis restaurant droit chemin, next to Hotel IRIS',
    fr: "Yaoundé, Carrefour Ekoudoum, lieu dis restaurant droit chemin, sis à coté de l'Hotel IRIS",
  },
  email: {
    en: 'Email',
    fr: 'Email',
  },
  order: {
    en: 'Order',
    fr: 'Commande',
  },
  notSignedIn: {
    en: 'You are not signed in',
    fr: 'Vous devez vous connecter',
  },
  notSignedInMessage: {
    en: 'You need to be signed in to view your profile.',
    fr: 'Vous devez vous connecter pour voir votre profil.',
  },
  noSettingsAvailable: {
    en: 'Settings content coming soon.',
    fr: 'Paramètres pas disponible.',
  },
  orderSummary: {
    en: 'Order Summary',
    fr: 'Sommaire de la commande',
  },
  location: {
    en: 'Location',
    fr: 'Emplacement',
  },
  searchProducts: {
    en: 'Search products...',
    fr: 'Rechercher un produit',
  },
  blogsDescription: {
    en: 'Discover the latest insights, guides, and trends in health tech and electronics.',
    fr: 'Découvrez les derniers conseils, guides et tendances en technologie de santé et d’electronique.',
  },
  blog: {
    en: 'Blog',
    fr: 'Article',
  },
  standOut: {
    en: 'stand out',
    fr: 'unique',
  },
  signInBeforeTrack: {
    en: 'You need to log in first if you want to track your order.',
    fr: 'Vous devez vous connecter au préalable si vous souhaitez suivre votre commande.',
  },
  PENDING: {
    en: 'PENDING',
    fr: 'EN ATTENTE',
  },
  ACCEPTED: {
    en: 'ACCEPTED',
    fr: 'ACCEPTÉ',
  },
  REJECTED: {
    en: 'REJECTED',
    fr: 'REJETÉ',
  },
  CANCELED: {
    en: 'CANCELED',
    fr: 'ANNULÉ',
  },
  COMPLETED: {
    en: 'COMPLETED',
    fr: 'COMPLÉTÉ',
  },
  myOrders: {
    en: 'My orders',
    fr: 'Mes commandes',
  },
  countDownMessage: {
    en: '*Limited time offer. While supplies last',
    fr: "*Offre limitée dans le temps. Jusqu'à épuisement des stocks",
  },
  additionalNotesPlaceHolder: {
    en: 'Example: Opposite hotel A, behind pharmacy b ...',
    fr: "Exemple : En face de l'hôtel A, derrière la pharmacie B ...",
  },
}

export const enum DictWords {
  additionalNotesPlaceHolder = 'additionalNotesPlaceHolder',
  countDownMessage = 'countDownMessage',
  myOrders = 'myOrders',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  signInBeforeTrack = 'signInBeforeTrack',
  standOut = 'standOut',
  blog = 'blog',
  blogsDescription = 'blogsDescription',
  searchProducts = 'searchProducts',
  location = 'location',
  orderSummary = 'orderSummary',
  noSettingsAvailable = 'noSettingsAvailable',
  notSignedInMessage = 'notSignedInMessage',
  notSignedIn = 'notSignedIn',
  order = 'order',
  getInTouch = 'getInTouch',
  contactDescription = 'contactDescription',
  ourLocation = 'ourLocation',
  locationAddress = 'locationAddress',
  email = 'email',

  noOrders = 'noOrders',
  noOrdersMessage = 'noOrdersMessage',
  personalInformation = 'personalInformation',
  settings = 'settings',

  orderSuccessful = 'orderSuccessful',
  thankYouForYourPurchase = 'thankYouForYourPurchase',
  confirmationEmailSent = 'confirmationEmailSent',
  createAccountMessage = 'createAccountMessage',
  returnToHome = 'returnToHome',

  continueShopping = 'continueShopping',
  startShopping = 'startShopping',
  proceedToCheckout = 'proceedToCheckout',
  freeShipping = 'freeShipping',
  securePayment = 'securePayment',
  safeShopping = 'safeShopping',
  fastDelivery = 'fastDelivery',
  privacyPolicy = 'privacyPolicy',
  termsOfService = 'termsOfService',
  cookiePolicy = 'cookiePolicy',
  shopName = 'shopName',
  footerDescription = 'footerDescription',
  quickLinks = 'quickLinks',
  contactUs = 'contactUs',
  trustBadges = 'trustBadges',
  copyright = 'copyright',
  lowStock = 'lowStock',
  noRessourceFound = 'noRessourceFound',
  loadMoreReviews = 'loadMoreReviews',
  stars = 'stars',
  baseOn = 'baseOn',
  reviews = 'reviews',
  save = 'save',
  new = 'new',
  activePromotionadvancedFeaturess = 'advancedFeatures',
  discoverMessage = 'discoverMessage',
  activePromotions = 'activePromotions',
  specialOffer = 'specialOffer',
  heroTitle = 'heroTitle',
  heroDescription = 'heroDescription',
  noProductsFound = 'noProductsFound',
  categories = 'categories',
  priceRange = 'priceRange',
  topRates = 'topRates',
  highToLowPrice = 'highToLowPrice',
  newest = 'newest',
  lowToHighPrice = 'lowToHighPrice',
  exploreMore = 'exploreMore',
  viewDetails = 'viewDetails',
  featuredProducts = 'featuredProducts',
  topRatedProducts = 'topRatedProducts',
  heroSectionTitle = 'heroSectionTitle',
  heroSectionDescription = 'heroSectionDescription',
  newArrivals = 'newArrivals',
  latestAdditions = 'latestAdditions',
  flashSale = 'flashSale',
  featuredBlogs = 'featuredBlogs',
  exploreTopRatedBlogs = 'exploreTopRatedBlogs',
  exploreCategories = 'exploreCategories',
  fastDeliveryDescription = 'fastDeliveryDescription',
  fastDeliveryTitle = 'fastDeliveryTitle',
  whyChooseUs = 'whyChooseUs',
  whyChooseUsDescription = 'whyChooseUsDescription',
  myAccount = 'myAccount',
  orders = 'orders',
  signUp = 'signUp',
  signIn = 'signIn',
  createAccount = 'createAccount',
  signOut = 'signOut',
  cart = 'cart',
  store = 'store',
  ctaButton = 'ctaButton',
  ctaTitle = 'ctaTitle',
  ctaDescription = 'ctaDescription',
  placeOrder = 'placeOrder',
  address = 'address',
  shipmentInformation = 'shipmentInformation',
  backToBlogs = 'backToBlogs',
  featuredArticle = 'featuredArticle',
  comments = 'comments',
  postComment = 'postComment',
  relatedBlogs = 'relatedBlogs',
  readMore = 'readMore',
  clearAll = 'clearAll',
  search = 'search',
  stepTitle = 'stepTitle',
  sendMessage = 'sendMessage',
  filters = 'filters',
  noResultsFoundFor = 'noResultsFoundFor',
  removeConfirmation = 'removeConfirmation',
  featured = 'featured',
  each = 'each',
  shoppingCart = 'shoppingCart',
  remove = 'remove',
  promotions = 'promotions',
  appliedPromotions = 'appliedPromotions',
  failedToLoadPromotions = 'failedToLoadPromotions',
  checkout = 'checkout',
  cartEmpty = 'cartEmpty',
  addItemsToCart = 'addItemsToCart',
  deliveryInformation = 'deliveryInformation',
  reviewYourOrder = 'reviewYourOrder',
  reviewOrderDetails = 'reviewOrderDetails',
  backToCart = 'backToCart',
  paymentInformation = 'paymentInformation',
  selectDateFirst = 'selectDateFirst',
  fullName = 'fullName',
  phone = 'phone',
  deliveryDate = 'deliveryDate',
  pickADate = 'pickADate',
  deliveryTime = 'deliveryTime',
  reviewOrder = 'reviewOrder',
  additionalNotes = 'additionalNotes',
  optional = 'optional',
  shipmentCost = 'shipmentCost',
  delivery = 'delivery',
  expedition = 'expedition',
  city = 'city',
  shipmentMethod = 'shipmentMethod',
  subtotal = 'subtotal',
  shipping = 'shipping',
  discount = 'discount',
  total = 'total',
  cardNumber = 'cardNumber',
  customerReviews = 'customerReviews',
  learnMore = 'learnMore',
  youMayAlsoLike = 'youMayAlsoLike',
  keyFeatures = 'keyFeatures',
  quantity = 'quantity',
  addToCart = 'addToCart',
  buyNow = 'buyNow',
}
