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
      return response.data.data.products;
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
    productsList: [],
    loading: false,
    error: null,
    sortOrder: "lowToHigh",
    priceRange: { min: 100, max: 10000 },
  },
  reducers: {
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.loading = false;
        state.productsList = action.payload;
        // console.log(state.productsList)
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortOrder, setPriceRange } = productSlice.actions;

export const selectAllProducts = (state) => state.shoppingProducts.productsList;
export const selectSortOrder = (state) => state.shoppingProducts.sortOrder;
export const selectPriceRange = (state) => state.shoppingProducts.priceRange;

export default productSlice.reducer;
