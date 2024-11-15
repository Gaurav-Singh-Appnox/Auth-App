import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicer/UserSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
