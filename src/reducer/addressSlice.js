import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://myntra-clone-backend-nine.vercel.app/api/address";

// Async thunk to fetch addresses by user ID
export const fetchAddressesByUser = createAsyncThunk(
  "address/fetchAddressesByUser ",
  async (number) => {
    try {
      const response = await axios.get(`${API_URL}/${number}`);
      console.log(response.data)
      return response.data; 
    } catch (error) {
      console.error("Error adding address:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to add address");
    }
  }
);

// Async thunk to add a new address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (address) => {
    try {
      const response = await axios.post(`${API_URL}/add`, address);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to add address"
      );
    }
  }
);

// Async thunk to update an address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ number, updatedAddress }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${number}`,
        updatedAddress
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to update address"
      );
    }
  }
);

// Async thunk to delete an address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (number) => {
    try {
      await axios.delete(`${API_URL}/${number}`);
      return addressId;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to delete address"
      );
    }
  }
);

const initialState = {
  addresses: [],
  status: "idle", 
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressesByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddressesByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload; 
      })
      .addCase(fetchAddressesByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload); 
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const { id, updatedAddress } = action.payload;
        const index = state.addresses.findIndex((address) => address.id === id);
        if (index !== -1) {
          state.addresses[index] = {
            ...state.addresses[index],
            ...updatedAddress,
          };
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const id = action.payload;
        state.addresses = state.addresses.filter(
          (address) => address.id !== id
        );
      });
  },
});

export default addressSlice.reducer;
