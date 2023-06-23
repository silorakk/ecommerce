export const getTotalProductPrice = (price: number, quantity: number) => {
  return `£${(price * quantity).toFixed(2)}`;
};
