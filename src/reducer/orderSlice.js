import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch order history by user email
export const fetchOrderHistory = createAsyncThunk(
  "order/fetchOrderHistory",
  async (userId) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
      const response = await axios.get(
        `https://your-backend-url/api/orders/${userId}/history`, // Correct URL
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );
      return response.data; // Return order history
    } catch (error) {
      console.error(
        "Error fetching order history:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

// Async thunk to fetch order details by order ID
export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async (orderId) => {
    try {
      const response = await axios.get(
        `https://myntra-clone-backend-nine.vercel.app/api/orders/${orderId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to fetch order details"
      );
    }
  }
);

// Async thunk to place a new order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ userId, products, totalAmount }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
      const response = await axios.post(
        `https://myntra-clone-backend-nine.vercel.app/api/orders/${userId}/place-order`,
        { products, totalAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Handle order placement success
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
