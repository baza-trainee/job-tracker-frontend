import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/axios";
import { saveTokens, clearTokens, isLoggedIn } from "./authSlice";
import {
  AuthStateProps,
  KnownErrorProps,
  UserProps,
  forgotPasswordProps,
  resetPasswordProps,
} from "./authTypes";

import { isAxiosError } from "axios";

import { openModal } from "../modalSlice/modalSlice";

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
          typeModal: "success",
          modalContent:
            "Авторизація пройшла успішно. Зараз ви можете налаштувати свій профіль.",
        })
      );
      return response.data.user;
    } catch (error) {
      dispatch(
        openModal({
          typeModal: "error",
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
          typeModal: "success",
        })
      );
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          dispatch(
            openModal({
              typeModal: "errorMailExist",
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
          typeModal: "success",
          modalContent:
            "Зміна пароля успішна. Вам надіслано повідомлення на електронну пошту.",
        })
      );
    } catch (error) {
      dispatch(
        openModal({
          typeModal: "error",
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
          typeModal: "success",
          modalContent: "Зміна пароля успішна. Увійдіть з новим паролем",
        })
      );
    } catch (error) {
      dispatch(
        openModal({
          typeModal: "error",
        })
      );
      if (isAxiosError(error)) {
        const errorCode = error.response?.status;
        if (errorCode === 401) {
          dispatch(
            openModal({
              typeModal: "error",
              modalContent:
                "Посилання на відновлення паролю не дійсне. Спробуйте ще раз",
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

// export const isValidToken = createAsyncThunk(
//   "auth/isValidToken",
//   async (
//     { password, token }: resetPasswordProps,
//     { dispatch, rejectWithValue }
//   ) => {
//     try {
//       await api.post("/auth/reset-password", {
//         token,
//         password,
//       });
//       dispatch(
//         openModal({
//           typeModal: "success",
//           modalContent: "Токен Валідний",
//         })
//       );
//     } catch (error) {
//       dispatch(
//         openModal({
//           typeModal: "error",
//         })
//       );
//       if (isAxiosError(error)) {
//         const errorCode = error.response?.status;
//         if (errorCode === 401) {
//           dispatch(
//             openModal({
//               typeModal: "error",
//               modalContent: "Токен Невалідний",
//             })
//           );
//           return rejectWithValue({
//             message: "Токен не дійсний",
//             code: errorCode,
//           });
//         }
//       } else {
//         return rejectWithValue({
//           message: "Сталася невідома помилка при обробці запиту",
//           code: undefined,
//         });
//       }
//     }
//   }
// );
