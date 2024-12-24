import { User } from "../../../types/profile.types";

export type PredictionRequest = { textUk: string; textEn: string };

export type Prediction = PredictionRequest & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
};

export type PredictionsSeed = {
  count: number;
};
