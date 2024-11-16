const timestamp = Date.now().toString(36);
interface Promotion {
  id: StringExpressionOperatorReturningObject;
  promotionName: string;
  productName: string;
  expensePrix: number;
  currentPrix: number;
  reductionInPercent: number;
}

interface Review {
        id: numsber; 
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
    productName: "Cordyceps",
    promotionName: "1 Cordyceps",
    expensePrix: 20000,
    currentPrix: 15000,
    reductionInPercent: 20,
  },
  {
    id: Math.random().toString(36).substring(2, 8),
    productName: "Cordyceps",
    promotionName: "2 Cordyceps",
    expensePrix: 40000,
    currentPrix: 28000,
    reductionInPercent: 35,
  },
];

export 
