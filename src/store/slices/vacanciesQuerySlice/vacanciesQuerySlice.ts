import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import { VacancyProps } from "./vacanciesProps";

export const vacanciesQuerySlice = createApi({
  reducerPath: "vacanciesApiSlice",

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    createVacancy: build.mutation<VacancyProps, VacancyProps>({
      query: (vacancy) => ({
        url: "/vacancies",
        method: "POST",
        body: vacancy,
      }),
    }),

    getAllVacancy: build.query({
      query: () => ({
        url: "/vacancies",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateVacancyMutation, useGetAllVacancyQuery } =
  vacanciesQuerySlice;
