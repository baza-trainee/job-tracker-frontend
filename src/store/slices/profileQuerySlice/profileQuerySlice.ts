import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";

export const profileQuerySlice = createApi({
  reducerPath: "profileApiSlice",

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getAllUserData: build.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserDataQuery } = profileQuerySlice;
