import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import { Note } from "./notesProps";

export const notesQuerySlice = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "notesQuerySlice",
  tagTypes: ["notes"],
  endpoints: (build) => ({
    createNote: build.mutation<Note, Note>({
      query: (newNote) => ({
        url: "/notes",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ["notes"],
    }),

    getAllNotes: build.query<Note[], void>({
      query: () => "/notes",
      providesTags: ["notes"],
    }),

    getNoteById: build.query<Note, string>({
      query: (id) => `/note/${id}`,
    }),

    updateNoteById: build.mutation<Note, Note>({
      query: ({ id, ...updatedNote }) => ({
        url: `/note/${id}`,
        method: "PATCH",
        body: updatedNote,
      }),
      invalidatesTags: ["notes"],
    }),

    deleteNoteById: build.mutation<void, string>({
      query: (id) => ({
        url: `/note/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notes"],
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useDeleteNoteByIdMutation,
  useGetAllNotesQuery,
  useGetNoteByIdQuery,
  useUpdateNoteByIdMutation,
} = notesQuerySlice;
