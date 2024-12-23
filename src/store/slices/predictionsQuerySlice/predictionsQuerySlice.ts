import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../fetchBaseQuery";
import {
  Prediction,
  PredictionRequest,
  PredictionsSeed,
} from "./predictionsProps";

export const predictionsQuerySlice = createApi({
  reducerPath: "predictionsQuerySlice",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["predictions"],

  endpoints: (build) => ({
    createPrediction: build.mutation<Prediction, PredictionRequest>({
      query: (newPrediction) => ({
        url: "/predictions",
        method: "POST",
        body: newPrediction,
      }),
      invalidatesTags: ["predictions"],
    }),

    getAllPredictions: build.query<Prediction[], void>({
      query: () => "/predictions",
      providesTags: ["predictions"],
    }),

    getPredictionDaily: build.query<Prediction, void>({
      query: () => "/predictions/daily",
    }),

    getPredictionById: build.query<Prediction, string>({
      query: (id) => `/predictions/${id}`,
    }),

    updatePredictionById: build.mutation<
      Prediction,
      PredictionRequest & { id: string }
    >({
      query: ({ id, ...updatetPrediction }) => ({
        url: `/predictions/${id}`,
        method: "PATCH",
        body: updatetPrediction,
      }),
      invalidatesTags: ["predictions"],
    }),

    deletePredictionById: build.mutation<void, string>({
      query: (id) => `/predictions/${id}`,
      invalidatesTags: ["predictions"],
    }),

    seedPredictions: build.query<PredictionsSeed, void>({
      query: () => `/predictions/seed`,
    }),
  }),
});

export const {
  useCreatePredictionMutation,
  useDeletePredictionByIdMutation,
  useGetAllPredictionsQuery,
  useGetPredictionByIdQuery,
  useGetPredictionDailyQuery,
  useSeedPredictionsQuery,
  useUpdatePredictionByIdMutation,
} = predictionsQuerySlice;
