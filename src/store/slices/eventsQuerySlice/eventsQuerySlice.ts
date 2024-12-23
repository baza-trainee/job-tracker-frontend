import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import { Event, EventWithId } from "./eventProps";

export const eventQuerySlice = createApi({
  reducerPath: "eventsQuerySlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["events"],
  endpoints: (build) => ({
    createEvent: build.mutation<Event, Event>({
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

    getEventById: build.query<Event, string>({
      query: (id) => `/events/${id}`,
    }),

    updateEventById: build.mutation<Event, EventWithId>({
      query: ({ id, ...updatedEvent }) => ({
        url: `/events/${id}`,
        method: "PATCH",
        body: updatedEvent,
      }),
      invalidatesTags: ["events"],
    }),

    deleteEventById: build.mutation<void, string>({
      query: (id) => `/events/${id}`,
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
