const timestamp = Date.now().toString(36);
interface Promotion {
  id: number;
  productName: string;
  expensePrix: number;
  currentPrix: number;
  reduction: number;
}

const promotions: Promotion = [
  {
    id: Math.random().toString(36).substring(2, 8),
    productName: "Cordyceps",
    expensePrix: 100,
    currentPrix: 50,
    reduction: 50,
  },
];
