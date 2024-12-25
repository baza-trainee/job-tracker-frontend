import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { AuthStateProps, AuthTokensProps, UserProps } from "./authTypes";

import {
  // refreshUser,
  signUp,
  logIn,
  forgotPassword,
  resetPassword,
  logOut,
} from "./authOperation";

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
  extraReducers: (builder) => {
    builder
      // .addCase(refreshUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(
      //   refreshUser.fulfilled,
      //   (state, action: PayloadAction<UserProps | null>) => {
      //     state.loading = false;
      //     state.user = action.payload;
      //   }
      // )
      // .addCase(refreshUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.user = null;
      //   state.error = action.error.message || "Failed to fetch user";
      // })
      .addMatcher(
        isAnyOf(
          signUp.pending,
          logIn.pending,
          forgotPassword.pending,
          resetPassword.pending,
          logOut.pending
        ),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(signUp.fulfilled, logIn.fulfilled),
        (state, action: PayloadAction<UserProps | null>) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.user = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          signUp.rejected,
          logIn.rejected,
          forgotPassword.rejected,
          resetPassword.rejected,
          logOut.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed";
        }
      );
  },
});

export const { saveTokens, clearTokens, isLoggedIn } = authSlice.actions;

export default authSlice.reducer;
