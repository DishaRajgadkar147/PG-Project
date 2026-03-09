import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(
        (i) => i.id === item.id
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },


    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.id !== action.payload
      );
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  clearCart,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
