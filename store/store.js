import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicer/UserSlice.jsx";
import cartReducer from "./slicer/Cart.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartReducer
  },
});

export default store;
