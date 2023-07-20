import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const getWorkingDays = createAsyncThunk(
  "working-days",
  async ({}, { rejectWithValue }) => {
    try {
      const { data } = await http.get("/working-days");
      return data;
    } catch (error) {
      if (error.response?.data) {
        rejectWithValue(error.response.data);
      } else {
        rejectWithValue(error);
      }
    }
  }
);
