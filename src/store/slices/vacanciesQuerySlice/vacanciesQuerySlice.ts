import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import { Vacancy, VacancyStatus } from "./vacanciesProps";

export const vacanciesQuerySlice = createApi({
  reducerPath: "vacanciesQuerySlice",

  baseQuery: baseQueryWithReauth,
  tagTypes: ["vacanies"],

  endpoints: (build) => ({
    createVacancy: build.mutation<Vacancy, Vacancy>({
      query: (vacancy) => ({
        url: "/vacancies",
        method: "POST",
        body: vacancy,
      }),
      invalidatesTags: ["vacanies"],
    }),

    updateVacancyById: build.mutation<Vacancy, Vacancy>({
      query: ({ id, ...vacancy }) => ({
        url: `/vacancies/${id}`,
        method: "PATCH",
        body: vacancy,
      }),
      invalidatesTags: ["vacanies"],
    }),

    getAllVacancy: build.query<Vacancy[], void>({
      query: () => "/vacancies",
      providesTags: ["vacanies"],
    }),

    getVacancyById: build.query<Vacancy, string>({
      query: (id) => `/vacancies/${id}`,
    }),

    deleteVacancyById: build.mutation<void, string>({
      query: (id) => ({
        url: `/vacancies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vacanies"],
    }),

    archiveVacancyById: build.mutation({
      query: (id) => ({
        url: `/vacancies/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: ["vacanies"],
    }),

    createStatusVacancyById: build.mutation<VacancyStatus, VacancyStatus>({
      query: ({ vacancyId, ...newStatus }) => ({
        url: `/vacancies/${vacancyId}/status`,
        method: "POST",
        body: newStatus,
      }),
      invalidatesTags: ["vacanies"],
    }),

    updateSpecificStatusVacancyById: build.mutation<
      VacancyStatus,
      VacancyStatus
    >({
      query: ({ vacancyId, resumeId, ...newStatus }) => ({
        url: `/vacancies/${vacancyId}/status/${resumeId}`,
        method: "PATCH",
        body: { newStatus, resumeId },
      }),
      invalidatesTags: ["vacanies"],
    }),

    deleteStatusVacancyById: build.mutation<VacancyStatus, VacancyStatus>({
      query: ({ vacancyId, resumeId }) => ({
        url: `/vacancies/${vacancyId}/status/${resumeId}`,
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
