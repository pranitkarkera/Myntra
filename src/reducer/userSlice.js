import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to register user
export const registerUser = createAsyncThunk(
  "user/signup",
  async (newUser) => {
    try {
      const response = await axios.post(
        "https://myntra-clone-backend-nine.vercel.app/api/user/signup",
        newUser
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to fetch data"
      );
    }
  }
);

// Async thunk to login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://myntra-clone-backend-nine.vercel.app/api/user/login",
        credentials
      );
      console.log("Login response:", response.data);
      localStorage.setItem("jwtToken", response.data.jwtToken);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async thunk to fetch user by ID
export const fetchUserById = createAsyncThunk(
  "user/getUser ",
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("jwtToken");
    console.log("Fetching user with token:", token);
    
    if (!token) {
      return rejectWithValue("JWT token is required");
    }

    try {
      const response = await axios.get(
        `https://myntra-clone-backend-nine.vercel.app/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Fetch user error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

// Async thunk to update user
export const updateUser = createAsyncThunk(
  "user/updateUser ",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://myntra-clone-backend-nine.vercel.app/api/user/${updatedUser.userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
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
export const deleteUser = createAsyncThunk(
  "user/deleteUser ",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://myntra-clone-backend-nine.vercel.app/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
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
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
