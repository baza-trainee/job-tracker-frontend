import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { Profile } from "../../types/profile.types";

export const profileQuerySlice = createApi({
  reducerPath: "profileQuerySlice",

  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  endpoints: (build) => ({
    getAllUserData: build.query<Profile, void>({
      query: () => "/user/profile",
    }),
  }),
});

export const { useGetAllUserDataQuery } = profileQuerySlice;
