import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { Resume } from "../../types/resumes.types";

export const resumesQuerySlices = createApi({
  reducerPath: "resumesQuerySlices",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["resumes"],
  endpoints: (build) => ({
    getAllResumes: build.query<Resume[], void>({
      query: () => "/resumes",
      providesTags: ["resumes"],
    }),

    createResume: build.mutation<Resume, Pick<Resume, "link" | "name">>({
      query: (resume) => ({ url: "/resumes", method: "POST", body: resume }),
      invalidatesTags: ["resumes"],
    }),

    getResumeById: build.query<Resume, Pick<Resume, "id">>({
      query: ({ id }) => `/resumes/${id}`,
    }),

    updateResumeById: build.mutation<
      Resume,
      Pick<Resume, "id"> & Partial<Pick<Resume, "link" | "name">>
    >({
      query: ({ id, ...resume }) => ({
        url: `/resumes/${id}`,
        method: "PATCH",
        body: resume,
      }),
      invalidatesTags: ["resumes"],
    }),

    deleteResumeById: build.mutation<void, Pick<Resume, "id">>({
      query: ({ id }) => ({
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
