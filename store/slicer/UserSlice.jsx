
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';


const getInitialState = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
    };
  } catch (error) {
    console.error('Error loading initial state:', error);
    return {
      user: null,
      token: null,
    };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Store in AsyncStorage
      AsyncStorage.setItem('token', action.payload.token);
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      // Remove from AsyncStorage
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },
    editUser: (state, action) => {
      state.user = { ...state.user, ...action.payload.data.user };
      // Update AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { setUser, logOut, editUser } = authSlice.actions;
export default authSlice.reducer;