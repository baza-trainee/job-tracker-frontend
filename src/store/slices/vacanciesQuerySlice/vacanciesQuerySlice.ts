import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import { TAG_TYPES } from "../../tagQueryConstans";
import {
  ChangeStatusVacancy,
  NewVacancyProps,
  UpdateVacancyById,
} from "../../../schemas/AddVacancySchema";

export const vacanciesQuerySlice = createApi({
  reducerPath: "vacanciesQuerySlice",

  baseQuery: baseQueryWithReauth,
  tagTypes: [TAG_TYPES.GET_ALL_VACANCIES, TAG_TYPES.USERDATA],

  endpoints: (build) => ({
    createVacancy: build.mutation<NewVacancyProps, NewVacancyProps>({
      query: (vacancy) => ({
        url: "/vacancies",
        method: "POST",
        body: vacancy,
      }),
      invalidatesTags: [TAG_TYPES.USERDATA],
    }),

    updateVacancyById: build.mutation<UpdateVacancyById, UpdateVacancyById>({
      query: ({ id, ...vacancy }) => ({
        url: `/vacancies/${id}`,
        method: "PATCH",
        body: vacancy,
      }),
      invalidatesTags: [TAG_TYPES.USERDATA],
    }),

    getAllVacancy: build.query<UpdateVacancyById[], void>({
      query: () => ({
        url: "/vacancies",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.GET_ALL_VACANCIES],
    }),

    getVacancyById: build.query<UpdateVacancyById, string>({
      query: (id) => ({
        url: `/vacancies/${id}`,
        method: "GET",
      }),
    }),

    deleteVacancyById: build.mutation({
      query: (id) => ({
        url: `/vacancies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.USERDATA],
    }),

    archiveVacancyById: build.mutation({
      query: (id) => ({
        url: `/vacancies/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: [TAG_TYPES.USERDATA],
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
      invalidatesTags: [TAG_TYPES.USERDATA],
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
      invalidatesTags: [TAG_TYPES.USERDATA],
    }),

    deleteStatusVacancyById: build.mutation<
      ChangeStatusVacancy,
      ChangeStatusVacancy
    >({
      query: ({ vacancyId, statusId }) => ({
        url: `/vacancies/${vacancyId}/status/${statusId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.USERDATA],
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
