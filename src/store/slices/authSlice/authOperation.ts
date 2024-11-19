import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { saveTokens, clearTokens } from "./authSlice";
import { AuthStateProps } from "./authTypes";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { getState, dispatch }) => {
    const state = getState() as { auth: AuthStateProps };
    const tokens = state.auth.tokens;

    if (!tokens) return null;

    try {
      const response = await axiosInstance.get("/user/profile", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const newAccessToken = await dispatch(refreshTokens()).unwrap();
          const retryResponse = await axiosInstance.get("/user/profile", {
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
      const response = await axiosInstance.post("/auth/refresh", {
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

export const signUp = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        email,
        password,
      });
      dispatch(saveTokens(response.data));
      await dispatch(fetchUser()).unwrap();
      alert("Успіх");
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("Обліковий запис з такою поштою існує");
      }
      console.error("Registration failed", error);
      throw new Error("Registration failed");
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      dispatch(saveTokens(response.data));
      await dispatch(fetchUser()).unwrap();
      alert("З поверненням");
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("Обліковий запис з такою поштою існує");
      }
      console.error("Registration failed", error);
      throw new Error("Registration failed");
    }
  }
);

export const GoogleLogin = () => {
  window.location.href =
    "https://job-tracker-backend-x.vercel.app/api/auth/google";
};

export const GithubLogin = () => {
  window.location.href =
    "https://job-tracker-backend-x.vercel.app/api/auth/github";
};
