import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import workinglistSlice from "../workinglist/workinglistSlice";
import userSlice from "../user/userSlice";
import workingDaySlice from "../workingdays/workingDaySlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        workingList: workinglistSlice,
        users: userSlice,
        workingDay: workingDaySlice,
    }
})

export default store