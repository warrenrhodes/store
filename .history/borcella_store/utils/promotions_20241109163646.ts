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
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt: Date;
}

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
    productId: 101,
    userName: "Alice",
    rating: 4.5,
    comment: "Great coffee! Smooth taste and rich aroma.",
    imageUrl:
      "https://media.istockphoto.com/id/1389348844/fr/photo/plan-de-studio-dune-belle-jeune-femme-souriante-debout-sur-un-fond-gris.jpg?s=612x612&w=0&k=20&c=VGipX3a8xrbYuXTNm_61pFuzpGdAO9lwt2xnVUd7Khs=",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: Math.random().toString(1006).substring(2, 8),
    productId: 101,
    userName: "Bob",
    rating: 3.0,
    comment: "It's decent but not worth the price.",
    imageUrl:
      "https://st2.depositphotos.com/1662991/8837/i/450/depositphotos_88370500-stock-photo-mechanic-wearing-overalls.jpg",
    createdAt: new Date("2024-01-11"),
  },
  {
    id: Math.random().toString(1236).substring(2, 8),
    productId: 102,
    userName: "Charlie",
    rating: 5.0,
    comment: "Absolutely love this coffee! Will buy again.",
    imageUrl:
      "https://img.freepik.com/psd-gratuit/personne-celebrant-son-orientation-sexuelle_23-2150115662.jpg",
    createdAt: new Date("2024-01-12"),
  },
];
