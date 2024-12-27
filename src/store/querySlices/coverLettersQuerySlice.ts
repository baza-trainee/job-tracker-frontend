import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { CoverLetter } from "../../types/coverLetters.types";

export const coverLetterQuerySlice = createApi({
  reducerPath: "coverLetterQuerySlice",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: ["coverLetter"],
  endpoints: (build) => ({
    createCoverLeter: build.mutation<
      CoverLetter,
      Pick<CoverLetter, "name" | "text">
    >({
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

    getCoverLetterById: build.query<CoverLetter, Pick<CoverLetter, "id">>({
      query: ({ id }) => `/cover-letter/${id}`,
    }),

    updateCoverLetterById: build.mutation<
      CoverLetter,
      Pick<CoverLetter, "id"> & Partial<Pick<CoverLetter, "name" | "text">>
    >({
      query: ({ id, ...updtedCovetLetter }) => ({
        url: `/cover-letter/${id}`,
        method: "PATCH",
        body: updtedCovetLetter,
      }),
      invalidatesTags: ["coverLetter"],
    }),

    deleteCoverLetterById: build.mutation<void, Pick<CoverLetter, "id">>({
      query: ({ id }) => ({
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
