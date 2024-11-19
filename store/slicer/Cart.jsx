import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// saving in localstorage
const saveCartToStorage = async (cart) => {
  try {
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to storage", error);
  }
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const { id, name, price, quantity = 1 } = action.payload;
      //check if item already  exist
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += price * quantity;
      } else {
        state.items.push({
          id,
          name,
          price,
          quantity,
          totalPrice: price * quantity,
        });
      }
      state.totalQuantity += quantity;
      state.totalAmount += price * quantity;
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;

      // Find item in the cart
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Update global totals
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;

        // Remove item from cart
        state.items = state.items.filter((item) => item.id !== id);

        // Persist updated cart state to storage
        saveCartToStorage(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cart.actions;

export default cart.reducer;
