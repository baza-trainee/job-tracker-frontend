import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthStateProps, AuthTokensProps } from "./authTypes";

const initialState: AuthStateProps = {
  user: null,
  tokens: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveTokens: (state, action: PayloadAction<AuthTokensProps>) => {
      state.tokens = action.payload;
    },
    isLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    clearTokens: (state) => {
      state.tokens = null;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { saveTokens, clearTokens, isLoggedIn } = authSlice.actions;

export default authSlice.reducer;
