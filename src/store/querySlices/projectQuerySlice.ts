import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { Project } from "../../types/projects.types";

export const projectQuerySlice = createApi({
  reducerPath: "projectQuerySlice",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["projects"],

  endpoints: (build) => ({
    createProject: build.mutation<
      Project,
      Pick<Project, "githubLink" | "liveProjectLink" | "name">
    >({
      query: (project) => ({ url: "/projects", method: "POST", body: project }),
      invalidatesTags: ["projects"],
    }),

    getAllProjects: build.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["projects"],
    }),

    getProjectById: build.query<Project, Pick<Project, "id">>({
      query: ({ id }) => `/projects/${id}`,
    }),

    updateProjectById: build.mutation<
      Project,
      Pick<Project, "id"> &
        Partial<Pick<Project, "githubLink" | "liveProjectLink" | "name">>
    >({
      query: ({ id, ...project }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: project,
      }),
      invalidatesTags: ["projects"],
    }),

    deleteProjectById: build.mutation<void, Pick<Project, "id">>({
      query: ({ id }) => ({
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
