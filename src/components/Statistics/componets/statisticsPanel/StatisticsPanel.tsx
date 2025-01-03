import { FC } from "react";

import StatisticsCard from "./StatisticsCard.tsx";
import PanelList from "./panelList.tsx";
import { cn } from "../../../../utils/utils.ts";
import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice.ts";
import VacancySectionSkeleton from "../../../Vacancies/components/VacancySectionSceleton.tsx";

// type StatisticsCardProps = {
//   cardName: string;
//   cardQuantity: number;
// };

const StatisticsPanel: FC = ({}) => {
  const { data, isLoading, isError } = useGetAllUserDataQuery();
  const vacancies = data?.vacancies || [];
  console.log("vacancies", vacancies);
  const panelList = PanelList(vacancies);
  return (
    <>
      <div className="w-full">
        {/* Показ скелетону під час завантаження */}
        {isLoading && <VacancySectionSkeleton />}
        {isError && <h2>Error...</h2>}
        {/* Заглушка "картка Створіть вашу першу вакансію", якщо взагалі вакансій немає, секція "Збережені" */}
        {!isLoading && vacancies && (
          <ul className={cn("flex gap-5")}>
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
        )}{!isLoading && vacancies.length === 0 && (
          
        )}
      </div>
    </>
  );
};

export default StatisticsPanel;
