import { FC } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../../../../utils/utils.ts";

import PredictionCard from "./PredictionCard.tsx";
import StatisticsCard from "./StatisticsCard.tsx";
import PanelListInfo from "./PanelListInfo.tsx";

import { Vacancy } from "../../../../types/vacancies.types.ts";
import { Prediction } from "../../../../types/predictions.types.ts";

// interface Prediction {
//   createdAt: Date;
//   id: string;
//   textUk: string;
//   textEn: string;
// }

interface StatisticsPanelProps {
  vacancies: Vacancy[];
  prediction: Prediction | null;
}

const StatisticsPanel: FC<StatisticsPanelProps> = ({
  vacancies,
  prediction,
}) => {
  const { i18n, t } = useTranslation();

  const predictionText =
    i18n.language === "uk" ? prediction?.textUk : prediction?.textEn;

  const panelList = PanelListInfo(vacancies);

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full justify-between">
          <ul className={cn("flex gap-5 self-start")}>
            {panelList.map((item, index) => {
              return (
                <StatisticsCard
                  key={index}
                  cardName={item.cardName}
                  cardQuantity={item.cardQuantity}
                />
              );
            })}
          </ul>
          <PredictionCard
            header={t("statisticsHeader.predictions")}
            text={predictionText || ""}
          />
        </div>
      </div>
    </>
  );
};

export default StatisticsPanel;
