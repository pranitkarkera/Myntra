import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch order history
export const fetchOrderHistory = createAsyncThunk(
  "order/fetchOrderHistory",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!userId) {
        return rejectWithValue("User ID is required");
      }

      const response = await axios.get(
        `https://myntra-clone-backend-nine.vercel.app/api/orders/${userId}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching order history:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Failed to fetch order history"
      );
    }
  }
);

// Async thunk to fetch order details by order ID
export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async ({ userId, orderId }, { rejectWithValue }) => {
    console.log(
      "Fetching order details for userId:",
      userId,
      "orderId:",
      orderId
    );
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        return rejectWithValue("JWT token is required");
      }

      const response = await axios.get(
        `https://myntra-clone-backend-nine.vercel.app/api/orders/${userId}/details/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("API call failed:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch order details"
      );
    }
  }
);


// Async thunk to place a new order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ userId, products, totalAmount }, { rejectWithValue }) => {
    try {
      if (!userId || !products || !totalAmount) {
        return rejectWithValue("Missing required fields");
      }

      const response = await axios.post(
        `https://myntra-clone-backend-nine.vercel.app/api/orders/${userId}/place-order`,
        { products, totalAmount }
      );

      return response.data;
    } catch (error) {
      console.error("Error placing order:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to place order");
    }
  }
);

const initialState = {
  orders: [],
  orderDetails: {},
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order history";
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order details";
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Handle order placement success if needed
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to place order";
      });
  },
});

export default orderSlice.reducer;
