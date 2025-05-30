import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { clearTokens, saveTokens } from "./slices/authSlice/authSlice";
import { AuthTokensProps } from "./slices/authSlice/authTypes";
import { BACKEND_ENDPOINTS } from "./api/api-routes";

export const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_ENDPOINTS.JOB_TRACKER_BACKEND,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.tokens?.access_token;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    } else {
      console.warn("Access token is missing");
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions);

  const authState = (store.getState() as RootState).auth;

  if (result.error && result.error.status === 401) {
    const refreshToken = authState.tokens?.refresh_token;

    if (refreshToken) {
      const refreshAuthToken = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refresh_token: refreshToken },
        },

        store,

        extraOptions
      );
      const tokens = refreshAuthToken.data as AuthTokensProps;

      if (tokens) {
        store.dispatch(
          saveTokens({
            access_token: tokens.access_token,

            refresh_token: tokens.refresh_token || refreshToken,
          })
        );
        result = await baseQuery(args, store, extraOptions);
      } else {
        store.dispatch(clearTokens());
      }
    } else {
      store.dispatch(clearTokens());
    }
  }
  return result;
};
