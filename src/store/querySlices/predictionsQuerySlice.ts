import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../fetchBaseQuery";
import { Prediction, PredictionsSeed } from "../../types/predictions.types";

export const predictionsQuerySlice = createApi({
  reducerPath: "predictionsQuerySlice",

  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: ["predictions"],

  endpoints: (build) => ({
    createPrediction: build.mutation<
      Prediction,
      Pick<Prediction, "textEn" | "textUk">
    >({
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

    getPredictionById: build.query<Prediction, Pick<Prediction, "id">>({
      query: ({ id }) => `/predictions/${id}`,
    }),

    updatePredictionById: build.mutation<
      Prediction,
      Pick<Prediction, "id"> & Partial<Pick<Prediction, "textEn" | "textUk">>
    >({
      query: ({ id, ...updatetPrediction }) => ({
        url: `/predictions/${id}`,
        method: "PATCH",
        body: updatetPrediction,
      }),
      invalidatesTags: ["predictions"],
    }),

    deletePredictionById: build.mutation<void, Pick<Prediction, "id">>({
      query: ({ id }) => `/predictions/${id}`,
      invalidatesTags: ["predictions"],
    }),

    getSeedPredictions: build.query<PredictionsSeed, void>({
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
  useGetSeedPredictionsQuery,
  useUpdatePredictionByIdMutation,
} = predictionsQuerySlice;
