import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      localStorage.setItem("token", null);
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
