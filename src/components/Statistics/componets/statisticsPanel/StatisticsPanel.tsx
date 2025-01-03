import { FC } from "react";
import { cn } from "../../../../utils/utils.ts";
import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice.ts";

import Icon from "../../../Icon/Icon.tsx";
import AddVacancyButton from "../../../buttons/AddVacancyButton/AddVacancyButton.tsx";
import FirstVacancyMessage from "../../../Sceleton/FirstVacancyMessage.tsx";
import PredictionCard from "./PredictionCard.tsx";
import StatisticsCard from "./StatisticsCard.tsx";
import PanelList from "./PanelList.tsx";
import StatisticsCardSkeleton from "./StatisticsPanelSkeleton.tsx";

const StatisticsPanel: FC = ({}) => {
  const { data, isLoading, isError } = useGetAllUserDataQuery();
  const vacancies = data?.vacancies || [];

  const panelList = PanelList(vacancies);

  return (
    <>
      <div className="flex w-full flex-col items-center gap-[60px]">
        {isLoading && <StatisticsCardSkeleton />}
        {isError && <h2>Error...</h2>}

        {!isLoading && vacancies && (
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
            <PredictionCard />
          </div>
        )}
        {!isLoading && vacancies.length === 0 && (
          <div className="flex flex-col items-center gap-8">
            <FirstVacancyMessage />
            <AddVacancyButton />
            <Icon
              id={"girl-and-dashboard"}
              className="mt-[38px] size-[209px]"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsPanel;
