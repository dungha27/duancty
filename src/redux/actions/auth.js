import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await http.post(
        "/auth/login",
        { username, password },
        config
      );
      localStorage.setItem("accessToken", data?.accessToken);
      localStorage.setItem("user", JSON.stringify(data?.user));
      return data;
    } catch (error) {
      if (error?.response && error.response?.data) {
        return rejectWithValue(error.response?.data);
      } else {
        rejectWithValue(error.message);
      }
    }
  }
);
