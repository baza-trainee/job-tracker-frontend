import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../fetchBaseQuery";
import { VacancyProps } from "./profileProps";

export const profileApiSlice = createApi({
  reducerPath: "profileApiSlice",

  baseQuery,

  endpoints: (build) => ({
    getAllUserData: build.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),

    createVacancy: build.mutation<VacancyProps, VacancyProps>({
      query: (vacancy) => ({
        url: "/api/vacancies",
        method: "POST",
        body: vacancy,
      }),
    }),

    getAllVacancy: build.mutation({
      query: () => ({
        url: "/api/vacancies",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserDataQuery, useCreateVacancyMutation } =
  profileApiSlice;
