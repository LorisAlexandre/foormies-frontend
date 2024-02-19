import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  email: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action: { payload: typeof state }) => {
      state = { ...action.payload };
      return state;
    },
    logout: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
