import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { Vacancy, VacancyStatus } from "../../types/vacancies.types";

export const vacanciesQuerySlice = createApi({
  reducerPath: "vacanciesQuerySlice",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["vacanies"],

  endpoints: (build) => ({
    createVacancy: build.mutation<
      Vacancy,
      Pick<Vacancy, "company" | "location" | "vacancy" | "link" | "work_type"> &
        Partial<Pick<Vacancy, "communication" | "note" | "isArchived">>
    >({
      query: (vacancy) => ({
        url: "/vacancies",
        method: "POST",
        body: vacancy,
      }),
      invalidatesTags: ["vacanies"],
    }),

    updateVacancyById: build.mutation<
      Vacancy,
      Pick<Vacancy, "id"> & Partial<Omit<Vacancy, "id" | "statuses">>
    >({
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

    getVacancyById: build.query<Vacancy, Pick<Vacancy, "id">>({
      query: ({ id }) => `/vacancies/${id}`,
    }),

    deleteVacancyById: build.mutation<void, Pick<Vacancy, "id">>({
      query: ({ id }) => ({
        url: `/vacancies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vacanies"],
    }),

    archiveVacancyById: build.mutation<Vacancy, Pick<Vacancy, "id">>({
      query: ({ id }) => ({
        url: `/vacancies/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: ["vacanies"],
    }),

    createStatusVacancyById: build.mutation<
      VacancyStatus,
      Pick<VacancyStatus, "name" | "date"> &
        Partial<Pick<VacancyStatus, "rejectReason" | "resumeId">> & {
          vacancyId: string;
        }
    >({
      query: ({ vacancyId, ...newStatus }) => ({
        url: `/vacancies/${vacancyId}/status`,
        method: "POST",
        // body: {...newStatus},
        body: newStatus,
      }),
      invalidatesTags: ["vacanies"],
    }),

    updateSpecificStatusVacancyById: build.mutation<
      VacancyStatus,
      Pick<VacancyStatus, "name" | "resumeId"> &
        Partial<Pick<VacancyStatus, "rejectReason">> & {
          vacancyId: string;
        }
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
      Pick<VacancyStatus, "id"> & { vacancyId: string }
    >({
      query: ({ vacancyId, id }) => ({
        url: `/vacancies/${vacancyId}/status/${id}`,
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
