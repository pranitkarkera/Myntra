import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    try {
      const response = await axios.get(
        "https://myntra-clone-backend-nine.vercel.app/api/products"
      );
      // console.log(response.data.data.products)
      return response.data.data.products; // Return the products array
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to fetch data"
      );
    }
  }
);

// Create a slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    productsList: [], // Ensure this is an array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.loading = false;
        state.productsList = action.payload; // This should now be the products array
        // console.log(state.productsList)
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer as default
export default productSlice.reducer;
