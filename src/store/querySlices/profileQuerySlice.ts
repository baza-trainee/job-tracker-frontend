import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { Profile } from "../../types/profile.types";

export const profileQuerySlice = createApi({
  reducerPath: "profileQuerySlice",
  // refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  tagTypes: ["Profile"],

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getAllUserData: build.query<Profile, void>({
      query: () => "/user/profile",
      providesTags: ["Profile"],
    }),

    updateUserProfile: build.mutation<
      Profile,
      Partial<Pick<Profile, "email" | "phone" | "username">>
    >({
      query: (body) => ({
        url: "/user/update",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    createSocialLink: build.mutation<
      Profile["socials"],
      Pick<Profile["socials"][0], "link" | "name">
    >({
      query: (body) => ({
        url: "/user/socials",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    updateSocialLink: build.mutation<
      Profile["socials"][0],
      Partial<Profile["socials"][0]> & { idSocialLink: string }
    >({
      query: ({ idSocialLink, ...body }) => ({
        url: `/user/socials/${idSocialLink}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteSocialLink: build.mutation<void, { idSocialLink: string }>({
      query: ({ idSocialLink }) => ({
        url: `/user/socials/${idSocialLink}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetAllUserDataQuery,
  useUpdateUserProfileMutation,
  useCreateSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
} = profileQuerySlice;
