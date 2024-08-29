import { configureStore } from "@reduxjs/toolkit";
import studentsSlice from "./studentsSlice.js";

export const store = configureStore({
  reducer: { students: studentsSlice },
});
