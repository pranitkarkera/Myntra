import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://myntra-clone-backend-nine.vercel.app/api/address";

// Async thunk to fetch all addresses for a user
export const fetchAddressesByUser = createAsyncThunk(
  "address/fetchAddressesByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
      const response = await axios.get(`${API_URL}/${userId}/alladdress`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });
      return response.data; // Returns the array of addresses
    } catch (error) {
      console.error("Error fetching addresses:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to fetch addresses"
      );
    }
  }
);

// Async thunk to add a new address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ userId, address }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
      const response = await axios.post(`${API_URL}/${userId}/add`, address, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });
      return response.data; // Returns the updated user document or added address
    } catch (error) {
      console.error("Error adding address:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to add address");
    }
  }
);

// Async thunk to update an address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ userId, addressId, updatedAddress }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
      const response = await axios.put(
        `${API_URL}/${userId}/addresses/${addressId}`,
        updatedAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );
      return { id: addressId, updatedAddress: response.data }; // Return both ID and updated data
    } catch (error) {
      console.error("Error updating address:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to update address"
      );
    }
  }
);

// Async thunk to delete an address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    if (!userId || !addressId) {
      return rejectWithValue("User ID or Address ID is missing");
    }
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
      await axios.delete(`${API_URL}/${userId}/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });
      return addressId; // Return the deleted address ID
    } catch (error) {
      console.error("Error deleting address:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to delete address"
      );
    }
  }
);

const initialState = {
  addresses: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddressesByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddressesByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload; // Populate addresses from API response
      })
      .addCase(fetchAddressesByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Address
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload); // Add new address to the list
      })

      // Update Address
      .addCase(updateAddress.fulfilled, (state, action) => {
        const { id, updatedAddress } = action.payload;
        const index = state.addresses.findIndex(
          (address) => address._id === id
        );
        if (index !== -1) {
          state.addresses[index] = updatedAddress;
        }
      })

      // Delete Address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const id = action.payload;
        state.addresses = state.addresses.filter(
          (address) => address._id !== id
        );
      });
  },
});

export default addressSlice.reducer;
