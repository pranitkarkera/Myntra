import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSize: null,
};

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    setSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    clearSize: (state) => {
      state.selectedSize = null;
    },
  },
});

export const { setSize, clearSize } = sizeSlice.actions;
export default sizeSlice.reducer;
