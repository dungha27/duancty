import { createAsyncThunk } from "@reduxjs/toolkit";
import http from '../../http-common';
export const getUsers = createAsyncThunk(
  "users",
  async ({ search, pageIndex, pageSize }, { rejectWithValue }) => {
    try {
      const { data } = await http.get(
        `/users?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`
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

export const postUsers = createAsyncThunk(
  "post/users",
  async ({ username, password, fullname, dob, role, department, email, gender, address, province, ward, district }, { rejectWithValue }) => {
    try {
      await http.post(`/users`);
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        rejectWithValue(error.message);
      }
    }
  }

);
