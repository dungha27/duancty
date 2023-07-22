import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const getWorkingList = createAsyncThunk(
  "working-list",
  async ({ pageSize, pageIndex }, { rejectWithValue }) => {
    try {
      const { data } = await http.get(
        `/working-list?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        rejectWithValue(error.message);
      }
    }
  }
);
