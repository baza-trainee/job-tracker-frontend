import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { Event } from "../../types/event.types";

export const eventQuerySlice = createApi({
  reducerPath: "eventsQuerySlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["events"],
  endpoints: (build) => ({
    createEvent: build.mutation<
      Event,
      Pick<Event, "date" | "name" | "text" | "time">
    >({
      query: (newEvent) => ({
        url: "/events",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["events"],
    }),

    getAllEvents: build.query<Event[], void>({
      query: () => "/events",
      providesTags: ["events"],
    }),

    getEventById: build.query<Event, Pick<Event, "id">>({
      query: ({ id }) => `/events/${id}`,
    }),

    updateEventById: build.mutation<
      Event,
      Pick<Event, "id"> &
        Partial<Pick<Event, "date" | "name" | "text" | "time">>
    >({
      query: ({ id, ...updatedEvent }) => ({
        url: `/events/${id}`,
        method: "PATCH",
        body: updatedEvent,
      }),
      invalidatesTags: ["events"],
    }),

    deleteEventById: build.mutation<void, Pick<Event, "id">>({
      query: ({ id }) => `/events/${id}`,
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useDeleteEventByIdMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventByIdMutation,
} = eventQuerySlice;
