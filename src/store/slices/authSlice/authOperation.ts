import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axios";
import { saveTokens, clearTokens } from "./authSlice";
import { AuthStateProps } from "./authTypes";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { getState, dispatch }) => {
    const state = getState() as { auth: AuthStateProps };
    const tokens = state.auth.tokens;

    if (!tokens) return null;

    try {
      const response = await axios.get("/user/profile", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const newAccessToken = await dispatch(refreshTokens()).unwrap();
          const retryResponse = await axios.get("/user/profile", {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
          return retryResponse.data;
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          dispatch(clearTokens());
          throw refreshError;
        }
      } else {
        console.error("Failed to fetch user:", error);
        throw error;
      }
    }
  }
);

export const refreshTokens = createAsyncThunk(
  "auth/refreshTokens",
  async (_, { getState, dispatch }) => {
    const state = getState() as { auth: AuthStateProps };
    const tokens = state.auth.tokens;

    if (!tokens) throw new Error("No refresh token available");

    try {
      const response = await axios.post("/auth/refresh", {
        refresh_token: tokens.refresh_token,
      });
      dispatch(saveTokens(response.data));
      return response.data.access_token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      dispatch(clearTokens());
      throw error;
    }
  }
);
