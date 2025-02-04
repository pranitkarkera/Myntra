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
        const newItem = {
          ...action.payload,
          quantity: 1, // Default quantity
          selectedSize: action.payload.size[0], // Default to the first size
        };
        state.items.push(newItem);
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
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === id);
      if (item) item.quantity = quantity;
    },
    updateSize: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find((item) => item.productId === id);
      if (item) item.selectedSize = size; // Update the selected size
    },
  },
});

export const { addToBag, removeFromBag, clearBag, updateQuantity, updateSize } =
  shoppingBagSlice.actions;
export default shoppingBagSlice.reducer;
