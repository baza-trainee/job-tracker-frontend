import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "../fetchBaseQuery";
import {
  clearTokens,
  isLoggedIn,
  saveTokens,
} from "../slices/authSlice/authSlice";
import { closeModal, openModal } from "../slices/modalSlice/modalSlice";
import { BACKEND_ENDPOINTS } from "../api/api-routes";

type AuthResponse = { access_token: string; refresh_token: string };
type AuthRequest = { email: string; password: string };
type ResponseMessage = { message: string; status_code: number };
type RequestChangePassword = {
  previous_password: string;
  new_password: string;
};

export const authPublicQuerySlice = createApi({
  reducerPath: "authPublicQuerySlice",

  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_ENDPOINTS.JOB_TRACKER_BACKEND + "/auth",
  }),

  endpoints: (build) => ({
    logInUserWithCredentials: build.mutation<AuthResponse, AuthRequest>({
      query: (credentialUser) => ({
        url: "/auth/login",
        method: "POST",
        body: credentialUser,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveTokens(data));
          dispatch(
            openModal({
              typeModal: "logInSuccess",
            })
          );
          dispatch(isLoggedIn());
        } catch (error) {
          dispatch(
            openModal({
              typeModal: "logInError",
            })
          );
        }
      },
    }),

    registerUserWithCredentials: build.mutation<AuthResponse, AuthRequest>({
      query: (credentialUser) => ({
        url: "/auth/register",
        method: "POST",
        body: credentialUser,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveTokens(data));
          dispatch(
            openModal({
              typeModal: "signUpSuccess",
            })
          );
          dispatch(isLoggedIn());
        } catch (error) {
          dispatch(
            openModal({
              typeModal: "signUpError",
            })
          );
        }
      },
    }),

    forgotPasswordUser: build.mutation<
      Pick<ResponseMessage, "message">,
      Pick<AuthRequest, "email">
    >({
      query: (emailUser) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: emailUser,
      }),
    }),

    resetUserPassword: build.mutation<
      Pick<ResponseMessage, "message">,
      Pick<AuthRequest, "password"> & Pick<AuthResponse, "access_token">
    >({
      query: (requestBody) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: requestBody,
      }),
    }),

    refreshToken: build.mutation<
      Pick<AuthResponse, "access_token">,
      Pick<AuthResponse, "refresh_token">
    >({
      query: (requestBody) => ({
        url: "/auth/refresh",
        method: "POST",
        body: requestBody,
      }),
    }),
  }),
});

export const authPrivateQuerySlice = createApi({
  reducerPath: "authPrivateQuerySlice",

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    logOutUser: build.mutation<ResponseMessage, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearTokens());
          dispatch(closeModal());
        } catch (error) {
          dispatch(
            openModal({
              typeModal: "logInError",
            })
          );
        }
      },
    }),

    changePasswordUser: build.mutation<void, RequestChangePassword>({
      query: (requestBody) => ({
        url: "/user/change-password",
        method: "POST",
        body: requestBody,
      }),
    }),
  }),
});

export const {
  useLogInUserWithCredentialsMutation,
  useRegisterUserWithCredentialsMutation,
  useForgotPasswordUserMutation,
  useRefreshTokenMutation,
  useResetUserPasswordMutation,
} = authPublicQuerySlice;

export const { useLogOutUserMutation, useChangePasswordUserMutation } =
  authPrivateQuerySlice;
