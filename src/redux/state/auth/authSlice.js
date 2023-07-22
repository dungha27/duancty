import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../actions/auth";

const accessToken = localStorage.getItem("accessToken") || null;
const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  loading: false,
  userInfo,
  accessToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false), (state.success = true);
        state.userInfo = action.payload?.user || null;
        state.accessToken = action.payload?.accessToken || '';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
