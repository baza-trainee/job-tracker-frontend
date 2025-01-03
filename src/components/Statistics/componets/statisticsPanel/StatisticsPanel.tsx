import { FC } from "react";

import StatisticsCard from "./StatisticsCard.tsx";
import PanelList from "./PanelList.tsx";
import { cn } from "../../../../utils/utils.ts";
import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice.ts";
import VacancySectionSkeleton from "../../../Vacancies/components/VacancySectionSceleton.tsx";
import AddVacancyButton from "../../../buttons/AddVacancyButton/AddVacancyButton.tsx";
import FirstVacancyMessage from "../../../Sceleton/FirstVacancyMessage.tsx";

// type StatisticsCardProps = {
//   cardName: string;
//   cardQuantity: number;
// };

const StatisticsPanel: FC = ({}) => {
  const { data, isLoading, isError } = useGetAllUserDataQuery();
  const vacancies = data?.vacancies || [];

  const panelList = PanelList(vacancies);
  return (
    <>
      <div className="flex w-full flex-col items-center gap-[60px]">
        {/* Показ скелетону під час завантаження */}
        {isLoading && <VacancySectionSkeleton />}
        {isError && <h2>Error...</h2>}
        {/* Заглушка "картка Створіть вашу першу вакансію", якщо взагалі вакансій немає, секція "Збережені" */}
        {!isLoading && vacancies && (
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
        )}
        {!isLoading && vacancies.length === 0 && (
          <div className="flex flex-col items-center gap-8">
            <FirstVacancyMessage />
            <AddVacancyButton />
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsPanel;
