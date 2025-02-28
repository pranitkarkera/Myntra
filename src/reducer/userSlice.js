import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to register user
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (newUser) => {
    const response = await axios.post(
      "https://myntra-clone-backend-nine.vercel.app/api/user/register",
      newUser
    );
    return response.data;
  }
);

// Async thunk to login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://myntra-clone-backend-nine.vercel.app/api/user/login",
        credentials
      );
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async thunk to fetch user by ID
export const fetchUserByEmail = createAsyncThunk(
  "user/fetchUserByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://myntra-clone-backend-nine.vercel.app/api/user/${email}`
      );
      return response.data;
    } catch (error) {
      console.error("Fetch user error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

// Async thunk to update user
export const updateUser  = createAsyncThunk(
  'user/updateUser ',
  async (updatedUser , { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://myntra-clone-backend-nine.vercel.app/api/user/${updatedUser.email}`,
        updatedUser 
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// Async thunk to delete user
export const deleteUser  = createAsyncThunk(
  "user/deleteUser ",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://myntra-clone-backend-nine.vercel.app/api/user/${email}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

// Create a slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
