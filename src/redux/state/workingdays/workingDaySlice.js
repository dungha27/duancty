import { createSlice } from "@reduxjs/toolkit";
import { getWorkingDays } from "../../actions/workingDay";

const initialState = {
  workingday: [],
  loading: false,
  success: false,
  error: null,
};

const workingDaySlice = createSlice({
  name: "workingdays",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkingDays.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkingDays.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.workingday = action.payload;
      })
      .addCase(getWorkingDays.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default workingDaySlice.reducer;
