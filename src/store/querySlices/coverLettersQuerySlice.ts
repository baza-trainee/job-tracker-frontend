import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { CoverLetter } from "../../types/coverLetters.types";

export const coverLetterQuerySlice = createApi({
  reducerPath: "coverLetterQuerySlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["coverLetter"],
  endpoints: (build) => ({
    createCoverLeter: build.mutation<CoverLetter, CoverLetter>({
      query: (coverLetter) => ({
        url: "/cover-letter",
        method: "POST",
        body: coverLetter,
      }),
      invalidatesTags: ["coverLetter"],
    }),

    getAllCoverLetters: build.query<CoverLetter[], void>({
      query: () => "/cover-letter",
      providesTags: ["coverLetter"],
    }),

    getCoverLetterById: build.query<CoverLetter, string>({
      query: (id) => `/cover-letter/${id}`,
    }),

    updateCoverLetterById: build.mutation<CoverLetter, CoverLetter>({
      query: ({ id, ...updtedCovetLetter }) => ({
        url: `/cover-letter/${id}`,
        method: "PATCH",
        body: updtedCovetLetter,
      }),
      invalidatesTags: ["coverLetter"],
    }),

    deleteCoverLetterById: build.mutation<void, string>({
      query: (id) => ({
        url: `/cover-letter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coverLetter"],
    }),
  }),
});

export const {
  useCreateCoverLeterMutation,
  useDeleteCoverLetterByIdMutation,
  useGetAllCoverLettersQuery,
  useGetCoverLetterByIdQuery,
  useUpdateCoverLetterByIdMutation,
} = coverLetterQuerySlice;
