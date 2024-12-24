import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { Project } from "../../types/projects.types";

export const projectQuerySlice = createApi({
  reducerPath: "projectQuerySlice",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["projects"],

  endpoints: (build) => ({
    createProject: build.mutation<Project, Project>({
      query: (project) => ({ url: "/projects", method: "POST", body: project }),
      invalidatesTags: ["projects"],
    }),

    getAllProjects: build.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["projects"],
    }),

    getProjectById: build.query<Project, string>({
      query: (id) => `/projects/${id}`,
    }),

    updateProjectById: build.mutation<Project, Project>({
      query: ({ id, ...project }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: project,
      }),
      invalidatesTags: ["projects"],
    }),

    deleteProjectById: build.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectByIdMutation,
  useGetProjectByIdQuery,
  useUpdateProjectByIdMutation,
} = projectQuerySlice;
