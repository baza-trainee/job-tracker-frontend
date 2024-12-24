export type PredictionRequest = { textUk: string; textEn: string };

export type Prediction = PredictionRequest & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PredictionsSeed = {
  count: number;
};
