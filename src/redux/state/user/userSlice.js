import { createSlice } from "@reduxjs/toolkit"
import { getUsers } from "../../actions/users"

const initialState = {
    loading: false,
    success: false,
    error: null,
    users: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
    }
})

export default userSlice.reducer;