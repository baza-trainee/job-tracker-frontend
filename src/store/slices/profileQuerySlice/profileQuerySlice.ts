import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import { TAG_TYPES } from "../../tagQueryConstans";

export const profileQuerySlice = createApi({
  reducerPath: "profileApiSlice",

  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.USERDATA],

  endpoints: (build) => ({
    getAllUserData: build.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
        providesTags: () => [TAG_TYPES.USERDATA],
      }),
    }),
  }),
});

export const { useGetAllUserDataQuery } = profileQuerySlice;
