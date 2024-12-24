import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import {
  NewVacancy,
  NewVacancyStatus,
  Vacancy,
  VacancyStatus,
} from "../../../types/vacancies.types";

export const vacanciesQuerySlice = createApi({
  reducerPath: "vacanciesQuerySlice",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["vacanies"],

  endpoints: (build) => ({
    createVacancy: build.mutation<Vacancy, NewVacancy>({
      query: (vacancy) => ({
        url: "/vacancies",
        method: "POST",
        body: vacancy,
      }),
      invalidatesTags: ["vacanies"],
    }),

    updateVacancyById: build.mutation<
      Vacancy,
      Partial<NewVacancy> & { vacancyId: string }
    >({
      query: ({ vacancyId, ...vacancy }) => ({
        url: `/vacancies/${vacancyId}`,
        method: "PATCH",
        body: vacancy,
      }),
      invalidatesTags: ["vacanies"],
    }),

    getAllVacancy: build.query<Vacancy[], void>({
      query: () => "/vacancies",
      providesTags: ["vacanies"],
    }),

    getVacancyById: build.query<Vacancy, { vacancyId: string }>({
      query: ({ vacancyId }) => `/vacancies/${vacancyId}`,
    }),

    deleteVacancyById: build.mutation<void, { vacancyId: string }>({
      query: ({ vacancyId }) => ({
        url: `/vacancies/${vacancyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vacanies"],
    }),

    archiveVacancyById: build.mutation<Vacancy, { vacancyId: string }>({
      query: ({ vacancyId }) => ({
        url: `/vacancies/${vacancyId}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: ["vacanies"],
    }),

    createStatusVacancyById: build.mutation<
      VacancyStatus,
      NewVacancyStatus & { vacancyId: string }
    >({
      query: ({ vacancyId, ...newStatus }) => ({
        url: `/vacancies/${vacancyId}/status`,
        method: "POST",
        body: newStatus,
      }),
      invalidatesTags: ["vacanies"],
    }),

    updateSpecificStatusVacancyById: build.mutation<
      VacancyStatus,
      NewVacancyStatus & { vacancyId: string }
    >({
      query: ({ vacancyId, resumeId, ...newStatus }) => ({
        url: `/vacancies/${vacancyId}/status/${resumeId}`,
        method: "PATCH",
        body: { newStatus, resumeId },
      }),
      invalidatesTags: ["vacanies"],
    }),

    deleteStatusVacancyById: build.mutation<
      void,
      { vacancyId: string; statusId: string }
    >({
      query: ({ vacancyId, statusId }) => ({
        url: `/vacancies/${vacancyId}/status/${statusId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vacanies"],
    }),
  }),
});

export const {
  useCreateVacancyMutation,
  useGetAllVacancyQuery,
  useArchiveVacancyByIdMutation,
  useCreateStatusVacancyByIdMutation,
  useDeleteStatusVacancyByIdMutation,
  useDeleteVacancyByIdMutation,
  useGetVacancyByIdQuery,
  useUpdateVacancyByIdMutation,
  useUpdateSpecificStatusVacancyByIdMutation,
} = vacanciesQuerySlice;
