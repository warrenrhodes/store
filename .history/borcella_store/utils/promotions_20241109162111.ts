const timestamp = Date.now().toString(36);
interface Promotion {
  id: number;
  productName: string;
  expensePrix: number;
  currentPrix: number;
  reduction: number;
}

export const promotions: Promotion = [
  {
    id: Math.random().toString(36).substring(2, 8),
    productName: "Cordyceps",
    expensePrix: 20000,
    currentPrix: 15000,
    reduction: 20,
  },
  {
    id: Math.random().toString(36).substring(2, 8),
    productName: "Cordyceps",
    expensePrix: 20000,
    currentPrix: 15000,
    reduction: 20,
  },
];
