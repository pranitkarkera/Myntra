import { createSlice } from "@reduxjs/toolkit";

const shoppingBagSlice = createSlice({
  name: "shoppingBag",
  initialState: {
    items: [],
  },
  reducers: {
    clearBag: (state) => {
      state.items = [];
    },
    addToBag: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (!existingItem) {
        const newItem = {
          ...action.payload,
          quantity: action.payload.quantity || 1,
          selectedSize: action.payload.selectedSize || "S",
        };
        state.items.push(newItem);
      }
    },
    removeFromBag: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
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

export const { addToBag, removeFromBag, updateQuantity, updateSize, clearBag } =
  shoppingBagSlice.actions;
export default shoppingBagSlice.reducer;
