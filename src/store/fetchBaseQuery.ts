import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AXIOS } from "../api/axios-constants";
import { RootState } from "./store";

export const baseQuery = fetchBaseQuery({
  baseUrl: AXIOS.URL_BACKEND,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens?.access_token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
