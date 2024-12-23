import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import { CoverLetter, CoverLetterWithId } from "./coverLettersProps";

export const coverLetterQuerySlice = createApi({
  reducerPath: "coverLetterQuerySlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["coverLetter"],
  endpoints: (build) => ({
    createCoverLeter: build.mutation<CoverLetterWithId, CoverLetter>({
      query: (coverLetter) => ({
        url: "/cover-letter",
        method: "POST",
        body: coverLetter,
      }),
      invalidatesTags: ["coverLetter"],
    }),

    getAllCoverLetters: build.query<CoverLetterWithId[], void>({
      query: () => "/cover-letter",
      providesTags: ["coverLetter"],
    }),

    getCoverLetterById: build.query<CoverLetterWithId, string>({
      query: (id) => `/cover-letter/${id}`,
    }),

    updateCoverLetterById: build.mutation<CoverLetterWithId, CoverLetterWithId>(
      {
        query: ({ id, ...updtedCovetLetter }) => ({
          url: `/cover-letter/${id}`,
          method: "PATCH",
          body: updtedCovetLetter,
        }),
        invalidatesTags: ["coverLetter"],
      }
    ),

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
