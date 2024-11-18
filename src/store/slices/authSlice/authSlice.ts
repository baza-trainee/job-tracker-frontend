import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthStateProps, AuthTokensProps, UserProps } from "./authTypes";

import { fetchUser } from "./authOperation";

const initialState: AuthStateProps = {
  user: null,
  tokens: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveTokens: (state, action: PayloadAction<AuthTokensProps>) => {
      state.tokens = action.payload;
      localStorage.setItem("auth_tokens", JSON.stringify(action.payload));
    },
    clearTokens: (state) => {
      state.tokens = null;
      state.user = null;
      localStorage.removeItem("auth_tokens");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserProps | null>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { saveTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
