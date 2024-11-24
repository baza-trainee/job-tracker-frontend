import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { AuthStateProps, AuthTokensProps, UserProps } from "./authTypes";

import { fetchUser, signUp, logIn } from "./authOperation";

import { AXIOS } from "../../../api/axios-constants";

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
      localStorage.setItem(AXIOS.AUTH_TOKENS, JSON.stringify(action.payload));
    },
    clearTokens: (state) => {
      state.tokens = null;
      state.user = null;
      localStorage.removeItem(AXIOS.AUTH_TOKENS);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoggedIn = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserProps | null>) => {
          state.isLoggedIn = true;
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      })
      .addMatcher(isAnyOf(signUp.pending, logIn.pending), (state) => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(signUp.fulfilled, logIn.fulfilled),
        (state, action: PayloadAction<UserProps | null>) => {
          state.isLoggedIn = true;
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addMatcher(isAnyOf(signUp.rejected, logIn.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed";
      });
  },
});

export const { saveTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
