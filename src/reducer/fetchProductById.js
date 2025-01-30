import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchProductById = createAsyncThunk(
//   "shoppingProducts/fetchProductById",
//   async (productId) => {
//     const response = await axios.get(`/api/products/${productId}`); // Adjust the API endpoint
//     console.log(response)
//     return response.data;
//   }
// );

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    try {
      const response = await axios.get(
        `https://myntra-clone-backend-nine.vercel.app/api/products/${productId}`
      );
      console.log(response.data.data.product)
      return response.data.data.product; // Return the products array
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to fetch data"
      );
    }
  }
);

const fetchProductByIdSlice = createSlice({
  name: "shoppingProducts",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchProductByIdSlice.reducer;
