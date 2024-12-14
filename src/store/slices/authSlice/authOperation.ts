import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosInstance } from "../../../api/axios";
import { saveTokens, clearTokens, isLoggedIn } from "./authSlice";
import {
  AuthStateProps,
  KnownErrorProps,
  UserProps,
  forgotPasswordProps,
  resetPasswordProps,
} from "./authTypes";

import { isAxiosError } from "axios";

import { closeModal, openModal } from "../modalSlice/modalSlice";

export const GoogleLogin = () => {
  window.location.href =
    "https://job-tracker-backend-x.vercel.app/api/auth/google";
};

export const GithubLogin = () => {
  window.location.href =
    "https://job-tracker-backend-x.vercel.app/api/auth/github";
};

export const refreshUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { getState, dispatch }) => {
    const state = getState() as { auth: AuthStateProps };
    const tokens = state.auth.tokens;

    if (!tokens) return null;

    try {
      const response = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      dispatch(isLoggedIn());
      return response.data; // id, email, username
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const newAccessToken = await dispatch(refreshTokens()).unwrap();
          const retryResponse = await api.get("/user/profile", {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
          saveTokens({
            access_token: newAccessToken,
            refresh_token: tokens.refresh_token,
          });
          dispatch(isLoggedIn());
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
      const response = await api.post("/auth/refresh", {
        refresh_token: tokens.refresh_token,
      });
      return response.data.access_token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      dispatch(clearTokens());
      throw error;
    }
  }
);

export const logIn = createAsyncThunk<
  UserProps,
  UserProps,
  { rejectValue: KnownErrorProps }
>(
  "auth/logIn",
  async ({ email, password }: UserProps, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const { access_token, refresh_token } = response.data;
      dispatch(saveTokens({ access_token, refresh_token }));
      dispatch(
        openModal({
          typeModal: "logInSuccess",
        })
      );
      return response.data.user;
    } catch (error) {
      dispatch(
        openModal({
          typeModal: "logInError",
        })
      );
      if (isAxiosError(error)) {
        const errorCode = error.response?.status;
        if (errorCode === 401 || errorCode === 404) {
          return rejectWithValue({
            message: "Невірний пароль або пошта",
            code: errorCode,
          });
        }
      } else {
        return rejectWithValue({
          message: "Сталася невідома помилка при обробці запиту",
          code: undefined,
        });
      }
    }
  }
);

export const signUp = createAsyncThunk<
  UserProps,
  UserProps,
  { rejectValue: KnownErrorProps }
>(
  "auth/signIn",
  async ({ email, password }: UserProps, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
      });
      const { access_token, refresh_token } = response.data;
      dispatch(saveTokens({ access_token, refresh_token }));
      dispatch(
        openModal({
          typeModal: "signUpSuccess",
        })
      );
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          dispatch(
            openModal({
              typeModal: "signUpError",
            })
          );

          return rejectWithValue({
            message: "Обліковий запис з такою поштою існує",
            code: 409,
          });
        } else {
          return rejectWithValue({
            message: "Сталася помилка при обробці запиту",
            code: undefined,
          });
        }
      }
    }
  }
);

export const forgotPassword = createAsyncThunk<
  void,
  forgotPasswordProps,
  { rejectValue: KnownErrorProps }
>(
  "auth/forgotPassword",
  async ({ email }: forgotPasswordProps, { dispatch, rejectWithValue }) => {
    try {
      await api.post("/auth/forgot-password", {
        email,
      });
      dispatch(
        openModal({
          typeModal: "forgotPasswordSuccess",
        })
      );
    } catch (error) {
      dispatch(
        openModal({
          typeModal: "logInError",
        })
      );
      if (isAxiosError(error)) {
        const errorCode = error.response?.status;
        if (errorCode === 401) {
          return rejectWithValue({
            message: "Невірна пошта",
            code: errorCode,
          });
        }
      } else {
        return rejectWithValue({
          message: "Сталася невідома помилка при обробці запиту",
          code: undefined,
        });
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { password, token }: resetPasswordProps,
    { dispatch, rejectWithValue }
  ) => {
    try {
      await api.post("/auth/reset-password", {
        token,
        password,
      });
      dispatch(
        openModal({
          typeModal: "resetPasswordSuccess",
        })
      );
    } catch (error) {
      dispatch(
        openModal({
          typeModal: "logInError",
        })
      );
      if (isAxiosError(error)) {
        const errorCode = error.response?.status;
        if (errorCode === 401) {
          dispatch(
            openModal({
              typeModal: "resetPasswordErrorLink",
            })
          );
          return rejectWithValue({
            message: "Токен не дійсний",
            code: errorCode,
          });
        }
      } else {
        return rejectWithValue({
          message: "Сталася невідома помилка при обробці запиту",
          code: undefined,
        });
      }
    }
  }
);

export const logOut = createAsyncThunk<
  void,
  void,
  { rejectValue: KnownErrorProps }
>("auth/logOut", async (_, { dispatch, rejectWithValue }) => {
  try {
    await axiosInstance.post("/auth/logout");
    dispatch(clearTokens());
    dispatch(closeModal());
  } catch (error) {
    dispatch(
      openModal({
        typeModal: "logInError",
      })
    );
    console.log("logOut error", error);
    return rejectWithValue({
      message: "Сталася невідома помилка при обробці запиту ",
      code: undefined,
    });
  }
});
