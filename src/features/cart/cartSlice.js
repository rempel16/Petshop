import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...item, quantity: 1 });
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity++;
    },
    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    clearCart(state) {
      state.items = [];
    },

    setOrderSuccess(state) {
      state.status = "success";
    },
    setOrderError(state) {
      state.status = "error";
    },
    resetCartStatus(state) {
      state.status = "idle";
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  setOrderSuccess,
  setOrderError,
  resetCartStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
