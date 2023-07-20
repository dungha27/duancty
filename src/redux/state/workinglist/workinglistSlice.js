import { createSlice } from "@reduxjs/toolkit";
import { getWorkingList } from "../../actions/workingList";

const initialState = {
  workingList: [],
  loading: false,
  error: null,
  success: false,
};

const workingListSlice = createSlice({
  name: "workingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkingList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkingList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.workingList = action.payload;
      })
      .addCase(getWorkingList.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default workingListSlice.reducer;
