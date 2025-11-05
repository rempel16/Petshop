export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (sum, item) => sum + (item.discont_price ?? item.price) * item.quantity,
    0
  );
