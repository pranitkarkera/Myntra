import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to add item to bag
export const addItemToBag = createAsyncThunk(
  "shoppingBag/addItem",
  async (itemData, { rejectWithValue }) => {
    const { userId, productId, ...rest } = itemData;

    if (!userId) {
      console.error("User ID is undefined");
      return rejectWithValue("User ID is required to add an item to the bag.");
    }

    try {
      const response = await axios.post(
        `https://myntra-clone-backend-nine.vercel.app/api/cart/${userId}/items`,
        { productId, ...rest },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Add to bag error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to add item");
    }
  }
);

// Async thunk to remove item from bag
export const removeItemFromBag = createAsyncThunk(
  "shoppingBag/removeItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://myntra-clone-backend-nine.vercel.app/api/cart/${data.userId}/items/${data.productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Remove from bag error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

// Async thunk to update item quantity in bag
export const updateItemQuantityInBag = createAsyncThunk(
  "shoppingBag/updateQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://myntra-clone-backend-nine.vercel.app/api/cart/${userId}/items/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Update quantity error:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to update quantity"
      );
    }
  }
);

// Async thunk to fetch cart
export const fetchCart = createAsyncThunk(
  "shoppingBag/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://myntra-clone-backend-nine.vercel.app/api/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart items"
      );
    }
  }
);


const shoppingBagSlice = createSlice({
  name: "shoppingBag",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBag: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToBag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToBag.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(addItemToBag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeItemFromBag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromBag.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(removeItemFromBag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateItemQuantityInBag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantityInBag.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(updateItemQuantityInBag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items; // Update items here
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { clearBag } = shoppingBagSlice.actions;

export default shoppingBagSlice.reducer;
