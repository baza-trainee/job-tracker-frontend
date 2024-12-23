import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
// import { User } from "./profileProps";

export const profileQuerySlice = createApi({
  reducerPath: "profileQuerySlice",

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getAllUserData: build.query<any, void>({
      query: () => "/user/profile",
    }),
  }),
});

export const { useGetAllUserDataQuery } = profileQuerySlice;
