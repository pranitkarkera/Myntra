// src/reducer/shoppingBagSlice.js
import { createSlice } from "@reduxjs/toolkit";

const shoppingBagSlice = createSlice({
  name: "shoppingBag",
  initialState: {
    items: [],
  },
  reducers: {
    addToBag: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromBag: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    clearBag: (state) => {
      state.items = [];
    },
  },
});

export const { addToBag, removeFromBag, clearBag } = shoppingBagSlice.actions;
export default shoppingBagSlice.reducer;
