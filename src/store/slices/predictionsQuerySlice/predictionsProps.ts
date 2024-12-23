export type PredictionRequest = { textUk: string; textEn: string };

export type Prediction = PredictionRequest & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type PredictionsSeed = {
  count: number;
};
