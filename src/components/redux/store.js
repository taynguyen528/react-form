import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./features/studentSlice";

export const store = configureStore({
    reducer: {
        student: studentSlice,
    },
});
