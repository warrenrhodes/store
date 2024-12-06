export const priceFormatted = (price: number) => {
  return price.toLocaleString("en-US", { style: "currency", currency: "XAF" });
};
