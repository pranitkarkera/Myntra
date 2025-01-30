import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    ratingStars: "",
  },
  reducers: {
    setRatingStars: (state, action) => {
      state.ratingStars = action.payload;
    },
  },
});

export const { setRatingStars } = ratingSlice.actions;
export default ratingSlice.reducer;