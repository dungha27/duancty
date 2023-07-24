import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";
export const getUsers = createAsyncThunk(
  "users",
  async ({ query, pageIndex, pageSize }, { rejectWithValue }) => {
    try {
      const { data } = await http.get(
        `/users?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        { params: query }
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

// export const postUsers = createAsyncThunk(
//   "post/users",
//   async (data, { rejectWithValue }) => {
//     try {
//       const { response } = await http.post(`/users`, data);
//       console.log(response);
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       } else {
//         rejectWithValue(error.message);
//       }
//     }
//   }
// );
