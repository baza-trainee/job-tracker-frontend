import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import {
  ChangeStatusVacancy,
  NewVacancyProps,
  UpdateVacancyById,
} from "../../../schemas/AddVacancySchema";

export const vacanciesQuerySlice = createApi({
  reducerPath: "vacanciesQuerySlice",

  baseQuery: baseQueryWithReauth,
  tagTypes: ["vacanies"],

  endpoints: (build) => ({
    createVacancy: build.mutation<NewVacancyProps, NewVacancyProps>({
      query: (vacancy) => ({
        url: "/vacancies",
        method: "POST",
        body: vacancy,
      }),
      invalidatesTags: ["vacanies"],
    }),

    updateVacancyById: build.mutation<UpdateVacancyById, UpdateVacancyById>({
      query: ({ id, ...vacancy }) => ({
        url: `/vacancies/${id}`,
        method: "PATCH",
        body: vacancy,
      }),
      invalidatesTags: ["vacanies"],
    }),

    getAllVacancy: build.query<UpdateVacancyById[], void>({
      query: () => "/vacancies",
      providesTags: ["vacanies"],
    }),

    getVacancyById: build.query<UpdateVacancyById, string>({
      query: (id) => `/vacancies/${id}`,
    }),

    deleteVacancyById: build.mutation({
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

    createStatusVacancyById: build.mutation<
      ChangeStatusVacancy,
      ChangeStatusVacancy
    >({
      query: ({ vacancyId, ...newStatus }) => ({
        url: `/vacancies/${vacancyId}/status`,
        method: "POST",
        body: newStatus,
      }),
      invalidatesTags: ["vacanies"],
    }),

    updateSpecificStatusVacancyById: build.mutation<
      ChangeStatusVacancy,
      ChangeStatusVacancy
    >({
      query: ({ vacancyId, statusId, ...newStatus }) => ({
        url: `/vacancies/${vacancyId}/status/${statusId}`,
        method: "PATCH",
        body: { newStatus, statusId },
      }),
      invalidatesTags: ["vacanies"],
    }),

    deleteStatusVacancyById: build.mutation<
      ChangeStatusVacancy,
      ChangeStatusVacancy
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
