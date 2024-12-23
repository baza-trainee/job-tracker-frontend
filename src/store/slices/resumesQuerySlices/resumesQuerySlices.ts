import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import { Resume, ResumeWithId } from "./resumesProps";

export const resumesQuerySlices = createApi({
  reducerPath: "resumesQuerySlices",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["resumes"],
  endpoints: (build) => ({
    getAllResumes: build.query<ResumeWithId[], void>({
      query: () => "/resumes",
      providesTags: ["resumes"],
    }),

    createResume: build.mutation<ResumeWithId, Resume>({
      query: (resume) => ({ url: "/resumes", method: "POST", body: resume }),
      invalidatesTags: ["resumes"],
    }),

    getResumeById: build.query<ResumeWithId, string>({
      query: (id) => `/resumes/${id}`,
    }),

    updateResumeById: build.mutation<ResumeWithId, ResumeWithId>({
      query: ({ id, ...resume }) => ({
        url: `/resumes/${id}`,
        method: "PATCH",
        body: resume,
      }),
      invalidatesTags: ["resumes"],
    }),

    deleteResumeById: build.mutation<void, string>({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["resumes"],
    }),
  }),
});

export const {
  useCreateResumeMutation,
  useGetAllResumesQuery,
  useGetResumeByIdQuery,
  useUpdateResumeByIdMutation,
  useDeleteResumeByIdMutation,
} = resumesQuerySlices;
