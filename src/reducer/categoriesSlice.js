import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch categories
export const fetchAllCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try{
      const response = await axios.get(
        "https://myntra-clone-backend-nine.vercel.app/api/categories"
      );
      // console.log(response.data.data.categories)
      return response.data.data.categories; 
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to fetch data"
      );
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.loading = false;
        state.categories = action.payload;
        // console.log(state.categories)
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
