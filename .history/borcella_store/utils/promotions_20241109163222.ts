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
  imageUrl: string;
  createdAt: Date;
}

export const promotions: Promotion[] = [
  {
    id: Math.random().toString(36).substring(2, 8),
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
    id: 1,
    productId: 101,
    userName: "Alice",
    rating: 4.5,
    comment: "Great coffee! Smooth taste and rich aroma.",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: 2,
    productId: 101,
    userName: "Bob",
    rating: 3.0,
    comment: "It's decent but not worth the price.",
    createdAt: new Date("2024-01-11"),
  },
  {
    id: 3,
    productId: 102,
    userName: "Charlie",
    rating: 5.0,
    comment: "Absolutely love this coffee! Will buy again.",
    createdAt: new Date("2024-01-12"),
  },
];
