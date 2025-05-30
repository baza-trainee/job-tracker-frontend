import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../../../../utils/utils.ts";

import PredictionCard from "./PredictionCard.tsx";
import StatisticsCard from "./StatisticsCard.tsx";
import PanelListInfo from "./PanelListInfo.tsx";

import {
  CardNameKeys,
  Panellist,
  StatisticsPanelProps,
} from "./statPanel.types.ts";

const StatisticsPanel: FC<StatisticsPanelProps> = ({
  vacancies,
  prediction,
}) => {
  const { i18n, t } = useTranslation();

  const predictionText = i18n.language.includes("uk")
    ? prediction?.textUk
    : prediction?.textEn;

  const localizedHeaders = useMemo(() => {
    return {
      [CardNameKeys.VACANCIES]: t("statisticsHeader.vacancies"),
      [CardNameKeys.RESUME]: t("statisticsHeader.resumes"),
      [CardNameKeys.TESTTASKS]: t("statisticsHeader.testTasks"),
      [CardNameKeys.INTERVIEWS]: t("statisticsHeader.interviews"),
      [CardNameKeys.PREDICTIONS]: t("statisticsHeader.predictions"),
    };
  }, [t]);

  const panelList: Panellist[] = useMemo(
    () => PanelListInfo(vacancies),
    [vacancies]
  );

  return (
    <div className="flex w-full flex-wrap gap-y-2 text-blackColor md:justify-between">
      <ul
        className={cn(
          "flex flex-wrap gap-x-3 gap-y-2 smPlus:w-full md:gap-2 xl:w-auto xl:gap-3 2xl:gap-5 2xl:self-start 3xl:gap-8 mdOnly:w-1/2"
        )}
      >
        {panelList.map((item, index) => {
          return (
            <StatisticsCard
              key={index}
              cardName={localizedHeaders[item.cardName]}
              cardQuantity={item.cardQuantity}
            />
          );
        })}
      </ul>
      <PredictionCard
        header={localizedHeaders.predictions}
        text={predictionText || ""}
      />
    </div>
  );
};

export default StatisticsPanel;
