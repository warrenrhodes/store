const timestamp = Date.now().toString(36);

interface Promotion {
  id: string;
  productId: string;
  promotionName: string;
  expensePrix: number;
  currentPrix: number;
  reductionInPercent: number;
}

interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt: Date;
}

interface Benefice {
  id: string;
  productId: string;
  title: string;
  description: string;
}

export const benefices: Benefice[] = [
  {
    id: Math.random().toString(106).substring(2, 8),
    productId: "672b4f67297584e8eb4389ca",
    title: "Amélioration de l'énergie",
    description:
      "Le café Cordyceps aide à augmenter les niveaux d'énergie et à réduire la fatigue, ce qui le rend idéal pour un coup de fouet matinal.",
  },
  {
    id: Math.random().toString(106).substring(2, 8),
    productId: "672b4f67297584e8eb4389ca",
    title: "Renforcement du système immunitaire",
    description:
      "Riche en antioxydants, le café Cordyceps contribue à renforcer votre système immunitaire et à protéger votre corps contre les maladies.",
  },
  {
    id: Math.random().toString(106).substring(2, 8),
    productId: "672b4f67297584e8eb4389ca",
    title: "Amélioration de la performance physique",
    description:
      "Le café Cordyceps est connu pour améliorer la performance physique, ce qui en fait un excellent choix pour les athlètes et les amateurs de fitness.",
  },
  {
    id: Math.random().toString(106).substring(2, 8),
    productId: "672b4f67297584e8eb4389ca",
    title: "Soutien à la santé mentale",
    description:
      "Les composés présents dans le café Cordyceps peuvent aider à améliorer la concentration et à réduire le stress, favorisant ainsi une meilleure santé mentale.",
  },
];

export const promotions: Promotion[] = [
  {
    id: Math.random().toString(106).substring(2, 8),
    productId: "672b4f67297584e8eb4389ca",
    promotionName: "1 Cordyceps",
    expensePrix: 20000,
    currentPrix: 15000,
    reductionInPercent: 20,
  },
  {
    id: Math.random().toString(36).substring(2, 8),
    productId: "672b4f67297584e8eb4389ca",
    promotionName: "2 Cordyceps",
    expensePrix: 40000,
    currentPrix: 28000,
    reductionInPercent: 35,
  },
];

export const reviews: Review[] = [
  {
    id: Math.random().toString(15226).substring(2, 8),
    productId: "672b4f67297584e8eb4389ca",
    userName: "Alice",
    rating: 4.5,
    comment: "Great coffee! Smooth taste and rich aroma.",
    imageUrl:
      "https://st2.depositphotos.com/1518767/9054/i/450/depositphotos_90541628-stock-photo-smiling-crestive-business-woman.jpg",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: Math.random().toString(1006).substring(2, 8),
    productId: "672b4f67297584e8eb4389ca",
    userName: "Bob",
    rating: 3.0,
    comment: "It's decent but not worth the price.",
    imageUrl:
      "https://st2.depositphotos.com/1662991/8837/i/450/depositphotos_88370500-stock-photo-mechanic-wearing-overalls.jpg",
    createdAt: new Date("2024-01-11"),
  },
  {
    id: Math.random().toString(1236).substring(2, 8),
    productId: "672b4f67297584e8eb4389ca",
    userName: "Charlie",
    rating: 5.0,
    comment: "Absolutely love this coffee! Will buy again.",
    imageUrl:
      "https://img.freepik.com/psd-gratuit/personne-celebrant-son-orientation-sexuelle_23-2150115662.jpg",
    createdAt: new Date("2024-01-12"),
  },
];
