import { Prediction } from "@/types/predictions.types";
import { Vacancy } from "@/types/vacancies.types";

export interface StatisticsPanelProps {
  vacancies: Vacancy[];
  prediction: Prediction | null;
}

export interface Panellist {
  cardName: CardNameKeys;
  cardQuantity: number;
}

export enum CardNameKeys {
  VACANCIES = "vacancies",
  RESUME = "resume",
  TESTTASKS = "testTasks",
  INTERVIEWS = "interviews",
  PREDICTIONS = "predictions",
}

export interface StatisticsCardProps {
  cardName: string;
  cardQuantity: number;
}
