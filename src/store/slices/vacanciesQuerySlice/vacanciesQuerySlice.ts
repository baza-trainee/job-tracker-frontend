import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import { VacancyProps } from "./vacanciesProps";
import { TAG_TYPES } from "../../tagQueryConstans";

export const vacanciesQuerySlice = createApi({
  reducerPath: "vacanciesApiSlice",

  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.GET_ALL_VACANCIES, TAG_TYPES.USERDATA],

  endpoints: (build) => ({
    createVacancy: build.mutation<VacancyProps, VacancyProps>({
      query: (vacancy) => ({
        url: "/vacancies",
        method: "POST",
        body: vacancy,
      }),
      invalidatesTags: [TAG_TYPES.USERDATA],
    }),

    getAllVacancy: build.query({
      query: () => ({
        url: "/vacancies",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.GET_ALL_VACANCIES],
    }),
  }),
});

export const { useCreateVacancyMutation, useGetAllVacancyQuery } =
  vacanciesQuerySlice;
